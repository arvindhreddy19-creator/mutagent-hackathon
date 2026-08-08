"""
Ignite Studio - Technical Architect Agent
Architects system components, cloud stack, data models, and API infrastructure.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_TECHNICAL_ARCHITECT
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class TechnicalArchitectAgent:
    def __init__(self):
        self.name = "Technical Architect Agent"
        self.role = "Principal Systems Architect"

    async def execute(self, submission: StartupSubmission) -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Technical Architect Agent", {"title": submission.idea_title})

        prompt = PROMPT_TECHNICAL_ARCHITECT.format(
            idea_title=submission.idea_title,
            description=submission.description
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 89.0)),
            findings=resp.get("findings", [
                "Recommended Architecture: Cloud-native serverless microservices with Redis caching.",
                "Frontend: React + Vite + Tailwind; Backend: FastAPI Async APIs.",
                "AI Middleware: Parallel async LLM provider abstraction with streaming support."
            ]),
            recommendations=resp.get("recommendations", [
                "Implement strict API rate limiting and token usage throttling.",
                "Establish automated CI/CD pipeline with unit & integration tests."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
