import React from 'react';
import { ADLStage } from '../types/startup';
import { FileText, Layers, CheckCircle2, Stethoscope, Zap, Flag } from 'lucide-react';

interface ADLProcessStepperProps {
  activeStage: ADLStage | null;
  isAnalyzing: boolean;
}

const STAGES: { id: ADLStage; label: string; desc: string; icon: any }[] = [
  { id: 'SPEC', label: '1. SPEC', desc: 'Planning & Problem Spec', icon: FileText },
  { id: 'BUILD', label: '2. BUILD', desc: '10 Parallel Specialists', icon: Layers },
  { id: 'EVALUATE', label: '3. EVALUATE', desc: 'MutAgent Cross-Audit', icon: CheckCircle2 },
  { id: 'DIAGNOSE', label: '4. DIAGNOSE', desc: 'Root Cause Analysis', icon: Stethoscope },
  { id: 'OPTIMIZE', label: '5. OPTIMIZE', desc: 'Self-Healing Strategy', icon: Zap },
  { id: 'FINAL', label: '6. REPORT', desc: 'Final Validation Report', icon: Flag },
];

export const ADLProcessStepper: React.FC<ADLProcessStepperProps> = ({ activeStage, isAnalyzing }) => {
  const getStageIndex = (stage: ADLStage | null) => {
    if (!stage) return -1;
    return STAGES.findIndex((s) => s.id === stage);
  };

  const currentIndex = getStageIndex(activeStage);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Agentic Development Lifecycle (ADL) Execution
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured 5-stage orchestration pipeline validating startup hypotheses in parallel.
          </p>
        </div>
        {isAnalyzing && (
          <div className="flex items-center space-x-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Executing ADL Cycle...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((s, index) => {
          const Icon = s.icon;
          const isActive = currentIndex === index;
          const isCompleted = currentIndex > index || activeStage === 'FINAL';

          return (
            <div
              key={s.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : isCompleted
                  ? 'bg-slate-800/80 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400 animate-bounce' : isCompleted ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/60">
                  {isCompleted ? '✓ Done' : isActive ? 'Running' : 'Wait'}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide">{s.label}</p>
                <p className="text-[10px] opacity-80 leading-tight mt-0.5">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
