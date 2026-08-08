import React, { useState } from 'react';
import { Header } from './components/Header';
import { ADLProcessStepper } from './components/ADLProcessStepper';
import { StartupForm } from './components/StartupForm';
import { ReportView } from './components/ReportView';
import { HistoryModal } from './components/HistoryModal';
import { useStartupAnalysis } from './hooks/useStartupAnalysis';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const {
    isAnalyzing,
    currentStage,
    report,
    error,
    savedReports,
    startAnalysis,
    resetAnalysis,
    selectReport,
    removeReport,
    clearAllHistory,
  } = useStartupAnalysis();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Header
        historyCount={savedReports.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ADL Stepper Progress */}
        {(isAnalyzing || currentStage) && (
          <ADLProcessStepper activeStage={currentStage} isAnalyzing={isAnalyzing} />
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 flex items-center space-x-3 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* View Mode: Form or Final Report */}
        {!report ? (
          <div className="space-y-8">
            <StartupForm
              onSubmit={startAnalysis}
              isAnalyzing={isAnalyzing}
              onOpenHistory={() => setIsHistoryOpen(true)}
              savedCount={savedReports.length}
            />
          </div>
        ) : (
          <ReportView report={report} onReset={resetAnalysis} />
        )}
      </main>

      {/* History Modal Drawer */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        reports={savedReports}
        onSelectReport={selectReport}
        onDeleteReport={removeReport}
        onClearAll={clearAllHistory}
        currentReportId={report?.submission_id}
      />

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Ignite Studio. Multi-Agent AI Startup Validation Platform.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 transition-colors">MutAgent ADL Spec</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Groq Llama 3.3 70B & Gemini 3.6</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
