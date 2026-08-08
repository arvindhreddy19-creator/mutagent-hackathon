import React, { useState } from 'react';
import { FinalReport, AgentOutput } from '../types/startup';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Activity, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

interface ViabilityChartProps {
  report: FinalReport;
}

export const ViabilityChart: React.FC<ViabilityChartProps> = ({ report }) => {
  const [chartType, setChartType] = useState<'radar' | 'agents' | 'budget'>('radar');

  // Data for Radar Chart (6 Core Pillars vs 80 Point Benchmark)
  const radarData = [
    { metric: 'Market TAM', score: report.market_score || 0, benchmark: 75 },
    { metric: 'Competition Moat', score: report.competition_score || 0, benchmark: 70 },
    { metric: 'Unit Economics', score: report.financial_score || 0, benchmark: 80 },
    { metric: 'Tech Architecture', score: report.technical_score || 0, benchmark: 85 },
    { metric: 'Risk Mitigation', score: report.risk_score || 0, benchmark: 75 },
    { metric: 'Investor Readiness', score: report.investment_score || 0, benchmark: 80 },
  ];

  // Data for Bar Chart (Agent Scores)
  const agentList = Object.values(report.agent_outputs || {}) as AgentOutput[];
  const agentBarData = agentList.map((agent) => ({
    name: agent.agent_name.replace(' Agent', '').replace(' Analysis', '').replace(' Architect', ''),
    score: agent.score,
    time: agent.execution_time_ms,
  }));

  // Data for Pie Chart (Cost Category Allocation)
  const costCategories = report.cost_breakdown?.categories || [];
  const pieData = costCategories.map((c) => ({
    name: c.category,
    value: c.estimated_amount_usd,
  }));

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <p className="font-bold text-amber-400">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-slate-200">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.color || entry.fill }}
              ></span>
              <span className="font-medium">{entry.name}:</span>
              <span className="font-mono font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Market Readiness & Viability Data Visualization</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive multi-dimensional benchmark analysis computed across parallel agent feedback loops.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setChartType('radar')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'radar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Radar Matrix</span>
          </button>

          <button
            onClick={() => setChartType('agents')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'agents'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Agent Scores</span>
          </button>

          <button
            onClick={() => setChartType('budget')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'budget'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>Capital Allocation</span>
          </button>
        </div>
      </div>

      {/* Charts Display */}
      <div className="w-full h-80 pt-2">
        {chartType === 'radar' && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
              <Radar
                name="Idea Score"
                dataKey="score"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.4}
              />
              <Radar
                name="VC Benchmark"
                dataKey="benchmark"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.15}
                strokeDasharray="4 4"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </RadarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'agents' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentBarData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Agent Evaluation Score" radius={[6, 6, 0, 0]}>
                {agentBarData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.score >= 85 ? '#10b981' : entry.score >= 75 ? '#f59e0b' : '#f43f5e'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'budget' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Insights Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="font-semibold text-slate-200">Overall Viability Index</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {report.overall_startup_score?.toFixed(1) || '0.0'}/100 (Strong Market Fit)
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="font-semibold text-slate-200">Highest Scoring Sector</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Technical Stack ({report.technical_score || 0}/100)
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
          <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <p className="font-semibold text-slate-200">Investor Readiness</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {report.investment_score || 0}/100 (Seed Stage Eligible)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
