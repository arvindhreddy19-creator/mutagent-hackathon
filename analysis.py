"""
Ignite Studio - Analysis Routes
API handlers for submitting startup ideas and retrieving analysis reports.
"""

from typing import Dict, Any
from backend.models.schemas import StartupSubmission, FinalReport
from backend.agents.orchestrator import orchestrator
from backend.utils.logger import logger

# In-memory storage for generated reports
REPORTS_DB: Dict[str, FinalReport] = {}


async def analyze_startup_idea(submission_data: dict) -> Dict[str, Any]:
    logger.info("Received analysis request", {"idea_title": submission_data.get("idea_title")})

    submission = StartupSubmission(
        idea_title=submission_data.get("idea_title", "Untitled Startup"),
        description=submission_data.get("description", ""),
        target_market=submission_data.get("target_market", "Global SaaS"),
        industry=submission_data.get("industry", "Artificial Intelligence"),
        budget_range=submission_data.get("budget_range", "$10k - $50k"),
        stage=submission_data.get("stage", "Idea"),
        additional_notes=submission_data.get("additional_notes", "")
    )

    report = await orchestrator.execute_full_pipeline(submission)
    REPORTS_DB[report.submission_id] = report

    return {
        "status": "success",
        "report_id": report.submission_id,
        "report": report
    }


async def get_report_by_id(report_id: str) -> Dict[str, Any]:
    report = REPORTS_DB.get(report_id)
    if not report:
        return {"status": "error", "message": f"Report ID {report_id} not found."}
    return {"status": "success", "report": report}
