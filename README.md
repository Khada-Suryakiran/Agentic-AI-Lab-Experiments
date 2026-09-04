# Agentic-AI-Lab-Experiments

# 🤖 Agentic AI Laboratory Experiments

## 📌 Overview

This repository contains **12 completed laboratory experiments** developed as part of the **Agentic AI / Artificial Intelligence and Large Language Models laboratory**.

The experiments demonstrate important concepts used in modern **Artificial Intelligence, Large Language Models (LLMs), Agentic AI systems, Retrieval-Augmented Generation (RAG), Multi-Agent Systems, Tool Calling, Reasoning, Fine-Tuning, and Model Optimization**.

Each experiment is organized independently with its own:

* Source code
* Requirements file
* Environment configuration
* Test files
* Execution script
* Documentation

The experiments gradually progress from basic LLM workflows to advanced **end-to-end agentic AI systems**.

---

# 🎯 Objectives

The main objective of this laboratory is to understand and implement practical applications of:

* Large Language Models (LLMs)
* Agentic AI workflows
* Retrieval-Augmented Generation (RAG)
* Text-to-SQL systems
* AI agents and tool usage
* Multi-agent collaboration
* Policy and compliance evaluation
* Deep research workflows
* Multimodal AI
* Reasoning model evaluation
* Fine-tuning and domain adaptation
* Model optimization
* End-to-end intelligent agentic systems

---

# 🧪 Completed Experiments

| No. | Experiment                        | Main Concepts                           | Status      |
| --- | --------------------------------- | --------------------------------------- | ----------- |
| 01  | Text-to-SQL Workflow              | LLM, SQL Generation, Database           | ✅ Completed |
| 02  | RAG Question Answering            | Retrieval, Embeddings, LLM              | ✅ Completed |
| 03  | Prompt Chaining Summarization     | Prompt Engineering, Multi-Step Pipeline | ✅ Completed |
| 04  | SQL Agent with Tool Use           | ReAct Agent, Tools, Database            | ✅ Completed |
| 05  | Multi-Agent SDR System            | Multi-Agent Collaboration               | ✅ Completed |
| 06  | Policy Compliance Agent           | AI Evaluation, Rules, Compliance        | ✅ Completed |
| 07  | Deep Research Agent               | Planning, Research, Reflection          | ✅ Completed |
| 08  | Image Retrieval and Visual QA     | Multimodal AI, Vision                   | ✅ Completed |
| 09  | Reasoning Model Benchmark         | Evaluation, Accuracy, Latency           | ✅ Completed |
| 10  | Fine-Tuning for Domain Adaptation | LoRA, PEFT, Fine-Tuning                 | ✅ Completed |
| 11  | Model Optimization                | Quantization, Performance               | ✅ Completed |
| 12  | Capstone Agentic AI System        | RAG, SQL, Multi-Agent Routing           | ✅ Completed |

---

# 📂 Project Structure

```text
AI-LLM-LAB/
│
├── 01-text-to-sql-workflow/
├── 02-rag-question-answering/
├── 03-prompt-chaining-summarization/
├── 04-sql-agent-tool-use/
├── 05-multi-agent-sdr/
├── 06-policy-compliance-agent/
├── 07-deep-research-agent/
├── 08-image-retrieval-visual-qa/
├── 09-reasoning-model-benchmark/
├── 10-fine-tuning-domain-adaptation/
├── 11-model-optimization/
└── 12-capstone-agentic-system/
```

---

# 🔬 Experiment 01 — Text-to-SQL Workflow

## Objective

To build an AI workflow that converts natural language questions into SQL queries, executes them on a database, and returns results in natural language.

## Description

Many users need information from databases but do not know SQL. This experiment demonstrates how an LLM can understand a user's question, generate the required SQL query, validate it, execute it on a SQLite database, and generate a meaningful response.

## Workflow

```text
User Question
      ↓
Schema Retrieval
      ↓
LLM Prompt
      ↓
SQL Generation
      ↓
SQL Validation
      ↓
Database Execution
      ↓
Natural Language Answer
```

## Key Concepts

* Natural Language Processing
* LLM-based SQL generation
* Database querying
* SQLite
* SQL validation

---

# 📚 Experiment 02 — RAG-Based Question Answering

## Objective

To build a Retrieval-Augmented Generation system capable of answering questions using an external knowledge base.

## Description

Large Language Models can sometimes generate incorrect information or lack knowledge about specific documents. RAG improves the reliability of AI responses by retrieving relevant information from documents before generating an answer.

## Workflow

```text
Documents
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Database
    ↓
Retriever
    ↓
Relevant Context
    ↓
LLM
    ↓
Final Answer
```

## Key Concepts

* Retrieval-Augmented Generation
* Document chunking
* Embeddings
* Vector search
* Context-based answering

---

# 🔗 Experiment 03 — Prompt Chaining for Summarization

## Objective

To develop a multi-step summarization system using prompt chaining.

## Description

Instead of performing a complex task using a single prompt, prompt chaining divides the task into smaller steps. Each step produces an output that becomes the input for the next step.

