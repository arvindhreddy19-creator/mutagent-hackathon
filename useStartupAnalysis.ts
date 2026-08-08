import { useState, useEffect } from 'react';
import { StartupSubmission, FinalReport, ADLStage, AgentOutput } from '../types/startup';
import { submitStartupIdea } from '../api/client';
import {
  getSavedReports,
  saveReportToHistory,
  deleteReportFromHistory,
  clearReportHistory,
} from '../utils/historyStorage';

export function useStartupAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState<ADLStage | null>(null);
  const [activeAgents, setActiveAgents] = useState<Record<string, AgentOutput>>({});
  const [report, setReport] = useState<FinalReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedReports, setSavedReports] = useState<FinalReport[]>([]);

  // Initialize saved reports from localStorage on mount
  useEffect(() => {
    const history = getSavedReports();
    setSavedReports(history);
  }, []);

  const startAnalysis = async (submission: StartupSubmission) => {
    setIsAnalyzing(true);
    setError(null);
    setReport(null);
    setActiveAgents({});

    try {
      // Simulate real-time ADL visual progress stages
      setCurrentStage('SPEC');
      await new Promise((r) => setTimeout(r, 600));

      setCurrentStage('BUILD');
      await new Promise((r) => setTimeout(r, 800));

      setCurrentStage('EVALUATE');
      await new Promise((r) => setTimeout(r, 600));

      setCurrentStage('DIAGNOSE');
      await new Promise((r) => setTimeout(r, 500));

      setCurrentStage('OPTIMIZE');
      await new Promise((r) => setTimeout(r, 500));

      // Call API
      const result = await submitStartupIdea(submission);
      setReport(result.report);
      setActiveAgents(result.report.agent_outputs);
      setCurrentStage('FINAL');

      // Persist to localStorage
      const updatedHistory = saveReportToHistory(result.report);
      setSavedReports(updatedHistory);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectReport = (selectedReport: FinalReport) => {
    setReport(selectedReport);
    setActiveAgents(selectedReport.agent_outputs || {});
    setCurrentStage('FINAL');
  };

  const removeReport = (submissionId: string) => {
    const updated = deleteReportFromHistory(submissionId);
    setSavedReports(updated);
    if (report?.submission_id === submissionId) {
      setReport(null);
      setCurrentStage(null);
    }
  };

  const clearAllHistory = () => {
    const updated = clearReportHistory();
    setSavedReports(updated);
  };

  const resetAnalysis = () => {
    setIsAnalyzing(false);
    setCurrentStage(null);
    setActiveAgents({});
    setReport(null);
    setError(null);
  };

  return {
    isAnalyzing,
    currentStage,
    activeAgents,
    report,
    error,
    savedReports,
    startAnalysis,
    resetAnalysis,
    selectReport,
    removeReport,
    clearAllHistory,
  };
}
