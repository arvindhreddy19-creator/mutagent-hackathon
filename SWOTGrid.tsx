import React from 'react';
import { SWOTAnalysis } from '../types/startup';
import { ShieldCheck, AlertCircle, TrendingUp, AlertTriangle } from 'lucide-react';

interface SWOTGridProps {
  swot: SWOTAnalysis;
}

export const SWOTGrid: React.FC<SWOTGridProps> = ({ swot }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
        SWOT Strategic Assessment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Strengths</span>
          </div>
          <ul className="space-y-1.5">
            {swot.strengths.map((item, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Weaknesses</span>
          </div>
          <ul className="space-y-1.5">
            {swot.weaknesses.map((item, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-sky-950/20 border border-sky-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Opportunities</span>
          </div>
          <ul className="space-y-1.5">
            {swot.opportunities.map((item, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-sky-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Threats</span>
          </div>
          <ul className="space-y-1.5">
            {swot.threats.map((item, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
