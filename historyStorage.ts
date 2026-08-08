import { FinalReport } from '../types/startup';

const STORAGE_KEY = 'ignite_startup_reports_history';
const MAX_REPORTS = 30;

export function getSavedReports(): FinalReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to parse saved startup reports from localStorage:', err);
    return [];
  }
}

export function saveReportToHistory(report: FinalReport): FinalReport[] {
  try {
    const current = getSavedReports();
    // Filter out duplicate if same submission_id exists
    const filtered = current.filter((r) => r.submission_id !== report.submission_id);
    const updated = [report, ...filtered].slice(0, MAX_REPORTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save report to localStorage:', err);
    return getSavedReports();
  }
}

export function deleteReportFromHistory(submissionId: string): FinalReport[] {
  try {
    const current = getSavedReports();
    const updated = current.filter((r) => r.submission_id !== submissionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete report from localStorage:', err);
    return getSavedReports();
  }
}

export function clearReportHistory(): FinalReport[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear report history from localStorage:', err);
  }
  return [];
}
