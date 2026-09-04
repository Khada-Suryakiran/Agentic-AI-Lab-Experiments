import sys
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate
from langchain.tools import Tool

load_dotenv()

def run_research_agent(query: str):
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0)
    search = DuckDuckGoSearchRun()

    tools = [
        Tool(
            name="Search",
            func=search.run,
            description="useful for when you need to search the web for information."
        )
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful research agent. Search the web for information, summarize the findings, and generate a structured research report with references. "
                   "Format your output as markdown."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    agent = create_tool_calling_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    print(f"Researching: {query}")
    result = agent_executor.invoke({"input": query})
    print("\n--- Final Report ---")
    print(result['output'])

if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_research_agent(sys.argv[1])
    else:
        print("Usage: python main.py <research_query>")
