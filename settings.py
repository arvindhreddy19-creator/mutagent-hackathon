"""
Ignite Studio - Global Configuration Settings
Provides environment variable management and system settings.
"""

import os
from typing import Optional
from dataclasses import dataclass


@dataclass
class Settings:
    PROJECT_NAME: str = "Ignite Studio"
    PROJECT_VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # API Keys
    GROQ_API_KEY: Optional[str] = os.getenv("GROQ_API_KEY")
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    
    # Default Models
    DEFAULT_GROQ_MODEL: str = "llama-3.3-70b-versatile"
    DEFAULT_GEMINI_MODEL: str = "gemini-3.6-flash"
    
    # Execution Settings
    MAX_CONCURRENT_AGENTS: int = int(os.getenv("MAX_CONCURRENT_AGENTS", "5"))
    TIMEOUT_SECONDS: int = int(os.getenv("TIMEOUT_SECONDS", "60"))
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")


settings = Settings()
