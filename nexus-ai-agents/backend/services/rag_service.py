import os
import shutil
from typing import List, Dict
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document

UPLOAD_DIR = "uploads"
CHROMA_DB_DIR = "chroma_db"

os.makedirs(UPLOAD_DIR, exist_ok=True)

class RAGService:
    def __init__(self):
        # We will initialize these lazily or catch errors if API key is missing
        try:
            self.embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2")
            self.llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", temperature=0)
            self.vectorstore = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=self.embeddings)
        except Exception as e:
            print(f"Warning: RAG initialized without valid Google API Key: {e}")
            self.vectorstore = None

    async def ingest_document(self, file: UploadFile) -> Dict:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        try:
            loader = PyPDFLoader(file_path)
            docs = loader.load()
            
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits = text_splitter.split_documents(docs)
            
            if self.vectorstore:
                self.vectorstore.add_documents(documents=splits)
            else:
                self.vectorstore = Chroma.from_documents(documents=splits, embedding=self.embeddings, persist_directory=CHROMA_DB_DIR)

            return {
                "status": "success",
                "filename": file.filename,
                "pages": len(docs),
                "chunks": len(splits)
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def query(self, question: str) -> Dict:
        if not self.vectorstore:
            return {"status": "error", "message": "Vector store not initialized or API key missing."}
            
        retriever = self.vectorstore.as_retriever(search_kwargs={"k": 4})
        
        system_prompt = (
            "You are an expert AI assistant for NEXUS AI Document Intelligence. "
            "Use the following pieces of retrieved context to answer the question. "
            "If you don't know the answer, say that you don't know. "
            "Always cite the source document and page number based on the context metadata. "
            "Context:\n{context}"
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        question_answer_chain = create_stuff_documents_chain(self.llm, prompt)
        rag_chain = create_retrieval_chain(retriever, question_answer_chain)

        response = rag_chain.invoke({"input": question})
        
        # Extract citations
        context_docs: List[Document] = response.get('context', [])
        sources = []
        for doc in context_docs:
            source = doc.metadata.get('source', 'Unknown')
            page = doc.metadata.get('page', 'Unknown')
            sources.append({"source": os.path.basename(source), "page": page, "content": doc.page_content[:200] + "..."})
            
        return {
            "status": "success",
            "answer": response['answer'],
            "sources": sources
        }

rag_service = RAGService()
