"""
Ignite Studio - FastAPI Main Server Entry Point
Production-ready FastAPI application serving MutAgent ADL orchestration endpoints.
"""

import sys
import os
import json
import dataclasses
from typing import Dict, Any

# Ensure root directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.config.settings import settings
from backend.routes.health import get_health_status
from backend.routes.analysis import analyze_startup_idea, get_report_by_id, REPORTS_DB
from backend.utils.logger import logger

# Check if fastapi is importable
try:
    from fastapi import FastAPI, HTTPException, BackgroundTasks
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION,
        description="MutAgent ADL Multi-Agent Startup Idea Validation Platform"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class AnalysisRequest(BaseModel):
        idea_title: str
        description: str
        target_market: str
        industry: str
        budget_range: str
        stage: str = "Idea"
        additional_notes: str = ""

    @app.get("/health")
    async def health():
        return await get_health_status()

    @app.post("/api/analyze")
    async def analyze(request: AnalysisRequest):
        try:
            res = await analyze_startup_idea(request.dict())
            return res
        except Exception as e:
            logger.error("Error during startup analysis", {"error": str(e)})
            raise HTTPException(status_code=500, detail=str(e))

    @app.get("/api/report/{report_id}")
    async def get_report(report_id: str):
        res = await get_report_by_id(report_id)
        if res.get("status") == "error":
            raise HTTPException(status_code=404, detail=res.get("message"))
        return res

except ImportError:
    # Standalone execution helper if running via CLI runner
    app = None


# CLI runner helper for integration with Node server bridge or local execution
async def run_cli_analysis(payload_json_str: str) -> str:
    data = json.loads(payload_json_str)
    res = await analyze_startup_idea(data)
    # Custom serializer helper for dataclasses
    def default_serializer(o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return str(o)
    return json.dumps(res, default=default_serializer)


if __name__ == "__main__":
    import asyncio
    if len(sys.argv) > 1 and sys.argv[1] == "--cli":
        input_data = sys.stdin.read()
        out = asyncio.run(run_cli_analysis(input_data))
        print(out)
    else:
        try:
            import uvicorn
            uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
        except Exception as err:
            logger.error("Uvicorn startup failed or not installed", {"error": str(err)})
