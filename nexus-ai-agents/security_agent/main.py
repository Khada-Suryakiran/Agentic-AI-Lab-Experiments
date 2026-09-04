import sys
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field

load_dotenv()

class SecurityThreat(BaseModel):
    threat_identified: bool = Field(description="Whether a threat was identified in the logs")
    severity: str = Field(description="The severity of the threat (Low, Medium, High, Critical)")
    description: str = Field(description="A brief description of the identified threat")
    mitigation_steps: list[str] = Field(description="A list of suggested mitigation steps")

def run_security_analysis(logs: str):
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0)
    structured_llm = llm.with_structured_output(SecurityThreat)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert security analyst. Analyze the following security logs/alerts, identify potential threats, classify their severity, and suggest mitigation steps."),
        ("human", "Logs to analyze:\n{logs}")
    ])

    chain = prompt | structured_llm

    print("Analyzing logs...")
    result = chain.invoke({"logs": logs})
    
    print("\n--- Security Analysis Report ---")
    print(f"Threat Identified: {result.threat_identified}")
    if result.threat_identified:
        print(f"Severity: {result.severity}")
        print(f"Description: {result.description}")
        print("Mitigation Steps:")
        for step in result.mitigation_steps:
            print(f" - {step}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            with open(sys.argv[1], 'r') as f:
                logs = f.read()
            run_security_analysis(logs)
        except Exception as e:
            print(f"Error reading log file: {e}")
    else:
        sample_logs = """
        [2023-10-27 10:15:32] INFO - User 'admin' logged in successfully from 192.168.1.105
        [2023-10-27 10:17:11] WARNING - Multiple failed login attempts for user 'root' from 45.33.22.11 (5 attempts in 1 minute)
        [2023-10-27 10:17:15] ERROR - Unauthorized access attempt to /etc/passwd from 45.33.22.11
        [2023-10-27 10:18:02] WARNING - Suspicious outbound connection to known malicious IP 104.24.11.22 over port 4444
        """
        print("No log file provided. Using sample logs:\n", sample_logs)
        run_security_analysis(sample_logs)
