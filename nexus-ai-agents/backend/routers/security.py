from fastapi import APIRouter
from pydantic import BaseModel
from services.security_service import security_service

router = APIRouter(prefix="/api/security", tags=["Security"])

class SecurityRequest(BaseModel):
    logs: str

@router.post("/analyze")
def analyze_logs(request: SecurityRequest):
    result = security_service.analyze_logs(request.logs)
    return result
