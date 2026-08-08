import React from 'react';
import { LiveMarketPulse } from '../types/startup';
import { Globe, TrendingUp, Search, Newspaper, MessageSquare, Award, GitBranch, ArrowUpRight } from 'lucide-react';

interface MarketPulseCardProps {
  pulse?: LiveMarketPulse;
}

export const MarketPulseCard: React.FC<MarketPulseCardProps> = ({ pulse }) => {
  if (!pulse) return null;

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'google trends':
        return <Search className="w-4 h-4 text-sky-400" />;
      case 'recent news & press':
      case 'recent news':
        return <Newspaper className="w-4 h-4 text-amber-400" />;
      case 'reddit discussions':
        return <MessageSquare className="w-4 h-4 text-orange-400" />;
      case 'product hunt':
        return <Award className="w-4 h-4 text-rose-400" />;
      case 'github ecosystem':
      case 'github':
        return <GitBranch className="w-4 h-4 text-purple-400" />;
      default:
        return <Globe className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Agent #4: Live Market Pulse Synthesis</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Real-Time Market & Demand Signals</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Fresh data aggregated across Google Trends, Press News, Reddit, Product Hunt, and GitHub
          </p>
        </div>

        {/* Pulse Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Demand ↑</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Competition ↑</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Investor Interest ↑</span>
          </div>
        </div>
      </div>

      {/* High-Level Pulse Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Demand Velocity</span>
          <p className="text-sm font-bold text-emerald-400 flex items-center space-x-1">
            <span>{pulse.demand_velocity}</span>
          </p>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Competition Index</span>
          <p className="text-sm font-bold text-amber-400">{pulse.competition_index}</p>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">VC Deal Momentum</span>
          <p className="text-xs font-medium text-slate-200 leading-snug">{pulse.investor_interest_summary}</p>
        </div>
      </div>

      {/* Signal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pulse.signals.map((sig, idx) => (
          <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                {getSourceIcon(sig.source)}
                <span className="font-bold text-sm text-white">{sig.source}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                {sig.signal_type}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">{sig.summary}</p>

            {sig.highlights && sig.highlights.length > 0 && (
              <ul className="space-y-1 pt-2 border-t border-slate-800/80">
                {sig.highlights.map((h, i) => (
                  <li key={i} className="text-[11px] text-slate-400 flex items-start space-x-1.5">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
