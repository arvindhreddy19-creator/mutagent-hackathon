import React from 'react';
import { ValidationCheck } from '../types/startup';
import { CheckCircle2, AlertCircle, XCircle, ShieldCheck } from 'lucide-react';

interface ValidationPrecheckCardProps {
  checks?: ValidationCheck[];
}

export const ValidationPrecheckCard: React.FC<ValidationPrecheckCardProps> = ({ checks }) => {
  if (!checks || checks.length === 0) return null;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      default:
        return <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-300';
      default:
        return 'bg-rose-500/10 border-rose-500/30 text-rose-300';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>*startup_validate Multi-Vector Pre-check</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">5-Point Startup Viability Diagnostic</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pre-evaluation verification across Market Fit, Technical Feasibility, Financials, Legal, and Risk Control
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checks.map((chk, i) => (
          <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(chk.status)}
                <span className="font-bold text-sm text-white">{chk.vector}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(chk.status)}`}>
                {chk.status} ({chk.score})
              </span>
            </div>

            <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
              {chk.key_findings.map((f, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-sky-400">•</span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
