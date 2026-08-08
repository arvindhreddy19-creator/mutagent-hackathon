"""
Ignite Studio - Standalone Evaluation Runner
Provides benchmark suite to evaluate agent outputs against quality baselines.
"""

from typing import Dict, Any
from backend.models.schemas import AgentOutput
from backend.utils.logger import logger


class BenchmarkEvaluator:
    def __init__(self, min_score_threshold: float = 70.0):
        self.min_score_threshold = min_score_threshold

    def evaluate_output_quality(self, agent_outputs: Dict[str, AgentOutput]) -> Dict[str, Any]:
        logger.info("Running benchmark evaluation on agent outputs")
        passed = 0
        failed = 0
        details = {}

        for name, output in agent_outputs.items():
            is_valid = output.score >= self.min_score_threshold and len(output.findings) > 0
            if is_valid:
                passed += 1
            else:
                failed += 1
            details[name] = {
                "score": output.score,
                "passed": is_valid,
                "findings_count": len(output.findings)
            }

        return {
            "total_agents": len(agent_outputs),
            "passed": passed,
            "failed": failed,
            "success_rate": round((passed / len(agent_outputs)) * 100, 1) if agent_outputs else 0.0,
            "details": details
        }


benchmark_evaluator = BenchmarkEvaluator()
