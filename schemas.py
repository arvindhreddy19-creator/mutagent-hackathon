"""
Ignite Studio - Data Schemas & Models
Strict typed data transfer objects for MutAgent ADL pipeline.
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class StartupSubmission:
    idea_title: str
    description: str
    target_market: str
    industry: str
    budget_range: str
    stage: str = "Idea"
    additional_notes: Optional[str] = ""


@dataclass
class AgentOutput:
    agent_name: str
    agent_role: str
    status: str  # "pending", "running", "completed", "failed"
    score: float  # 0 to 100
    findings: List[str]
    recommendations: List[str]
    raw_response: str
    execution_time_ms: float
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())


@dataclass
class SWOTAnalysis:
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


@dataclass
class TimelinePhase:
    phase_number: int
    phase_name: str
    duration_months: int
    milestones: List[str]
    deliverables: List[str]


@dataclass
class CostCategory:
    category: str
    estimated_amount_usd: float
    description: str


@dataclass
class CostBreakdown:
    categories: List[CostCategory]
    total_estimated_usd: float
    runway_months: int


@dataclass
class GoToMarketStrategy:
    target_demographics: List[str]
    acquisition_channels: List[str]
    value_proposition: str
    pricing_model: str
    key_metrics: List[str]


@dataclass
class MutAgentEvaluation:
    evaluator_version: str
    agent_completeness_score: float
    consistency_score: float
    depth_score: float
    alignment_score: float
    overall_quality_score: float
    flagged_issues: List[str]


@dataclass
class MutAgentDiagnosis:
    bottlenecks: List[str]
    logic_gaps: List[str]
    unaddressed_risks: List[str]
    root_cause_analysis: str


@dataclass
class MutAgentOptimization:
    optimization_actions: List[str]
    revised_scores: Dict[str, float]
    enhanced_recommendations: List[str]
    strategic_pivot_options: List[str]


@dataclass
class ComplianceFrameworkDetail:
    framework_name: str  # e.g., "GDPR", "DPDP Act (India)", "HIPAA", "PCI-DSS", "KYC/AML", "Copyright / Patent"
    required: bool
    risk_level: str  # "Critical", "High", "Medium", "Low", "None"
    description: str
    key_requirements: List[str]
    action_items: List[str]


@dataclass
class SecurityComplianceOutput:
    overall_compliance_score: float
    data_privacy_tier: str
    ip_protection_strategy: str
    frameworks: List[ComplianceFrameworkDetail] = field(default_factory=list)


@dataclass
class MarketPulseSignal:
    source: str  # "Google Trends", "Recent News", "Reddit Discussions", "Product Hunt", "GitHub"
    signal_type: str  # "Demand", "Competition", "Investor Interest", "Developer Growth"
    trend: str  # "UP", "DOWN", "STABLE"
    metric_label: str
    summary: str
    highlights: List[str] = field(default_factory=list)


@dataclass
class LiveMarketPulse:
    demand_trend: str  # "UP", "DOWN", "STABLE"
    demand_velocity: str  # e.g., "+34% MoM search interest"
    competition_trend: str  # "UP", "DOWN", "STABLE"
    competition_index: str  # e.g., "High - 12 active funded incumbents"
    investor_interest_trend: str  # "UP", "DOWN", "STABLE"
    investor_interest_summary: str
    signals: List[MarketPulseSignal] = field(default_factory=list)


@dataclass
class ValidationCheck:
    vector: str  # "Market Fit", "Technical Feasibility", "Financial Viability", "Legal Concerns", "Risk Control"
    status: str  # "Passed", "Warning", "Critical"
    score: float
    key_findings: List[str] = field(default_factory=list)


@dataclass
class InvestorPanelReview:
    partner_name: str  # e.g., "Lead Seed VC Partner", "CTO / Technical Partner", "Risk & Legal Officer"
    firm_type: str
    vote: str  # "Invest", "Conditional", "Pass"
    score: float
    pitch_weaknesses: List[str] = field(default_factory=list)
    key_questions: List[str] = field(default_factory=list)
    required_pivots: List[str] = field(default_factory=list)


@dataclass
class StartupVersion:
    version_id: str  # "v1.0", "v2.0-optimized"
    version_name: str
    timestamp: str
    overall_score: float
    key_changes: List[str] = field(default_factory=list)


@dataclass
class FinalReport:
    submission_id: str
    idea_title: str
    timestamp: str
    adl_stage: str  # "SPEC", "BUILD", "EVALUATE", "DIAGNOSE", "OPTIMIZE", "FINAL"
    
    # Scores
    market_score: float
    competition_score: float
    financial_score: float
    technical_score: float
    risk_score: float
    investment_score: float
    overall_startup_score: float
    
    # Structured Insights
    swot_analysis: SWOTAnalysis
    timeline: List[TimelinePhase]
    cost_breakdown: CostBreakdown
    gtm_strategy: GoToMarketStrategy
    recommendations: List[str]
    
    # Agent Detailed Outputs
    agent_outputs: Dict[str, AgentOutput]
    
    # MutAgent Lifecycle Insights
    mutagent_evaluation: Optional[MutAgentEvaluation] = None
    mutagent_diagnosis: Optional[MutAgentDiagnosis] = None
    mutagent_optimization: Optional[MutAgentOptimization] = None

    # Enhanced New Modules
    compliance_matrix: Optional[SecurityComplianceOutput] = None
    market_pulse: Optional[LiveMarketPulse] = None
    validation_checks: List[ValidationCheck] = field(default_factory=list)
    investor_panel: List[InvestorPanelReview] = field(default_factory=list)
    version_history: List[StartupVersion] = field(default_factory=list)
    agent_memory_logs: List[str] = field(default_factory=list)

