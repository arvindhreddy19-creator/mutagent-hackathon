import React from 'react';
import { AgentOutput } from '../types/startup';
import { X, Bot, Clock, CheckCircle2, Lightbulb, Terminal } from 'lucide-react';

interface AgentDetailModalProps {
  agent: AgentOutput | null;
  onClose: () => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-white">{agent.agent_name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                Score: {agent.score.toFixed(1)}/100
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{agent.agent_role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Detailed Findings & Market Evidence</span>
            </h4>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
              {agent.findings.map((f, i) => (
                <div key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Strategic Action Recommendations</span>
            </h4>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
              {agent.recommendations.map((r, i) => (
                <div key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4" />
              <span>Execution Metadata</span>
            </h4>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-400 space-y-1">
              <p>Execution Time: {agent.execution_time_ms} ms</p>
              <p>Timestamp: {agent.timestamp}</p>
              <p>Status: {agent.status.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
