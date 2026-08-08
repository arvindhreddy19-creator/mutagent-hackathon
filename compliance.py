"""
Ignite Studio - Compliance Agent
Audits regulatory compliance, data privacy, IP governance, and legal readiness across GDPR, DPDP Act, HIPAA, PCI-DSS, KYC/AML, and Copyright/Patents.
"""

import time
import json
from backend.models.schemas import StartupSubmission, AgentOutput, SecurityComplianceOutput, ComplianceFrameworkDetail
from backend.prompts.templates import PROMPT_COMPLIANCE
from backend.services.ai_provider import ai_provider
from backend.utils.logger import logger


class ComplianceAgent:
    def __init__(self):
        self.name = "Compliance Agent"
        self.role = "General Counsel & Compliance Auditor"

    async def execute(self, submission: StartupSubmission) -> AgentOutput:
        start_time = time.time()
        logger.info("Executing Compliance Agent", {"industry": submission.industry})

        prompt = PROMPT_COMPLIANCE.format(
            idea_title=submission.idea_title,
            industry=submission.industry
        )

        resp = await ai_provider.generate_structured_response(prompt, f"{submission.idea_title}: {submission.description}. Target: {submission.target_market}")
        exec_ms = round((time.time() - start_time) * 1000, 2)

        raw_str = json.dumps(resp) if isinstance(resp, dict) else str(resp)

        return AgentOutput(
            agent_name=self.name,
            agent_role=self.role,
            status="completed",
            score=float(resp.get("score", 85.0)),
            findings=resp.get("findings", [
                "GDPR: High priority due to EU user interaction and analytics collection.",
                "DPDP Act (India): Mandatory data fiduciary compliance if servicing Indian users.",
                "HIPAA & PCI-DSS requirement determined by data payload and payment handling strategy.",
                "Copyright & IP: AI-generated output requires clear ownership terms."
            ]),
            recommendations=resp.get("recommendations", [
                "Implement granular user consent banners and data deletion APIs for GDPR/DPDP.",
                "Utilize Stripe PCI-DSS Level 1 compliant iframe tokenization for payments.",
                "File provisional patent application for core algorithmic pipeline."
            ]),
            raw_response=raw_str,
            execution_time_ms=exec_ms
        )

    def parse_compliance_matrix(self, resp_dict: dict, submission: StartupSubmission) -> SecurityComplianceOutput:
        industry_lower = (submission.industry or "").lower()
        title_lower = (submission.idea_title or "").lower()
        desc_lower = (submission.description or "").lower()

        is_health = any(k in industry_lower or k in desc_lower for k in ["health", "med", "doctor", "clinic", "patient", "bio"])
        is_fintech = any(k in industry_lower or k in desc_lower for k in ["fintech", "pay", "bank", "crypto", "credit", "finance", "money"])
        is_ai = any(k in industry_lower or k in desc_lower for k in ["ai", "llm", "generator", "copilot", "ml", "automation"])

        parsed_frameworks = resp_dict.get("frameworks")
        frameworks_list = []

        if isinstance(parsed_frameworks, list) and len(parsed_frameworks) > 0:
            for item in parsed_frameworks:
                if isinstance(item, dict):
                    frameworks_list.append(
                        ComplianceFrameworkDetail(
                            framework_name=item.get("framework_name", "Framework"),
                            required=bool(item.get("required", True)),
                            risk_level=item.get("risk_level", "Medium"),
                            description=item.get("description", ""),
                            key_requirements=item.get("key_requirements", []),
                            action_items=item.get("action_items", [])
                        )
                    )

        if not frameworks_list:
            frameworks_list = [
                ComplianceFrameworkDetail(
                    framework_name="GDPR",
                    required=True,
                    risk_level="High" if "eu" in submission.target_market.lower() or "global" in submission.target_market.lower() else "Medium",
                    description="EU Data Protection Directive mandating user consent, right to be forgotten, and strict data processing agreements.",
                    key_requirements=["Explicit cookie consent", "Data minimization", "DPA signed with sub-processors", "User export API"],
                    action_items=["Add OneTrust/Cookiebot consent banner", "Implement user self-serve account deletion"]
                ),
                ComplianceFrameworkDetail(
                    framework_name="DPDP Act (India)",
                    required=True,
                    risk_level="High" if "india" in submission.target_market.lower() or "global" in submission.target_market.lower() else "Medium",
                    description="India Digital Personal Data Protection Act 2023 regulating digital personal data processing, data fiduciaries, and consent managers.",
                    key_requirements=["Multilingual consent notice", "Data protection officer appointment if Significant Data Fiduciary", "Parental consent for minors"],
                    action_items=["Draft DPDP-compliant notice in English & regional languages", "Establish Data Fiduciary grievance officer contact"]
                ),
                ComplianceFrameworkDetail(
                    framework_name="HIPAA",
                    required=is_health,
                    risk_level="Critical" if is_health else "Low",
                    description="Health Insurance Portability and Accountability Act enforcing Protected Health Information (PHI) privacy and BAA contracts.",
                    key_requirements=["AES-256 encryption at rest & TLS 1.3 in transit", "Business Associate Agreements (BAA) with AWS/GCP", "Audit logs retention"],
                    action_items=["Provision HIPAA-eligible Cloud infrastructure", "Enforce role-based access control (RBAC) for medical records"]
                ),
                ComplianceFrameworkDetail(
                    framework_name="PCI-DSS",
                    required=is_fintech or "payment" in desc_lower,
                    risk_level="High" if is_fintech else "Low",
                    description="Payment Card Industry Data Security Standard for handling credit card data securely.",
                    key_requirements=["SAQ-A validation", "No raw card storage on server", "Stripe/Adyen hosted tokenized checkout"],
                    action_items=["Offload all card handling to Stripe Elements/Checkout", "Conduct quarterly vulnerability scans"]
                ),
                ComplianceFrameworkDetail(
                    framework_name="KYC / AML",
                    required=is_fintech or "crypto" in desc_lower or "wallet" in desc_lower,
                    risk_level="Critical" if is_fintech else "None",
                    description="Know Your Customer & Anti-Money Laundering regulatory checks for financial and transaction systems.",
                    key_requirements=["Automated ID verification (Persona/Sumsub)", "Sanctions & PEP list screening", "Transaction monitoring logs"],
                    action_items=["Integrate Persona/Sumsub SDK for user onboarding", "Set up automated fraud threshold alerts"]
                ),
                ComplianceFrameworkDetail(
                    framework_name="Copyright / Patent",
                    required=True,
                    risk_level="Medium" if is_ai else "Low",
                    description="IP governance covering proprietary algorithm patentability, AI training model copyright, and software trademark protection.",
                    key_requirements=["Provisional patent filing for novel AI workflow", "Open source license compatibility audit", "Trademark search clearance"],
                    action_items=["File provisional patent within 12 months", "Maintain clean IP assignment agreements for all founders/contractors"]
                )
            ]

        return SecurityComplianceOutput(
            overall_compliance_score=float(resp_dict.get("score", 86.5)),
            data_privacy_tier=resp_dict.get("data_privacy_tier", "Enterprise Privacy & Regulatory Grade" if (is_health or is_fintech) else "Standard SaaS Privacy & Security"),
            ip_protection_strategy=resp_dict.get("ip_protection_strategy", "Provisional Patent + Trade Secret + Clean IP Assignment"),
            frameworks=frameworks_list
        )

