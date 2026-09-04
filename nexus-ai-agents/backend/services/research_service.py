import os
from typing import Dict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_classic.agents import AgentExecutor, create_tool_calling_agent
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import Tool

class ResearchService:
    def __init__(self):
        try:
            self.llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", temperature=0)
            self.search_tool = DuckDuckGoSearchRun()
            def safe_search(query):
                if isinstance(query, list) and len(query) > 0:
                    query = query[0]
                elif isinstance(query, dict):
                    # Gemini sometimes nests the query
                    for val in query.values():
                        if isinstance(val, list) and len(val) > 0:
                            query = val[0]
                            break
                        elif isinstance(val, str):
                            query = val
                            break
                return self.search_tool.run(str(query))

            self.tools = [
                Tool(
                    name="WebSearch",
                    func=safe_search,
                    description="Useful for searching the web for current information, facts, and events."
                )
            ]
            prompt = ChatPromptTemplate.from_messages([
                ("system", 
                 "You are an elite Research Analyst AI. Your goal is to provide comprehensive, factual, and deeply analytical reports.\n"
                "Use the search tool to find current information.\n"
                "Format your output in professional Markdown.\n"
                "CRITICAL: Whenever you are discussing statistics, comparisons, architectures, or processes, you MUST include a Mermaid.js diagram (e.g. pie chart, flowchart, sequence diagram) inside a ```mermaid code block to visualize the data.\n"
                "Never apologize. Just provide the data.\n"
                 "### Executive Summary\n[Summary]\n"
                 "### Key Findings\n[Bullet points]\n"
                 "### Sources\n[List the sources you found or used]\n\n"
                 "Format your output strictly in Markdown."),
                ("human", "{input}"),
                ("placeholder", "{agent_scratchpad}"),
            ])
            self.agent = create_tool_calling_agent(self.llm, self.tools, prompt)
            self.agent_executor = AgentExecutor(agent=self.agent, tools=self.tools, verbose=True)
        except Exception as e:
            print(f"Warning: Research Agent init failed (Missing API Key?): {e}")
            self.agent_executor = None

    def run_research(self, query: str) -> Dict:
        if not self.agent_executor:
            return {"status": "error", "message": "Research Agent not initialized."}
            
        try:
            # In a real async streaming scenario, we'd capture intermediate steps to show the live workflow.
            # Here we invoke synchronously for simplicity in the FastAPI endpoint.
            result = self.agent_executor.invoke({"input": query})
            
            output = result['output']
            if isinstance(output, list):
                # Extract text from list of message blocks
                report_text = "".join([block.get("text", "") for block in output if isinstance(block, dict)])
            else:
                report_text = str(output)
                
            return {
                "status": "success",
                "report": report_text
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

research_service = ResearchService()
