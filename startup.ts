export interface StartupSubmission {
  idea_title: string;
  description: string;
  target_market: string;
  industry: string;
  budget_range: string;
  stage?: string;
  additional_notes?: string;
}

export interface AgentOutput {
  agent_name: string;
  agent_role: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  score: number;
  findings: string[];
  recommendations: string[];
  raw_response: string;
  execution_time_ms: number;
  timestamp: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TimelinePhase {
  phase_number: number;
  phase_name: string;
  duration_months: number;
  milestones: string[];
  deliverables: string[];
}

export interface CostCategory {
  category: string;
  estimated_amount_usd: number;
  description: string;
}

export interface CostBreakdown {
  categories: CostCategory[];
  total_estimated_usd: number;
  runway_months: number;
}

export interface GoToMarketStrategy {
  target_demographics: string[];
  acquisition_channels: string[];
  value_proposition: string;
  pricing_model: string;
  key_metrics: string[];
}

export interface MutAgentEvaluation {
  evaluator_version: string;
  agent_completeness_score: number;
  consistency_score: number;
  depth_score: number;
  alignment_score: number;
  overall_quality_score: number;
  flagged_issues: string[];
}

export interface MutAgentDiagnosis {
  bottlenecks: string[];
  logic_gaps: string[];
  unaddressed_risks: string[];
  root_cause_analysis: string;
}

export interface MutAgentOptimization {
  optimization_actions: string[];
  revised_scores: Record<string, number>;
  enhanced_recommendations: string[];
  strategic_pivot_options: string[];
}

export interface ComplianceFrameworkDetail {
  framework_name: string; // "GDPR" | "DPDP Act (India)" | "HIPAA" | "PCI-DSS" | "KYC/AML" | "Copyright / Patent"
  required: boolean;
  risk_level: 'Critical' | 'High' | 'Medium' | 'Low' | 'None';
  description: string;
  key_requirements: string[];
  action_items: string[];
}

export interface SecurityComplianceOutput {
  overall_compliance_score: number;
  data_privacy_tier: string;
  ip_protection_strategy: string;
  frameworks: ComplianceFrameworkDetail[];
}

export interface MarketPulseSignal {
  source: string;
  signal_type: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  metric_label: string;
  summary: string;
  highlights: string[];
}

export interface LiveMarketPulse {
  demand_trend: 'UP' | 'DOWN' | 'STABLE';
  demand_velocity: string;
  competition_trend: 'UP' | 'DOWN' | 'STABLE';
  competition_index: string;
  investor_interest_trend: 'UP' | 'DOWN' | 'STABLE';
  investor_interest_summary: string;
  signals: MarketPulseSignal[];
}

export interface ValidationCheck {
  vector: string;
  status: 'Passed' | 'Warning' | 'Critical';
  score: number;
  key_findings: string[];
}

export interface InvestorPanelReview {
  partner_name: string;
  firm_type: string;
  vote: 'Invest' | 'Conditional' | 'Pass';
  score: number;
  pitch_weaknesses: string[];
  key_questions: string[];
  required_pivots: string[];
}

export interface StartupVersion {
  version_id: string;
  version_name: string;
  timestamp: string;
  overall_score: number;
  key_changes: string[];
}

export interface FinalReport {
  submission_id: string;
  idea_title: string;
  timestamp: string;
  adl_stage: 'SPEC' | 'BUILD' | 'EVALUATE' | 'DIAGNOSE' | 'OPTIMIZE' | 'FINAL';
  
  market_score: number;
  competition_score: number;
  financial_score: number;
  technical_score: number;
  risk_score: number;
  investment_score: number;
  overall_startup_score: number;
  
  swot_analysis: SWOTAnalysis;
  timeline: TimelinePhase[];
  cost_breakdown: CostBreakdown;
  gtm_strategy: GoToMarketStrategy;
  recommendations: string[];
  
  agent_outputs: Record<string, AgentOutput>;
  
  mutagent_evaluation?: MutAgentEvaluation;
  mutagent_diagnosis?: MutAgentDiagnosis;
  mutagent_optimization?: MutAgentOptimization;

  compliance_matrix?: SecurityComplianceOutput;
  market_pulse?: LiveMarketPulse;
  validation_checks?: ValidationCheck[];
  investor_panel?: InvestorPanelReview[];
  version_history?: StartupVersion[];
  agent_memory_logs?: string[];
}

export type ADLStage = 'SPEC' | 'BUILD' | 'EVALUATE' | 'DIAGNOSE' | 'OPTIMIZE' | 'FINAL';
