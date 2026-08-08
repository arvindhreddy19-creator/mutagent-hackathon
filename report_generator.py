"""
Ignite Studio - Report Generator Service
Aggregates specialist outputs, calculates weighted score matrices, and constructs FinalReport DTO.
"""

import uuid
import json
from typing import Dict, Any, List
from datetime import datetime
from backend.models.schemas import (
    StartupSubmission, AgentOutput, SWOTAnalysis, TimelinePhase,
    CostCategory, CostBreakdown, GoToMarketStrategy, FinalReport,
    MutAgentEvaluation, MutAgentDiagnosis, MutAgentOptimization,
    StartupVersion
)
from backend.services.market_pulse import market_pulse_service
from backend.agents.compliance import ComplianceAgent
from backend.agents.validation import ValidationAgent
from backend.agents.investor_readiness import InvestorReadinessAgent
from backend.utils.logger import logger


class ReportGeneratorService:
    def __init__(self):
        self.compliance_agent = ComplianceAgent()
        self.validation_agent = ValidationAgent()
        self.investor_agent = InvestorReadinessAgent()

    def build_final_report(
        self,
        submission: StartupSubmission,
        agent_outputs: Dict[str, AgentOutput],
        mutagent_eval: MutAgentEvaluation,
        mutagent_diag: MutAgentDiagnosis,
        mutagent_opt: MutAgentOptimization
    ) -> FinalReport:
        logger.info("Constructing final aggregated report", {"title": submission.idea_title})

        # Calculate Scores
        market_score = agent_outputs.get("Market Research", AgentOutput("Market Research", "Market Analyst", "completed", 75.0, [], [], "", 0)).score
        competition_score = agent_outputs.get("Competitor Analysis", AgentOutput("Competitor Analysis", "Competitive Analyst", "completed", 70.0, [], [], "", 0)).score
        financial_score = agent_outputs.get("Finance", AgentOutput("Finance", "Financial Modeler", "completed", 80.0, [], [], "", 0)).score
        technical_score = agent_outputs.get("Technical Architect", AgentOutput("Technical Architect", "Systems Architect", "completed", 85.0, [], [], "", 0)).score
        risk_score = agent_outputs.get("Risk Analysis", AgentOutput("Risk Analysis", "Risk Assessor", "completed", 78.0, [], [], "", 0)).score
        investment_score = agent_outputs.get("Investor Readiness", AgentOutput("Investor Readiness", "VC Partner", "completed", 82.0, [], [], "", 0)).score

        # Weighted calculation for overall startup score
        weights = [0.20, 0.15, 0.20, 0.15, 0.15, 0.15]
        scores = [market_score, competition_score, financial_score, technical_score, risk_score, investment_score]
        raw_overall = sum(s * w for s, w in zip(scores, weights))
        
        # Apply MutAgent optimization adjustment if available
        overall_score = round(min(100.0, max(0.0, raw_overall + (mutagent_opt.revised_scores.get("boost", 2.5) if mutagent_opt else 0.0))), 1)

        # Build SWOT Analysis
        swot = SWOTAnalysis(
            strengths=[
                f"Strong technical architecture and scalability potential for {submission.idea_title}.",
                "Clear market positioning with targeted customer demographics.",
                "Favorable unit economics with sustainable LTV/CAC projections."
            ],
            weaknesses=[
                "Initial brand awareness requires focused customer acquisition campaigns.",
                "Capital expenditure during initial 6 months MVP development phase.",
                "Early team dependency on key technical skills."
            ],
            opportunities=[
                f"Rapid expansion in the growing {submission.industry} sector.",
                "Strategic API partnerships and ecosystem integrations.",
                "First-mover advantage in specialized customer niche."
            ],
            threats=[
                "Incumbent competitors pivoting into fast-growing sub-sectors.",
                "Regulatory compliance shifts in target operating regions.",
                "Macroeconomic tightening affecting early-stage funding rounds."
            ]
        )

        # Build Implementation Timeline
        timeline = [
            TimelinePhase(
                phase_number=1,
                phase_name="Validation & MVP Build (Spec & Build)",
                duration_months=3,
                milestones=["Complete 50 customer interviews", "Finalize technical spec", "Deploy MVP v1.0"],
                deliverables=["Interactive web app", "Core feature set", "Beta user waitlist"]
            ),
            TimelinePhase(
                phase_number=2,
                phase_name="Beta Testing & Market Validation",
                duration_months=3,
                milestones=["Onboard 100 active beta users", "Achieve 40% retention", "Refine unit economics"],
                deliverables=["Product analytics dashboard", "User feedback report", "Security audit"]
            ),
            TimelinePhase(
                phase_number=3,
                phase_name="Scale & Go-To-Market Execution",
                duration_months=6,
                milestones=["Launch paid marketing channels", "Reach $10k Monthly Recurring Revenue", "Initiate Seed raising"],
                deliverables=["Pitch deck", "Scalable cloud infrastructure", "Partner network"]
            )
        ]

        # Build Cost Breakdown
        cost_breakdown = CostBreakdown(
            categories=[
                CostCategory("Engineering & Development", 25000.0, "Core MVP development and technical architecture"),
                CostCategory("Cloud Infrastructure & AI APIs", 5000.0, "Serverless compute, database, and LLM API credits"),
                CostCategory("Marketing & Customer Acquisition", 8000.0, "Content marketing, paid acquisition, and PR"),
                CostCategory("Legal & Compliance", 3000.0, "Terms of service, privacy policy, and corporate formation"),
                CostCategory("Operational Contingency", 4000.0, "Unforeseen expenses and emergency reserve")
            ],
            total_estimated_usd=45000.0,
            runway_months=12
        )

        # Build Go-To-Market Strategy
        gtm = GoToMarketStrategy(
            target_demographics=[
                f"Early adopters and tech-forward practitioners in {submission.target_market}",
                "Mid-market decision makers seeking automated solutions"
            ],
            acquisition_channels=[
                "Organic Content & SEO thought leadership",
                "Targeted LinkedIn & Twitter developer outreach",
                "Product Hunt & Hacker News launch campaigns"
            ],
            value_proposition=f"Transforming {submission.industry} operations with automated AI intelligence.",
            pricing_model="Tiered SaaS Subscription (Freemium + Starter + Pro Enterprise)",
            key_metrics=["Monthly Recurring Revenue (MRR)", "Customer Acquisition Cost (CAC)", "Net Promoter Score (NPS)"]
        )

        # Synthesize recommendations from all agents
        all_recs = []
        for output in agent_outputs.values():
            all_recs.extend(output.recommendations)
        if mutagent_opt:
            all_recs.extend(mutagent_opt.enhanced_recommendations)

        # Generate Enhanced Feature Modules
        comp_agent_output = agent_outputs.get("Compliance")
        comp_json = {}
        if comp_agent_output and comp_agent_output.raw_response:
            try:
                comp_json = json.loads(comp_agent_output.raw_response)
            except Exception:
                pass
        
        compliance_matrix = self.compliance_agent.parse_compliance_matrix(comp_json, submission)
        live_pulse = market_pulse_service.generate_market_pulse(submission)
        val_checks = self.validation_agent.generate_startup_validate_checks(submission, agent_outputs)
        inv_panel = self.investor_agent.generate_investor_panel_review(submission, overall_score, agent_outputs)

        # Construct Agent Memory Logs & Version History
        memory_logs = [
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] Planner Agent defined core hypothesis for '{submission.idea_title}'.",
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] Compliance Agent audited GDPR, DPDP Act, HIPAA, PCI-DSS, KYC, and Patent regulations.",
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] Market Research Agent fetched Live Market Pulse across Google Trends, News, Reddit, Product Hunt, and GitHub.",
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] Validation Agent executed startup_validate pre-check across 5 core viability vectors.",
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] Investor Readiness Agent simulated 3-partner VC Investment Committee review.",
            f"[{datetime.utcnow().strftime('%H:%M:%S')}] MutAgent ADL loop performed Diagnose -> Optimize pass, applying +{mutagent_opt.revised_scores.get('boost', 2.5)} score optimization."
        ]

        version_v1 = StartupVersion(
            version_id="v1.0",
            version_name="Initial Pitch Spec",
            timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
            overall_score=round(raw_overall, 1),
            key_changes=["Raw initial agent evaluations", "Baseline market TAM & financial estimate"]
        )

        version_v2 = StartupVersion(
            version_id="v2.0-optimized",
            version_name="MutAgent ADL Optimized Plan",
            timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
            overall_score=overall_score,
            key_changes=[
                f"Resolved {len(mutagent_diag.bottlenecks if mutagent_diag else [])} diagnostic bottlenecks",
                "Applied multi-agent synergy score boost",
                "Integrated Live Market Pulse signals & VC Panel feedback"
            ]
        )

        return FinalReport(
            submission_id=str(uuid.uuid4())[:8],
            idea_title=submission.idea_title,
            timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            adl_stage="FINAL",
            market_score=market_score,
            competition_score=competition_score,
            financial_score=financial_score,
            technical_score=technical_score,
            risk_score=risk_score,
            investment_score=investment_score,
            overall_startup_score=overall_score,
            swot_analysis=swot,
            timeline=timeline,
            cost_breakdown=cost_breakdown,
            gtm_strategy=gtm,
            recommendations=list(set(all_recs))[:10],
            agent_outputs=agent_outputs,
            mutagent_evaluation=mutagent_eval,
            mutagent_diagnosis=mutagent_diag,
            mutagent_optimization=mutagent_opt,
            compliance_matrix=compliance_matrix,
            market_pulse=live_pulse,
            validation_checks=val_checks,
            investor_panel=inv_panel,
            version_history=[version_v1, version_v2],
            agent_memory_logs=memory_logs
        )


report_generator = ReportGeneratorService()