This improves structure, accuracy, and overall output quality.

## Workflow

```text
Input Document
      ↓
Extract Important Facts
      ↓
Generate Structured Summary
      ↓
Refine Summary
      ↓
Final Output
```

## Key Concepts

* Prompt engineering
* Prompt chaining
* Multi-step AI workflows
* Summarization
* Output refinement

---

# 🛠️ Experiment 04 — SQL Agent with Tool Use

## Objective

To build an autonomous AI agent capable of interacting with a database using specialized tools.

## Description

Unlike a traditional Text-to-SQL system, an AI agent can explore the database before generating the final answer. The agent can inspect available tables, examine schemas, execute queries, and use the results to make decisions.

## Workflow

```text
User Question
      ↓
AI Agent
      ↓
Thought
      ↓
Action
      ↓
Tool Execution
      ↓
Observation
      ↓
Repeat if Required
      ↓
Final Answer
```

## Tools Used

* List Tables
* Retrieve Database Schema
* Execute SQL Queries

## Key Concepts

* AI Agents
* ReAct architecture
* Tool calling
* Autonomous reasoning
* Database exploration

---

# 👥 Experiment 05 — Multi-Agent SDR System

## Objective

To develop a multi-agent system where specialized AI agents collaborate to perform a complete Sales Development Representative workflow.

## Description

Complex tasks can be divided among multiple specialized agents. Each agent performs a specific responsibility and passes information to the next agent.

## Workflow

```text
Lead Generation Agent
        ↓
Lead Qualification Agent
        ↓
Email Generation Agent
        ↓
Review Agent
        ↓
Final Result
```

## Key Concepts

* Multi-agent systems
* Agent collaboration
* Sequential workflows
* Context sharing
* Task specialization

---

# 🛡️ Experiment 06 — Policy Compliance Agent

## Objective

To build an AI system that evaluates content against predefined organizational policies.

## Description

The system combines rule-based validation with AI reasoning. Rule-based methods quickly detect obvious violations, while AI evaluation handles complex and contextual cases.

## Workflow

```text
Input Content
      ↓
Policy Rules
      ↓
Rule-Based Verification
      ↓
AI Evaluation
      ↓
Compliance Decision
      ↓
Explanation
```

## Key Concepts

* Policy compliance
* Rule-based systems
* AI evaluation
* Hybrid AI architecture
* Content safety

---

# 🔍 Experiment 07 — Deep Research Agent

## Objective

To build an agentic research workflow capable of planning, researching, drafting, reflecting, and improving a report.

## Description

The Deep Research Agent breaks a large research topic into smaller sub-problems. It gathers information, creates a draft, reviews its own work, and improves the final output.

## Workflow

```text
Research Topic
      ↓
Planning
      ↓
Generate Sub-Queries
      ↓
Gather Information
      ↓
Draft Report
      ↓
Self Reflection
      ↓
Critique
      ↓
Improved Final Report
```

## Key Concepts

* Research planning
* Agentic workflows
* Self-reflection
* AI critique
* Iterative improvement

---

# 🖼️ Experiment 08 — Image Retrieval and Visual Question Answering

## Objective

To develop a multimodal AI system capable of retrieving images and answering questions about them.

## Description

Traditional RAG systems primarily work with text. This experiment extends retrieval to visual information by finding relevant images based on text queries and using a vision-language model to analyze them.

## Workflow

```text
Image Dataset
      ↓
Image Embeddings
      ↓
Vector Index
      ↓
Text Query
      ↓
Image Retrieval
      ↓
Vision Model
      ↓
Question Answering
```

## Key Concepts

* Multimodal AI
* Image embeddings
* Vector search
* Visual Question Answering
* Vision-language models

---

# 🧠 Experiment 09 — Reasoning Model Benchmarking

## Objective

To evaluate and compare different LLM prompting and reasoning strategies.

## Description

Different prompting techniques can produce different levels of accuracy, latency, and token consumption. This experiment creates a benchmarking system to compare these strategies using measurable performance metrics.

## Strategies Compared

1. Zero-Shot Prompting
2. Few-Shot Prompting
3. Chain-of-Thought Reasoning

## Workflow

```text
Dataset
    ↓
Multiple Prompting Strategies
    ↓
LLM Execution
    ↓
Evaluation
    ↓
Performance Metrics
    ↓
Comparison Report
```

## Evaluation Metrics

* Accuracy
* Response latency
* Token usage
* Overall performance

---

# 🎓 Experiment 10 — Fine-Tuning for Domain Adaptation

## Objective

To demonstrate how a general Large Language Model can be adapted for a specific domain.

## Description

General-purpose models may not perform optimally in specialized fields. Fine-tuning allows a model to adapt its behavior, knowledge representation, and response style for a particular domain.

The experiment demonstrates Parameter-Efficient Fine-Tuning techniques such as LoRA.

## Workflow

```text
Base Language Model
        +
Domain-Specific Dataset
        ↓
LoRA / PEFT Training
        ↓
Fine-Tuned Model
        ↓
Evaluation
```

