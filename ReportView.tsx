import React, { useState } from 'react';
import { FinalReport, AgentOutput } from '../types/startup';
import { ScoreGauge } from './ScoreGauge';
import { SWOTGrid } from './SWOTGrid';
import { TimelineChart } from './TimelineChart';
import { CostBreakdownCard } from './CostBreakdownCard';
import { GTMStrategyCard } from './GTMStrategyCard';
import { AgentPipelineVisualizer } from './AgentPipelineVisualizer';
import { AgentDetailModal } from './AgentDetailModal';
import { ViabilityChart } from './ViabilityChart';
import { ComplianceMatrixCard } from './ComplianceMatrixCard';
import { MarketPulseCard } from './MarketPulseCard';
import { ValidationPrecheckCard } from './ValidationPrecheckCard';
import { InvestorPanelCard } from './InvestorPanelCard';
import { VersionHistoryCard } from './VersionHistoryCard';
import { Award, CheckCircle2, ShieldCheck, Zap, RefreshCw, Layers } from 'lucide-react';

interface ReportViewProps {
  report: FinalReport;
  onReset: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onReset }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentOutput | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'pulse' | 'compliance' | 'investors' | 'analytics' | 'swot' | 'roadmap' | 'finance' | 'gtm' | 'agents' | 'history'>('overview');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              {report.adl_stage} VALIDATED
            </span>
            <span className="text-xs text-slate-400 font-mono">Report ID: #{report.submission_id}</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1.5">{report.idea_title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">Validated via MutAgent Multi-Agent ADL Framework</p>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700/60 cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Validate Another Idea</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Executive Scorecard' },
          { id: 'pulse', label: '🌍 Live Market Pulse' },
          { id: 'compliance', label: '🛡️ Compliance Audit' },
          { id: 'investors', label: '💼 VC Investor Panel' },
          { id: 'analytics', label: 'Viability Charts' },
          { id: 'swot', label: 'SWOT Matrix' },
          { id: 'roadmap', label: 'Execution Roadmap' },
          { id: 'finance', label: 'Financials & Costs' },
          { id: 'gtm', label: 'GTM Strategy' },
          { id: 'history', label: '🧠 Version & Memory' },
          { id: 'agents', label: `Specialist Agents (${Object.keys(report.agent_outputs).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Score Gauges Row */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Multidimensional Startup Score Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              <ScoreGauge score={report.overall_startup_score} label="Overall Score" size="sm" sublabel="Weighted ADL" />
              <ScoreGauge score={report.market_score} label="Market Score" size="sm" sublabel="TAM & Growth" />
              <ScoreGauge score={report.competition_score} label="Competition" size="sm" sublabel="Moat Strength" />
              <ScoreGauge score={report.financial_score} label="Financials" size="sm" sublabel="Unit Economics" />
              <ScoreGauge score={report.technical_score} label="Technical" size="sm" sublabel="Stack & Infra" />
              <ScoreGauge score={report.risk_score} label="Risk Safety" size="sm" sublabel="Safety Index" />
              <ScoreGauge score={report.investment_score} label="Investor Readiness" size="sm" sublabel="VC Fundability" />
            </div>
          </div>

          {/* Recharts Viability & Market Readiness Chart */}
          <ViabilityChart report={report} />

          {/* 5-Point Validation Precheck Card */}
          <ValidationPrecheckCard checks={report.validation_checks} />

          {/* Live Market Pulse Card */}
          <MarketPulseCard pulse={report.market_pulse} />

          {/* Security & Compliance Card */}
          <ComplianceMatrixCard compliance={report.compliance_matrix} />

          {/* VC Investor Panel Review Card */}
          <InvestorPanelCard panel={report.investor_panel} />

          {/* MutAgent Optimization Box */}
          {report.mutagent_optimization && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>MutAgent Self-Healing Optimization Protocol</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-300 uppercase">Self-Healing Optimization Actions</p>
                  <ul className="space-y-1">
                    {report.mutagent_optimization.optimization_actions.map((act, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-amber-400">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-300 uppercase">Strategic Pivot Options</p>
                  <ul className="space-y-1">
                    {report.mutagent_optimization.strategic_pivot_options.map((piv, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-emerald-400">•</span>
                        <span>{piv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Consolidated Strategic Recommendations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.recommendations.map((rec, i) => (
                <div key={i} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pulse' && <MarketPulseCard pulse={report.market_pulse} />}
      {activeTab === 'compliance' && <ComplianceMatrixCard compliance={report.compliance_matrix} />}
      {activeTab === 'investors' && <InvestorPanelCard panel={report.investor_panel} />}
      {activeTab === 'analytics' && <ViabilityChart report={report} />}
      {activeTab === 'swot' && <SWOTGrid swot={report.swot_analysis} />}
      {activeTab === 'roadmap' && <TimelineChart timeline={report.timeline} />}
      {activeTab === 'finance' && <CostBreakdownCard costBreakdown={report.cost_breakdown} />}
      {activeTab === 'gtm' && <GTMStrategyCard gtm={report.gtm_strategy} />}
      {activeTab === 'history' && (
        <VersionHistoryCard versionHistory={report.version_history} agentMemoryLogs={report.agent_memory_logs} />
      )}
      {activeTab === 'agents' && (
        <AgentPipelineVisualizer agents={report.agent_outputs} onSelectAgent={(agent) => setSelectedAgent(agent)} />
      )}

      {/* Modal Inspection */}
      <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};

