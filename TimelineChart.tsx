import React from 'react';
import { TimelinePhase } from '../types/startup';
import { Calendar, Flag, CheckCircle } from 'lucide-react';

interface TimelineChartProps {
  timeline: TimelinePhase[];
}

export const TimelineChart: React.FC<TimelineChartProps> = ({ timeline }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Execution Roadmap Timeline</span>
        </h3>
        <span className="text-xs text-slate-400 font-mono">12-Month Launch Trajectory</span>
      </div>

      <div className="space-y-4">
        {timeline.map((phase) => (
          <div key={phase.phase_number} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center justify-center border border-amber-500/30">
                  P{phase.phase_number}
                </span>
                <h4 className="font-bold text-slate-100 text-sm">{phase.phase_name}</h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {phase.duration_months} Months
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-800/80">
              <div>
                <p className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <Flag className="w-3 h-3" />
                  <span>Key Milestones</span>
                </p>
                <ul className="space-y-1">
                  {phase.milestones.map((m, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center space-x-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-emerald-400/90 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Core Deliverables</span>
                </p>
                <ul className="space-y-1">
                  {phase.deliverables.map((d, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center space-x-1.5">
                      <span className="text-emerald-500">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
