"""
Ignite Studio - Risk Analysis Agent
Identifies technical, market, financial, and operational risks with mitigation pathways.
"""

import time
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.prompts.templates import PROMPT_RISK_ANALYSIS
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class RiskAnalysisAgent:
    def __init__(self):
        self.name = "Risk Analysis Agent"
        self.role = "Chief Risk Officer"

    async def execute(self, submission: StartupSubmission, context: str = "") -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Risk Analysis Agent", {"idea": submission.idea_title})

        prompt = PROMPT_RISK_ANALYSIS.format(
            idea_title=submission.idea_title,
            context=context
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 78.0)),
            findings=resp.get("findings", [
                "Market adoption risk: Low awareness among traditional non-tech buyers.",
                "Technical dependency risk: Upstream API cost volatility.",
                "Execution risk: Fast-moving AI ecosystem requires rapid feature iteration."
            ]),
            recommendations=resp.get("recommendations", [
                "Implement multi-provider fallback to guard against API provider outages.",
                "Lock in long-term enterprise contracts to stabilize cash inflows."
            ]),
            raw_response=str(resp),
            execution_time_ms=exec_ms
        )
