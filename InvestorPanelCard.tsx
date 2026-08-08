import React from 'react';
import { InvestorPanelReview } from '../types/startup';
import { Briefcase, UserCheck, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface InvestorPanelCardProps {
  panel?: InvestorPanelReview[];
}

export const InvestorPanelCard: React.FC<InvestorPanelCardProps> = ({ panel }) => {
  if (!panel || panel.length === 0) return null;

  const getVoteBadge = (vote: string) => {
    switch (vote.toLowerCase()) {
      case 'invest':
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
      case 'conditional':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-300';
      default:
        return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>*investor_review Panel Simulation</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">VC Investment Committee Pitch Review</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulated panel of 3 VC partners evaluating pitch deck weaknesses, key diligence questions & required pivots
          </p>
        </div>
      </div>

      {/* Partners Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {panel.map((p, i) => (
          <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
                    <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{p.partner_name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.firm_type}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getVoteBadge(p.vote)}`}>
                    {p.vote} ({p.score})
                  </span>
                </div>
              </div>

              {/* Pitch Weaknesses */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Pitch Deck Weaknesses:</span>
                </span>
                <ul className="space-y-1">
                  {p.pitch_weaknesses.map((w, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Diligence Questions */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <span className="text-[11px] font-mono font-bold text-sky-400 uppercase flex items-center space-x-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>Key Diligence Questions:</span>
                </span>
                <ul className="space-y-1">
                  {p.key_questions.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-300 italic flex items-start space-x-1.5">
                      <span className="text-sky-400">"</span>
                      <span>{q}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Required Pivots */}
            <div className="pt-3 border-t border-slate-800/80 bg-slate-900/60 p-3 rounded-lg space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center space-x-1">
                <RefreshCw className="w-3 h-3" />
                <span>Required Optimization / Pivot:</span>
              </span>
              <p className="text-xs text-slate-200 font-medium leading-snug">
                {p.required_pivots[0] || 'Refine unit economics and customer acquisition retention rates.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
