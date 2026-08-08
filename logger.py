"""
Ignite Studio - Structured Logging Utility
"""

import logging
import sys
import json
from datetime import datetime


class StructuredLogger:
    def __init__(self, name: str = "IgniteStudio"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stderr)
            formatter = logging.Formatter(
                '%(asctime)s | %(levelname)s | %(name)s | %(message)s'
            )
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)

    def info(self, message: str, extra: dict = None):
        msg = f"{message} | Data: {json.dumps(extra)}" if extra else message
        self.logger.info(msg)

    def error(self, message: str, extra: dict = None):
        msg = f"{message} | Data: {json.dumps(extra)}" if extra else message
        self.logger.error(msg)

    def warning(self, message: str, extra: dict = None):
        msg = f"{message} | Data: {json.dumps(extra)}" if extra else message
        self.logger.warning(msg)


logger = StructuredLogger()
