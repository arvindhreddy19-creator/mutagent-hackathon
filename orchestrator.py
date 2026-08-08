"""
Ignite Studio - MutAgent ADL Orchestrator
Executes multi-agent workflow in parallel stages following MutAgent ADL (SPEC -> BUILD -> EVALUATE -> DIAGNOSE -> OPTIMIZE).
"""

import asyncio
import time
from typing import Dict, Any, Callable, Awaitable, Optional
from backend.models.schemas import StartupSubmission, AgentOutput, FinalReport
from backend.agents.planner import PlannerAgent
from backend.agents.market_research import MarketResearchAgent
from backend.agents.competitor_analysis import CompetitorAnalysisAgent
from backend.agents.business_strategy import BusinessStrategyAgent
from backend.agents.technical_architect import TechnicalArchitectAgent
from backend.agents.finance import FinanceAgent
from backend.agents.marketing import MarketingAgent
from backend.agents.compliance import ComplianceAgent
from backend.agents.risk_analysis import RiskAnalysisAgent
from backend.agents.investor_readiness import InvestorReadinessAgent
from backend.agents.validation import ValidationAgent
from backend.mutagent.evaluator import mutagent_evaluator
from backend.mutagent.diagnosis import mutagent_diagnosis
from backend.mutagent.optimizer import mutagent_optimizer
from backend.services.report_generator import report_generator
from backend.utils.logger import logger


ProgressCallback = Optional[Callable[[str, str, Dict[str, Any]], Awaitable[None]]]


class MutAgentOrchestrator:
    def __init__(self):
        self.planner = PlannerAgent()
        self.market = MarketResearchAgent()
        self.competitor = CompetitorAnalysisAgent()
        self.strategy = BusinessStrategyAgent()
        self.architect = TechnicalArchitectAgent()
        self.finance = FinanceAgent()
        self.marketing = MarketingAgent()
        self.compliance = ComplianceAgent()
        self.risk = RiskAnalysisAgent()
        self.investor = InvestorReadinessAgent()
        self.validation = ValidationAgent()

    async def execute_full_pipeline(
        self,
        submission: StartupSubmission,
        progress_callback: ProgressCallback = None
    ) -> FinalReport:
        logger.info("Starting MutAgent ADL Pipeline Execution", {"title": submission.idea_title})
        agent_outputs: Dict[str, AgentOutput] = {}

        async def notify(stage: str, agent_name: str, payload: Dict[str, Any]):
            if progress_callback:
                try:
                    await progress_callback(stage, agent_name, payload)
                except Exception as e:
                    logger.error("Progress callback error", {"error": str(e)})

        # ==================== 1. SPEC STAGE ====================
        await notify("SPEC", "Planner Agent", {"status": "running"})
        planner_out = await self.planner.execute(submission)
        agent_outputs["Planner Agent"] = planner_out
        await notify("SPEC", "Planner Agent", {"status": "completed", "output": planner_out})

        # ==================== 2. BUILD STAGE (PARALLEL EXECUTION) ====================
        await notify("BUILD", "Specialist Agents", {"status": "running", "parallel": True})

        # Define tasks for parallel execution
        tasks = [
            self.market.execute(submission, context=f"Plan: {planner_out.findings[:2]}"),
            self.competitor.execute(submission),
            self.strategy.execute(submission),
            self.architect.execute(submission),
            self.finance.execute(submission, context=f"Budget: {submission.budget_range}"),
            self.marketing.execute(submission),
            self.compliance.execute(submission),
            self.risk.execute(submission, context=f"Plan findings: {planner_out.findings}"),
            self.investor.execute(submission, context=f"Target: {submission.target_market}"),
            self.validation.execute(submission)
        ]

        # Execute all 10 specialist agents concurrently
        results = await asyncio.gather(*tasks, return_exceptions=True)

        specialist_names = [
            "Market Research", "Competitor Analysis", "Business Strategy",
            "Technical Architect", "Finance", "Marketing", "Compliance",
            "Risk Analysis", "Investor Readiness", "Validation"
        ]

        for name, res in zip(specialist_names, results):
            if isinstance(res, Exception):
                logger.error(f"Agent {name} failed", {"error": str(res)})
                agent_outputs[name] = AgentOutput(
                    agent_name=name,
                    agent_role="Specialist",
                    status="failed",
                    score=60.0,
                    findings=[f"Execution encountered fallback: {str(res)}"],
                    recommendations=["Retry execution with adjusted prompt parameters."],
                    raw_response=str(res),
                    execution_time_ms=0
                )
            else:
                agent_outputs[name] = res
            await notify("BUILD", name, {"status": "completed", "output": agent_outputs[name]})

        # ==================== 3. EVALUATE STAGE ====================
        await notify("EVALUATE", "MutAgent Evaluator", {"status": "running"})
        mutagent_eval = await mutagent_evaluator.evaluate(agent_outputs)
        await notify("EVALUATE", "MutAgent Evaluator", {"status": "completed", "output": mutagent_eval})

        # ==================== 4. DIAGNOSE STAGE ====================
        await notify("DIAGNOSE", "MutAgent Diagnosis", {"status": "running"})
        mutagent_diag = await mutagent_diagnosis.diagnose(mutagent_eval)
        await notify("DIAGNOSE", "MutAgent Diagnosis", {"status": "completed", "output": mutagent_diag})

        # ==================== 5. OPTIMIZE STAGE ====================
        await notify("OPTIMIZE", "MutAgent Optimizer", {"status": "running"})
        mutagent_opt = await mutagent_optimizer.optimize(mutagent_diag)
        await notify("OPTIMIZE", "MutAgent Optimizer", {"status": "completed", "output": mutagent_opt})

        # ==================== FINAL REPORT COMPILATION ====================
        final_report = report_generator.build_final_report(
            submission, agent_outputs, mutagent_eval, mutagent_diag, mutagent_opt
        )
        await notify("FINAL", "Report Generator", {"status": "completed", "report_id": final_report.submission_id})

        return final_report


orchestrator = MutAgentOrchestrator()
