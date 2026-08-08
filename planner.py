"""
Ignite Studio - Planner Agent
Analyzes startup submission and defines master validation objectives.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_PLANNER
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class PlannerAgent:
    def __init__(self):
        self.name = "Planner Agent"
        self.role = "Lead Startup Strategist"

    async def execute(self, submission: StartupSubmission) -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Planner Agent", {"idea": submission.idea_title})

        prompt = PROMPT_PLANNER.format(
            idea_title=submission.idea_title,
            description=submission.description,
            target_market=submission.target_market,
            industry=submission.industry,
            budget_range=submission.budget_range
        )

        resp = await ai_provider.generate_structured_response(prompt, f"Idea: {submission.idea_title}")
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 85.0)),
            findings=resp.get("findings", [
                f"Core value proposition established for {submission.idea_title}.",
                f"Target market ({submission.target_market}) exhibits high readiness.",
                "Initial operational dependencies mapped out clearly."
            ]),
            recommendations=resp.get("recommendations", [
                "Formulate 90-day execution milestones.",
                "Establish core KPI tracking mechanisms."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
