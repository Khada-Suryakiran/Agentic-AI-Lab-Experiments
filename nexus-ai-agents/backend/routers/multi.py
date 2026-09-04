from fastapi import APIRouter
from pydantic import BaseModel
from services.multi_service import multi_agent_service

router = APIRouter(prefix="/api/mission", tags=["Mission"])

class MissionRequest(BaseModel):
    query: str

@router.post("/start")
def start_mission(request: MissionRequest):
    result = multi_agent_service.run_mission(request.query)
    return result
