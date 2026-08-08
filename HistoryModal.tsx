import React, { useState } from 'react';
import { FinalReport } from '../types/startup';
import {
  X,
  History,
  Trash2,
  ExternalLink,
  Search,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: FinalReport[];
  onSelectReport: (report: FinalReport) => void;
  onDeleteReport: (submissionId: string) => void;
  onClearAll: () => void;
  currentReportId?: string;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  reports,
  onSelectReport,
  onDeleteReport,
  onClearAll,
  currentReportId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredReports = reports.filter(
    (r) =>
      r.idea_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.submission_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.adl_stage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Saved Analysis History</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {reports.length} {reports.length === 1 ? 'Report' : 'Reports'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Persisted locally in your browser's localStorage
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {reports.length > 0 && !confirmClear && (
              <button
                onClick={() => setConfirmClear(true)}
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            {confirmClear && (
              <div className="flex items-center space-x-2 bg-rose-950/80 p-1 rounded-xl border border-rose-500/30 text-xs">
                <span className="text-rose-200 px-2 font-medium">Delete all history?</span>
                <button
                  onClick={() => {
                    onClearAll();
                    setConfirmClear(false);
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {reports.length > 0 && (
          <div className="p-4 bg-slate-950/30 border-b border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search past reports by title, ID, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>
        )}

        {/* Modal Body / Report List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {reports.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto text-slate-500">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No saved reports found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When you run a MutAgent ADL startup validation, your generated report will automatically save here in localStorage.
              </p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-slate-400">
              <AlertTriangle className="w-6 h-6 mx-auto text-amber-400/80" />
              <p className="text-xs font-semibold">No saved reports match "{searchTerm}"</p>
            </div>
          ) : (
            filteredReports.map((r) => {
              const isCurrent = r.submission_id === currentReportId;
              const formattedDate = new Date(r.timestamp || Date.now()).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={r.submission_id}
                  className={`bg-slate-950/80 border rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? 'border-amber-500/60 ring-1 ring-amber-500/40 bg-amber-500/5'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-bold text-white text-base">{r.idea_title}</span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          Active View
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{formattedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">#{r.submission_id}</span>
                      <span>•</span>
                      <span className="text-slate-300 font-medium">
                        Capital: ${r.cost_breakdown?.total_estimated_usd?.toLocaleString() || 0} USD
                      </span>
                    </div>
                  </div>

                  {/* Score & Controls */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Score
                      </div>
                      <div
                        className={`text-lg font-black font-mono ${
                          r.overall_startup_score >= 80
                            ? 'text-emerald-400'
                            : r.overall_startup_score >= 65
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {r.overall_startup_score?.toFixed(1)}/100
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectReport(r);
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/10 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Load Report</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteReport(r.submission_id)}
                      title="Delete report"
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Reports persist locally in browser state across sessions.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
