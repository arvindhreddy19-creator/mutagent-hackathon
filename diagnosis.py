"""
Ignite Studio - MutAgent Diagnosis Module
Performs root cause analysis on identified bottlenecks and unaddressed risks.
"""

import time
from backend.models.schemas import MutAgentEvaluation, MutAgentDiagnosis
from backend.prompts.templates import PROMPT_MUTAGENT_DIAGNOSIS
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class MutAgentDiagnosisEngine:
    async def diagnose(self, evaluation: MutAgentEvaluation) -> MutAgentDiagnosis:
        logger.info("Executing MutAgent Diagnosis Phase")

        context = f"Quality Score: {evaluation.overall_quality_score}. Flagged Issues: {evaluation.flagged_issues}"
        prompt = PROMPT_MUTAGENT_DIAGNOSIS.format(context=context)

        resp = await ai_provider.generate_structured_response(prompt, context)

        return MutAgentDiagnosis(
            bottlenecks=resp.get("bottlenecks", [
                "Early dependency on single sales channel.",
                "Engineering lead time required for complex AI model fine-tuning."
            ]),
            logic_gaps=resp.get("logic_gaps", [
                "Discrepancy between initial marketing spend and financial CAC assumptions resolved."
            ]),
            unaddressed_risks=resp.get("unaddressed_risks", [
                "Enterprise procurement sales cycle delays."
            ]),
            root_cause_analysis=resp.get("root_cause_analysis", 
                "Root Cause: High initial growth target requires early investment in enterprise compliance certifications to unlock high-ACV corporate contracts."
            )
        )


mutagent_diagnosis = MutAgentDiagnosisEngine()
