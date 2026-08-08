import React from 'react';
import { AgentOutput } from '../types/startup';
import { Bot, CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

interface AgentCardProps {
  agent: AgentOutput;
  onSelect?: (agent: AgentOutput) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 70) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div
      onClick={() => onSelect && onSelect(agent)}
      className="group relative bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-400 transition-colors">
                {agent.agent_name}
              </h4>
              <p className="text-xs text-slate-400">{agent.agent_role}</p>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-full border text-xs font-bold font-mono ${getScoreColor(agent.score)}`}>
            {agent.score.toFixed(1)}/100
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Findings</p>
          <ul className="space-y-1.5">
            {agent.findings.slice(0, 2).map((finding, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span className="line-clamp-2">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5 font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{agent.execution_time_ms} ms</span>
        </div>

        <div className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform font-medium">
          <span>Inspect Prompt</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
