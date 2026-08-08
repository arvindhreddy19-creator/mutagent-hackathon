import React from 'react';
import { CostBreakdown } from '../types/startup';
import { DollarSign, Clock, ShieldAlert } from 'lucide-react';

interface CostBreakdownCardProps {
  costBreakdown: CostBreakdown;
}

export const CostBreakdownCard: React.FC<CostBreakdownCardProps> = ({ costBreakdown }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>Financial Capital & Runway Analysis</span>
        </h3>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>{costBreakdown.runway_months} Months Estimated Runway</span>
        </div>
      </div>

      <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Estimated Capital Required</p>
          <p className="text-2xl font-black font-mono text-white mt-0.5">
            ${costBreakdown.total_estimated_usd.toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Burn Horizon</p>
          <p className="text-sm font-bold text-amber-400 mt-0.5">~$3,750 / Month</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost Allocation Breakdown</p>
        <div className="space-y-2">
          {costBreakdown.categories.map((cat, idx) => {
            const percentage = Math.round((cat.estimated_amount_usd / costBreakdown.total_estimated_usd) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-200">{cat.category}</span>
                  <span className="font-mono text-slate-300">
                    ${cat.estimated_amount_usd.toLocaleString()} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 opacity-80">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
