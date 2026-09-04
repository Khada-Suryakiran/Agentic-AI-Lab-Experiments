from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from services.rag_service import rag_service

router = APIRouter(prefix="/api/rag", tags=["RAG"])

class QueryRequest(BaseModel):
    query: str

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    result = await rag_service.ingest_document(file)
    return result

@router.post("/query")
def query_document(request: QueryRequest):
    try:
        result = rag_service.query(request.query)
        return result
    except Exception as e:
        import traceback
        return {"status": "error", "message": str(e), "traceback": traceback.format_exc()}
