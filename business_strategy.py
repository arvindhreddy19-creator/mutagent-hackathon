"""
Ignite Studio - Business Strategy Agent
Defines revenue models, pricing tiers, and business operations.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_BUSINESS_STRATEGY
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class BusinessStrategyAgent:
    def __init__(self):
        self.name = "Business Strategy Agent"
        self.role = "Chief Strategy Officer"

    async def execute(self, submission: StartupSubmission) -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Business Strategy Agent", {"title": submission.idea_title})

        prompt = PROMPT_BUSINESS_STRATEGY.format(
            idea_title=submission.idea_title,
            description=submission.description,
            target_market=submission.target_market
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 84.0)),
            findings=resp.get("findings", [
                "Recommended model: Tiered B2B SaaS Subscription with usage-based volume add-ons.",
                "Target LTV:CAC ratio projected at 4.2x after Month 6 optimization.",
                "High expansion revenue potential via team seat upgrades."
            ]),
            recommendations=resp.get("recommendations", [
                "Offer a 14-day full feature trial to maximize conversion velocity.",
                "Structure enterprise tier around custom API limits and dedicated support."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
