import React from 'react';
import { SecurityComplianceOutput } from '../types/startup';
import { ShieldAlert, ShieldCheck, Lock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface ComplianceMatrixCardProps {
  compliance?: SecurityComplianceOutput;
}

export const ComplianceMatrixCard: React.FC<ComplianceMatrixCardProps> = ({ compliance }) => {
  if (!compliance) return null;

  const getRiskBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
      case 'high':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-300';
      case 'medium':
        return 'bg-sky-500/20 border-sky-500/40 text-sky-300';
      default:
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Agent #13: Security & Regulatory Compliance Audit</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Global Legal & Data Governance Matrix</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated compliance check for GDPR, DPDP Act (India), HIPAA, PCI-DSS, KYC/AML & Copyright/Patent IP
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 self-start sm:self-auto">
          <Lock className="w-5 h-5 text-rose-400" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Compliance Index</div>
            <div className="text-base font-black text-white">{compliance.overall_compliance_score} / 100</div>
          </div>
        </div>
      </div>

      {/* Overview Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Data Privacy Tier</span>
          <p className="text-sm font-bold text-amber-300">{compliance.data_privacy_tier}</p>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">IP Protection Strategy</span>
          <p className="text-sm font-bold text-emerald-300">{compliance.ip_protection_strategy}</p>
        </div>
      </div>

      {/* Framework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {compliance.frameworks.map((fw, i) => (
          <div
            key={i}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-sm text-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{fw.framework_name}</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getRiskBadge(fw.risk_level)}`}>
                  {fw.risk_level} Risk
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{fw.description}</p>

              {/* Key Requirements */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Requirements:</span>
                <ul className="space-y-1">
                  {fw.key_requirements.slice(0, 3).map((req, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Items */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Priority Action Item:</span>
              </span>
              <p className="text-[11px] text-slate-200 font-medium leading-snug">
                {fw.action_items[0] || 'Implement standard compliance safeguards before launch.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
