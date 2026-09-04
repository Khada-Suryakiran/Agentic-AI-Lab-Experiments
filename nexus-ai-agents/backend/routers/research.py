from fastapi import APIRouter
from pydantic import BaseModel
from services.research_service import research_service

router = APIRouter(prefix="/api/research", tags=["Research"])

class ResearchRequest(BaseModel):
    query: str

@router.post("/start")
def start_research(request: ResearchRequest):
    result = research_service.run_research(request.query)
    return result
