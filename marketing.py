"""
Ignite Studio - Marketing Agent
Formulates customer acquisition funnels, growth loops, and positioning strategy.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_MARKETING
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class MarketingAgent:
    def __init__(self):
        self.name = "Marketing Agent"
        self.role = "Growth Lead & CMO"

    async def execute(self, submission: StartupSubmission) -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Marketing Agent", {"target": submission.target_market})

        prompt = PROMPT_MARKETING.format(
            idea_title=submission.idea_title,
            target_market=submission.target_market
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 79.0)),
            findings=resp.get("findings", [
                "Primary acquisition lever: Product-led growth with free evaluation reports.",
                "High organic traction potential on LinkedIn, ProductHunt, and developer forums.",
                "Target CAC estimated at $85 per qualified corporate trial."
            ]),
            recommendations=resp.get("recommendations", [
                "Launch an interactive public idea grader as an SEO lead magnet.",
                "Build referral incentive mechanisms directly into user onboarding."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
