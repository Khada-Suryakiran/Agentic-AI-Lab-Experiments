import os
import sys
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

def run_doc_qa(pdf_path: str, query: str):
    print(f"Loading document: {pdf_path}")
    try:
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
    except Exception as e:
        print(f"Error loading PDF: {e}")
        return

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)

    print("Creating vector store...")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
    
    retriever = vectorstore.as_retriever()
    
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0)

    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer the question. "
        "If you don't know the answer, say that you don't know. "
        "Context: {context}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])

    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    print(f"Query: {query}")
    results = rag_chain.invoke({"input": query})
    print(f"\nAnswer: {results['answer']}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        run_doc_qa(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python main.py <path_to_pdf> <query>")
