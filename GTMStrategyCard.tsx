import React from 'react';
import { GoToMarketStrategy } from '../types/startup';
import { Target, Users, Megaphone, DollarSign, Activity } from 'lucide-react';

interface GTMStrategyCardProps {
  gtm: GoToMarketStrategy;
}

export const GTMStrategyCard: React.FC<GTMStrategyCardProps> = ({ gtm }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
        <Target className="w-4 h-4" />
        <span>Go-To-Market & Growth Architecture</span>
      </h3>

      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Core Value Proposition</p>
        <p className="text-sm font-medium text-slate-200">{gtm.value_proposition}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Target Demographics */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Target Demographics</span>
          </div>
          <ul className="space-y-1">
            {gtm.target_demographics.map((demo, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-amber-400">•</span>
                <span>{demo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Acquisition Channels */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Megaphone className="w-4 h-4 text-orange-400" />
            <span>Acquisition Channels</span>
          </div>
          <ul className="space-y-1">
            {gtm.acquisition_channels.map((chan, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-orange-400">•</span>
                <span>{chan}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monetization & Pricing</span>
          </div>
          <p className="text-xs font-semibold text-emerald-400 mt-1">{gtm.pricing_model}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Key Tracking Metrics</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {gtm.key_metrics.map((m, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
