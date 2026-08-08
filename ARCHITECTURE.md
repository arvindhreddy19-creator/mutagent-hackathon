# Ignite Studio - System Architecture & Agentic Development Lifecycle (ADL)

## 1. Overview
Ignite Studio is an enterprise-grade AI startup platform that validates startup ideas through a multi-agent AI architecture based on the **Agentic Development Lifecycle (ADL)**.

```
SPEC  ──>  BUILD  ──>  EVALUATE  ──>  DIAGNOSE  ──>  OPTIMIZE  ──>  FINAL REPORT
```

---

## 2. Agent Workflow Hierarchy

### A. Phase 1: SPEC (Specification & Planning)
- **Planner Agent**: Analyzes problem statement, value proposition, and maps execution objectives.

### B. Phase 2: BUILD (Parallel Multi-Specialist Analysis)
- **Market Research Agent**: Calculates TAM, SAM, SOM, and market growth CAGR.
- **Competitor Analysis Agent**: Evaluates direct/indirect competitors, feature gaps, and moats.
- **Business Strategy Agent**: Defines SaaS monetization tiers and unit economics.
- **Technical Architect Agent**: Designs cloud infrastructure, microservices, and stack recommendations.
- **Finance Agent**: Computes MVP costs, monthly burn rate, and breakeven timeline.
- **Marketing Agent**: Maps GTM acquisition channels and positioning strategies.
- **Compliance Agent**: Checks GDPR/HIPAA/SOC2 regulations and IP readiness.
- **Risk Analysis Agent**: Ranks market, technical, and operational risk factors.
- **Investor Readiness Agent**: Assesses venture fundability and pitch thesis.
- **Validation Agent**: Formulates empirical landing page and discovery experiments.

### C. Phase 3: EVALUATE (MutAgent Audit)
- **MutAgent Evaluator**: Audits all 11 agent outputs for consistency, depth, completeness, and alignment.

### D. Phase 4: DIAGNOSE (Root Cause Analysis)
- **MutAgent Diagnosis**: Pinpoints bottlenecks, logic gaps, and unaddressed risks.

### E. Phase 5: OPTIMIZE (Self-Healing Strategy Refinement)
- **MutAgent Optimizer**: Applies strategic pivot options, score adjustments, and enhanced recommendations.

---

## 3. Tech Stack
- **Backend**: FastAPI (Python 3.10), Async REST APIs, Clean Architecture, Pydantic/Dataclasses.
- **Frontend**: React 19, TypeScript, TailwindCSS v4, Lucide Icons, Motion animations, Vite.
- **AI Engine**: Groq API (Llama 3.3 70B) & Google Gemini 3.6 Flash / 3.1 Pro SDK multi-provider fallback.
