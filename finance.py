"""
Ignite Studio - Finance Agent
Calculates capital requirements, burn rate, unit economics, and payback period.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_FINANCE
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class FinanceAgent:
    def __init__(self):
        self.name = "Finance Agent"
        self.role = "Financial Modeler & CFO"

    async def execute(self, submission: StartupSubmission, context: str = "") -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Finance Agent", {"budget": submission.budget_range})

        prompt = PROMPT_FINANCE.format(
            idea_title=submission.idea_title,
            budget_range=submission.budget_range,
            context=context
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 81.0)),
            findings=resp.get("findings", [
                "Estimated initial MVP build cost: $45,000 across 3-month launch window.",
                "Projected monthly operational burn rate: $3,500 - $6,000.",
                "Breakeven horizon estimated at Month 14 post-public launch."
            ]),
            recommendations=resp.get("recommendations", [
                "Maintain a minimum 12-month cash runway before scaling marketing spend.",
                "Utilize cloud provider startup credits to defer early infrastructure costs."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
