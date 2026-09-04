import os
from typing import Dict, List
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field

class Threat(BaseModel):
    threat_name: str = Field(description="Name or type of the threat (e.g. Brute Force Attack)")
    severity: str = Field(description="Severity: CRITICAL, HIGH, MEDIUM, LOW, or INFO")
    confidence: str = Field(description="Confidence percentage, e.g. 95%")
    description: str = Field(description="Detailed explanation of what the logs show")
    evidence: str = Field(description="Specific log lines or indicators that support this finding")
    mitigation: List[str] = Field(description="List of recommended mitigation steps")

class SecurityReport(BaseModel):
    total_events_analyzed: int
    threat_detected: bool
    threats: List[Threat]

class SecurityService:
    def __init__(self):
        try:
            self.llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", temperature=0)
            self.structured_llm = self.llm.with_structured_output(SecurityReport)
            
            self.prompt = ChatPromptTemplate.from_messages([
                ("system", 
                 "You are the NEXUS AI Security Analyst. Analyze the following security logs.\n"
                 "Parse the events, detect anomalies, identify potential threats, classify severity, "
                 "and recommend mitigation steps. Return structured JSON output according to the schema."),
                ("human", "Logs to analyze:\n{logs}")
            ])
            self.chain = self.prompt | self.structured_llm
        except Exception as e:
            print(f"Warning: Security Analyst init failed: {e}")
            self.chain = None

    def analyze_logs(self, logs: str) -> Dict:
        if not self.chain:
            return {"status": "error", "message": "Security Agent not initialized."}
            
        try:
            # First pass: basic count (deterministic)
            lines = [line for line in logs.split('\n') if line.strip()]
            total_events = len(lines)
            
            # Second pass: LLM analysis
            report: SecurityReport = self.chain.invoke({"logs": logs})
            
            # Ensure total events matches our deterministic count
            report.total_events_analyzed = max(total_events, report.total_events_analyzed)

            return {
                "status": "success",
                "report": report.dict()
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

security_service = SecurityService()
