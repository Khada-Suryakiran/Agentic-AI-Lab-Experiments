from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="NEXUS AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import rag, research, security, multi

@app.get("/")
def read_root():
    return {"status": "online", "message": "NEXUS AI Core is running"}

app.include_router(rag.router)
app.include_router(research.router)
app.include_router(security.router)
app.include_router(multi.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
