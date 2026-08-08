"""
Ignite Studio - Agent Test Suite
Validates agent creation, model schemas, and orchestrator execution pipeline.
"""

import unittest
import asyncio
from backend.models.schemas import StartupSubmission, AgentOutput
from backend.agents.planner import PlannerAgent
from backend.agents.orchestrator import orchestrator
from backend.evaluation.evaluator import benchmark_evaluator


class TestAgentsPipeline(unittest.TestCase):
    def setUp(self):
        self.submission = StartupSubmission(
            idea_title="UnitTest AI",
            description="Testing agentic workflow validation pipeline.",
            target_market="Developers",
            industry="Software Testing",
            budget_range="$10k - $25k"
        )

    def test_planner_agent_instantiation(self):
        planner = PlannerAgent()
        self.assertEqual(planner.name, "Planner Agent")
        self.assertEqual(planner.role, "Lead Startup Strategist")

    def test_orchestrator_execution(self):
        async def run_test():
            report = await orchestrator.execute_full_pipeline(self.submission)
            self.assertIsNotNone(report.submission_id)
            self.assertEqual(report.idea_title, "UnitTest AI")
            self.assertGreater(report.overall_startup_score, 0)
            self.assertIn("Planner Agent", report.agent_outputs)
            
            # Benchmark test
            bench = benchmark_evaluator.evaluate_output_quality(report.agent_outputs)
            self.assertGreaterEqual(bench["passed"], 1)

        asyncio.run(run_test())


if __name__ == "__main__":
    unittest.main()
