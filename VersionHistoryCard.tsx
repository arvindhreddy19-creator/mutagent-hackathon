import React from 'react';
import { StartupVersion } from '../types/startup';
import { History, Cpu, ArrowRight, CheckCircle2, FileText, Layers } from 'lucide-react';

interface VersionHistoryCardProps {
  versionHistory?: StartupVersion[];
  agentMemoryLogs?: string[];
}

export const VersionHistoryCard: React.FC<VersionHistoryCardProps> = ({
  versionHistory,
  agentMemoryLogs
}) => {
  if ((!versionHistory || versionHistory.length === 0) && (!agentMemoryLogs || agentMemoryLogs.length === 0)) {
    return null;
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Agent Memory & Version History Engine</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Iterative Plan Versions & Orchestrator Decision Log</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent record of startup plan optimizations (v1 → v2) and multi-agent memory events
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Version History List */}
        {versionHistory && versionHistory.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-purple-400 flex items-center space-x-1.5">
              <Layers className="w-4 h-4" />
              <span>Optimized Plan Versions (v1, v2...)</span>
            </h3>

            <div className="space-y-3">
              {versionHistory.map((ver, i) => (
                <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
                        {ver.version_id}
                      </span>
                      <span className="font-bold text-sm text-white">{ver.version_name}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      Score: {ver.overall_score}/100
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-slate-500">{ver.timestamp}</p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Key Improvements & Changes:</span>
                    <ul className="space-y-1">
                      {ver.key_changes.map((chg, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{chg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agent Memory Logs */}
        {agentMemoryLogs && agentMemoryLogs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-sky-400 flex items-center space-x-1.5">
              <History className="w-4 h-4" />
              <span>Agent Memory Decision Logs</span>
            </h3>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 max-h-80 overflow-y-auto">
              {agentMemoryLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-purple-400 select-none">&gt;</span>
                  <span className="text-slate-300 leading-relaxed">{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