## Key Concepts

* Fine-tuning
* Domain adaptation
* LoRA
* PEFT
* Hugging Face concepts

---

# ⚡ Experiment 11 — Model Optimization

## Objective

To study the effects of model quantization on performance and resource usage.

## Description

Large Language Models require significant memory and computational resources. Quantization reduces the precision used to store model parameters, making models smaller and faster while attempting to maintain acceptable accuracy.

## Workflow

```text
Original Model
   FP32
      ↓
Quantization
      ↓
FP16 / INT8 / INT4
      ↓
Optimized Model
      ↓
Performance Benchmark
```

## Key Concepts

* Model optimization
* Quantization
* Memory reduction
* Inference performance
* Accuracy comparison

---

# 🚀 Experiment 12 — Capstone Agentic AI System

## Objective

To build an end-to-end Agentic AI system by combining the concepts learned in previous experiments.

## Description

This capstone project integrates multiple AI technologies into a unified system. A master agent analyzes the user's request and routes it to the appropriate specialized agent.

The system can work with:

* Structured data using SQL
* Unstructured documents using RAG
* Multiple specialized agents
* Intelligent routing
* Context-aware response generation

## Architecture

```text
                    USER
                      │
                      ▼
              MASTER AGENT
                 (Router)
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      RAG AGENT               SQL AGENT
          │                       │
          ▼                       ▼
      Vector DB               Database
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                FINAL ANSWER
```

## Key Concepts

* Agentic AI
* Multi-agent orchestration
* RAG
* SQL tools
* Intelligent routing
* End-to-end AI systems

---

# 💻 Technologies Used

The experiments use the following technologies and concepts:

* Python
* SQLite
* Large Language Models
* LangChain concepts
* Retrieval-Augmented Generation
* Vector search
* Embeddings
* AI Agents
* Multi-Agent Systems
* Prompt Engineering
* ReAct architecture
* Multimodal AI
* Vision-Language Models
* Fine-Tuning
* LoRA
* PEFT
* Model Quantization
* Pytest

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Khada-Suryakiran/Agentic-AI-Lab-Experiments.git
```

Navigate to the project directory:

```bash
cd AI-LLM-LAB
```

Each experiment contains its own dependencies.

Navigate to an experiment:

```bash
cd 01-text-to-sql-workflow
```

Install the required packages:

```bash
pip install -r requirements.txt
```

---

# ▶️ Running an Experiment

Each experiment contains a `run.py` file.

For example:

```bash
python run.py
```

Run the corresponding experiment after navigating into its folder.

Example:

```bash
cd 01-text-to-sql-workflow
python run.py
```

---

# 🧪 Testing

Each experiment includes test files to validate the functionality of the implementation.

Tests can be executed using:

```bash
pytest
```

Or:

```bash
pytest tests/
```

---

# 🔐 Environment Configuration

Most experiments include an `.env.example` file.

Create an `.env` file:

```bash
cp .env.example .env
```

The experiments are designed with mock implementations where appropriate, allowing the workflows to be demonstrated without requiring expensive API keys or large models.

---

# 📖 Learning Outcomes

After completing these 12 experiments, the following concepts have been explored:

✅ Understanding Large Language Models

✅ Building Text-to-SQL systems

✅ Implementing Retrieval-Augmented Generation

✅ Designing prompt chaining workflows

✅ Creating AI agents with tools

✅ Developing multi-agent systems

✅ Building policy and compliance systems

✅ Designing deep research agents

✅ Working with multimodal AI

✅ Evaluating reasoning models

✅ Understanding fine-tuning techniques

✅ Optimizing AI models

✅ Building an end-to-end Agentic AI application

---

# 🌟 Conclusion

These 12 experiments provide a practical progression through modern Artificial Intelligence and Agentic AI concepts.

The laboratory work begins with foundational LLM workflows and gradually advances toward autonomous agents, multi-agent collaboration, multimodal intelligence, model optimization, and complete agentic AI architectures.

The final capstone experiment combines multiple concepts into an integrated intelligent system, demonstrating how modern AI applications can use specialized agents, retrieval systems, databases, and intelligent routing to solve complex real-world problems.

---

# 👨‍💻 Author

**Khada Suryakiran**

Agentic AI Laboratory Experiments

---

# 📌 Repository Status

## 🎉 All 12 Experiments Successfully Completed

```text
Experiment 01  ████████████████████  100% ✅
Experiment 02  ████████████████████  100% ✅
Experiment 03  ████████████████████  100% ✅
Experiment 04  ████████████████████  100% ✅
Experiment 05  ████████████████████  100% ✅
Experiment 06  ████████████████████  100% ✅
Experiment 07  ████████████████████  100% ✅
Experiment 08  ████████████████████  100% ✅
Experiment 09  ████████████████████  100% ✅
Experiment 10  ████████████████████  100% ✅
Experiment 11  ████████████████████  100% ✅
Experiment 12  ████████████████████  100% ✅
```

## 🚀 Project Completion: 100%
