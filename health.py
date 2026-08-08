"""
Ignite Studio - Health Route
Endpoint checking system health, model API key status, and version.
"""

from typing import Dict, Any
from backend.config.settings import settings


async def get_health_status() -> Dict[str, Any]:
    has_gemini = bool(settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "MY_GEMINI_API_KEY")
    has_groq = bool(settings.GROQ_API_KEY and settings.GROQ_API_KEY != "MY_GROQ_API_KEY")

    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "environment": settings.ENVIRONMENT,
        "providers": {
            "gemini": "configured" if has_gemini else "fallback_mode",
            "groq": "configured" if has_groq else "fallback_mode"
        }
    }
