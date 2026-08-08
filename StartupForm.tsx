import React, { useState } from 'react';
import { StartupSubmission } from '../types/startup';
import { Rocket, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';

interface StartupFormProps {
  onSubmit: (submission: StartupSubmission) => void;
  isAnalyzing: boolean;
  onOpenHistory?: () => void;
  savedCount?: number;
}

const SAMPLES: StartupSubmission[] = [
  {
    idea_title: 'OmniDoc AI',
    description:
      'An AI-powered automated medical documentation assistant that listens to patient-doctor encounters, transcribes conversations in real-time, extracts EHR structured data, and auto-generates insurance pre-authorization codes.',
    target_market: 'US Outpatient Clinics & Private Practices',
    industry: 'Healthcare AI & HealthTech',
    budget_range: '$50k - $100k',
    stage: 'MVP Spec',
  },
  {
    idea_title: 'GreenChain Logistics',
    description:
      'An autonomous AI supply chain optimizer that predicts carbon tax liability, dynamic shipping route weather disruptions, and automated multi-carrier cost arbitrage for enterprise e-commerce brands.',
    target_market: 'Global Enterprise Freight & E-Commerce',
    industry: 'Supply Chain & ClimateTech',
    budget_range: '$100k - $250k',
    stage: 'Prototype',
  },
  {
    idea_title: 'CodeShield Autonomous QA',
    description:
      'An agentic developer platform that injects synthetic fault vectors into pull requests, auto-generates regression test suites, and verifies SOC2 security compliance prior to merge.',
    target_market: 'Global Developer Teams & B2B SaaS',
    industry: 'Developer Tools & CyberSecurity',
    budget_range: '$25k - $50k',
    stage: 'Idea',
  },
];

export const StartupForm: React.FC<StartupFormProps> = ({
  onSubmit,
  isAnalyzing,
  onOpenHistory,
  savedCount = 0,
}) => {
  const [formData, setFormData] = useState<StartupSubmission>({
    idea_title: '',
    description: '',
    target_market: '',
    industry: '',
    budget_range: '$25k - $50k',
    stage: 'Idea',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea_title || !formData.description) return;
    onSubmit(formData);
  };

  const loadSample = (sample: StartupSubmission) => {
    setFormData(sample);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-amber-400" />
            <span>Submit Startup Idea for MutAgent ADL Validation</span>
          </h2>
          <p className="text-xs text-slate-400">
            Triggers 14 specialist agents in parallel to run market, technical, financial & risk audits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {savedCount > 0 && onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Past Reports ({savedCount})</span>
            </button>
          )}

          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Samples:</span>
            <div className="flex space-x-1.5">
              {SAMPLES.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadSample(s)}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-slate-700/60 transition-colors"
                >
                  {s.idea_title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Startup Name / Working Title *
            </label>
            <input
              type="text"
              required
              value={formData.idea_title}
              onChange={(e) => setFormData({ ...formData, idea_title: e.target.value })}
              placeholder="e.g. Ignite Studio, OmniDoc AI"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Industry Sector *
            </label>
            <input
              type="text"
              required
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="e.g. Healthcare AI, Developer Tools, B2B SaaS"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Core Idea & Value Proposition Description *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the problem, solution, customer pain point, and core technology stack..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Target Market Demographics *
            </label>
            <input
              type="text"
              required
              value={formData.target_market}
              onChange={(e) => setFormData({ ...formData, target_market: e.target.value })}
              placeholder="e.g. US Outpatient Clinics"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Estimated Budget Range
            </label>
            <select
              value={formData.budget_range}
              onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60"
            >
              <option value="$10k - $25k">$10k - $25k (Bootstrap)</option>
              <option value="$25k - $50k">$25k - $50k (Seed)</option>
              <option value="$50k - $100k">$50k - $100k (Venture)</option>
              <option value="$100k - $250k">$100k - $250k (Growth)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Current Venture Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60"
            >
              <option value="Idea">Idea Stage</option>
              <option value="MVP Spec">MVP Spec</option>
              <option value="Prototype">Prototype</option>
              <option value="Early Traction">Early Traction</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>{isAnalyzing ? 'Orchestrating 14 Agents...' : 'Run MutAgent ADL Validation Suite'}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </form>
    </div>
  );
};
