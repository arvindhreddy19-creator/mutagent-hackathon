"""
Ignite Studio - Investor Readiness Agent
Evaluates venture fundability, narrative cohesion, exit potential, and simulates a 3-partner VC Investment Committee review (investor_review).
"""

import time
import json
from typing import List, Dict
from backend.models.schemas import StartupSubmission, AgentOutput, InvestorPanelReview
from backend.prompts.templates import PROMPT_INVESTOR_READINESS
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class InvestorReadinessAgent:
    def __init__(self):
        self.name = "Investor Readiness Agent"
        self.role = "Venture Capital Partner"

    async def execute(self, submission: StartupSubmission, context: str = "") -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Investor Readiness Agent", {"idea": submission.idea_title})

        prompt = PROMPT_INVESTOR_READINESS.format(
            idea_title=submission.idea_title,
            context=context
        )

        resp = await ai_provider.generate_structured_response(prompt, submission.description)
        exec_ms = round((time.time() - start_time) * 1000, 2)

        raw_str = json.dumps(resp) if isinstance(resp, dict) else str(resp)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 83.0)),
            findings=resp.get("findings", [
                "Strong investment thesis backed by expanding market TAM.",
                "Compelling 10x ROI potential for seed stage investors.",
                "Primary VC question: Defensibility against big tech incumbents."
            ]),
            recommendations=resp.get("recommendations", [
                "Highlight proprietary data flywheel in pitch deck slide #4.",
                "Build 12-month data metrics proving customer retention before raising Series A."
            ]),
            raw_response=raw_str,
            execution_time_ms=exec_ms
        )

    def generate_investor_panel_review(
        self,
        submission: StartupSubmission,
        overall_score: float,
        agent_outputs: Dict[str, AgentOutput]
    ) -> List[InvestorPanelReview]:
        inv_score = agent_outputs.get("Investor Readiness", AgentOutput("", "", "completed", 82.0, [], [], "", 0)).score
        tech_score = agent_outputs.get("Technical Architect", AgentOutput("", "", "completed", 85.0, [], [], "", 0)).score
        comp_score = agent_outputs.get("Compliance", AgentOutput("", "", "completed", 84.0, [], [], "", 0)).score

        return [
            InvestorPanelReview(
                partner_name="Alex Vance (General Partner, Seed Stage VC)",
                firm_type="Venture Capital Fund ($150M AUM)",
                vote="Invest" if inv_score >= 80 else "Conditional",
                score=inv_score,
                pitch_weaknesses=[
                    "Go-to-market CAC payback timeline needs 3-month acceleration proof",
                    "Initial pitch deck should emphasize expansion revenue opportunities"
                ],
                key_questions=[
                    f"How do you defend {submission.idea_title} if a category leader clones this core feature in 6 months?",
                    "What is your target Gross Margin % once API usage scales?"
                ],
                required_pivots=[
                    "Lock in exclusive early distribution partnerships during pilot phase"
                ]
            ),
            InvestorPanelReview(
                partner_name="Dr. Elena Rostova (CTO & Technical Partner)",
                firm_type="DeepTech / AI Specialist Venture Firm",
                vote="Invest" if tech_score >= 82 else "Conditional",
                score=tech_score,
                pitch_weaknesses=[
                    "Multi-tenant data isolation strategy must be detailed for enterprise pilots",
                    "Model latency under spike traffic needs stress-test benchmarking"
                ],
                key_questions=[
                    "Are you building proprietary model fine-tunes or relying entirely on third-party foundational APIs?",
                    "What is your strategy for caching and reducing inference token expenditure?"
                ],
                required_pivots=[
                    "Implement edge-caching and hybrid local/cloud inference architecture"
                ]
            ),
            InvestorPanelReview(
                partner_name="Marcus Thorne (Risk & Compliance Managing Director)",
                firm_type="Institutional Growth Fund",
                vote="Invest" if comp_score >= 78 else "Conditional",
                score=comp_score,
                pitch_weaknesses=[
                    "Data sovereignty compliance terms required before entering EU/India markets",
                    "Contractual IP assignments for initial open-source contributors must be audited"
                ],
                key_questions=[
                    "Have you performed a trademark search and patent freedom-to-operate clearance?",
                    "What is your backup disaster recovery RTO/RPO SLA for enterprise clients?"
                ],
                required_pivots=[
                    "Formalize SOC 2 Type II audit readiness roadmap before Series A pitch"
                ]
            )
        ]

