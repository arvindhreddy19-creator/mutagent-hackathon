"""
Ignite Studio - MutAgent Optimizer Module
Applies self-healing optimization logic to refine strategy, scores, and recommendations.
"""

import time
from backend.models.schemas import MutAgentDiagnosis, MutAgentOptimization
from backend.prompts.templates import PROMPT_MUTAGENT_OPTIMIZER
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class MutAgentOptimizerEngine:
    async def optimize(self, diagnosis: MutAgentDiagnosis) -> MutAgentOptimization:
        logger.info("Executing MutAgent Optimization Phase")

        context = f"Root cause: {diagnosis.root_cause_analysis}. Bottlenecks: {diagnosis.bottlenecks}"
        prompt = PROMPT_MUTAGENT_OPTIMIZER.format(context=context)

        resp = await ai_provider.generate_structured_response(prompt, context)

        return MutAgentOptimization(
            optimization_actions=resp.get("optimization_actions", [
                "Streamline onboarding funnel by eliminating mandatory upfront credit card step.",
                "Introduce self-service developer trial tier to accelerate enterprise evaluation.",
                "Automate SOC2 compliance logging via infrastructure-as-code templates."
            ]),
            revised_scores=resp.get("revised_scores", {
                "overall_boost": 3.5,
                "confidence_score": 94.0
            }),
            enhanced_recommendations=resp.get("enhanced_recommendations", [
                "Prioritize Product-Led Growth (PLG) self-serve user acquisition.",
                "Establish advisory board with domain enterprise buyers."
            ]),
            strategic_pivot_options=resp.get("strategic_pivot_options", [
                "Vertical B2B SaaS focus vs Horizontal API Platform."
            ])
        )


mutagent_optimizer = MutAgentOptimizerEngine()
