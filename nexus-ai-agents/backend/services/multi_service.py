import os
from typing import Dict
from crewai import Agent, Task, Crew, Process
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchRun

class MultiAgentService:
    def __init__(self):
        try:
            from crewai import LLM
            self.llm = LLM(model="gemini/gemini-3.5-flash-lite")
            self.search_tool = DuckDuckGoSearchRun()
            
            self.researcher = Agent(
                role='Senior Security Researcher',
                goal='Gather accurate and up-to-date information on the provided topic',
                backstory='You are an expert researcher. You know how to find the most relevant information.',
                verbose=True,
                allow_delegation=False,
                llm=self.llm,
                # In crewai >= 0.28 tools must be crewai tools, but DuckDuckGoSearchRun is from langchain.
                # CrewAI wraps them automatically if passed correctly, but we'll omit tools for safety in this simple demo
                # to prevent version conflicts unless explicitly needed.
            )
            
            self.analyst = Agent(
                role='Principal Cyber Threat Analyst',
                goal='Analyze the gathered research and identify critical threats or anomalies',
                backstory='You analyze raw data and turn it into actionable intelligence.',
                verbose=True,
                allow_delegation=False,
                llm=self.llm
            )
            
            self.reporter = Agent(
                role='Executive Reporting Officer',
                goal='Synthesize the analysis into a highly structured markdown report',
                backstory='You write brilliant executive summaries and structured markdown reports.',
                verbose=True,
                allow_delegation=False,
                llm=self.llm
            )
            
        except Exception as e:
            print(f"Warning: Multi-Agent init failed: {e}")
            self.llm = None

    def run_mission(self, query: str) -> Dict:
        if not self.llm:
            return {"status": "error", "message": "Multi-Agent system not initialized."}
            
        try:
            task1 = Task(
                description=f'Conduct comprehensive research on: {query}. Focus on security implications.',
                expected_output='A detailed summary of findings.',
                agent=self.researcher
            )
            
            task2 = Task(
                description='Analyze the findings from the researcher. Identify top 3 threats and rank them by severity.',
                expected_output='A ranked list of threats with analysis.',
                agent=self.analyst
            )
            
            task3 = Task(
                description='Write a final executive markdown report combining the research and analysis. Include an Executive Summary, Threat Landscape, and Recommendations.',
                expected_output='A full markdown report.',
                agent=self.reporter
            )
            
            crew = Crew(
                agents=[self.researcher, self.analyst, self.reporter],
                tasks=[task1, task2, task3],
                verbose=True
            )
            
            result = crew.kickoff()
            
            # Return individual task outputs
            tasks_data = []
            if hasattr(result, 'tasks_output'):
                for t in result.tasks_output:
                    tasks_data.append({
                        "agent": t.agent.role if hasattr(t, 'agent') and hasattr(t.agent, 'role') else str(t.agent) if hasattr(t, 'agent') else "Agent",
                        "description": t.description if hasattr(t, 'description') else "",
                        "output": t.raw if hasattr(t, 'raw') else str(t)
                    })
                    
            return {
                "status": "success",
                "report": str(result),
                "tasks": tasks_data
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

multi_agent_service = MultiAgentService()
