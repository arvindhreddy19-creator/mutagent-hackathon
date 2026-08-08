import React from 'react';
import { Cpu, Rocket, ShieldCheck, History } from 'lucide-react';

interface HeaderProps {
  onLoadSample?: (sample: any) => void;
  sampleCount?: number;
  historyCount?: number;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ historyCount = 0, onOpenHistory }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">Ignite Studio</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                MutAgent ADL
              </span>
            </div>
            <p className="text-xs text-slate-400">Multi-Agent Startup Validation Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Groq Llama 3.3 70B & Gemini 3.6</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>14 Agents Online</span>
          </div>

          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <History className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">History</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              {historyCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
