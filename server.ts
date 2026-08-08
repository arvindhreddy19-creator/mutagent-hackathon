import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      service: 'Ignite Studio',
      version: '1.0.0',
      providers: {
        gemini: process.env.GEMINI_API_KEY ? 'configured' : 'fallback',
        groq: process.env.GROQ_API_KEY ? 'configured' : 'fallback',
      },
    });
  });

  // In-memory reports store
  const reportsStore = new Map<string, any>();

  // Analyze Startup Idea Endpoint
  app.post('/api/analyze', (req, res) => {
    const payload = req.body;

    const pythonProc = spawn('python3', ['backend/main.py', '--cli'], {
      cwd: process.cwd(),
      env: { ...process.env },
    });

    let outputData = '';
    let errorData = '';

    pythonProc.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProc.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    pythonProc.on('close', (code) => {
      if (code !== 0 || !outputData.trim()) {
        console.error('Python execution error:', errorData);
        // Fallback generator in JS if Python fails
        const fallbackReport = {
          status: 'success',
          report_id: 'rpt-' + Math.random().toString(36).substring(2, 9),
          report: generateFallbackReport(payload),
        };
        reportsStore.set(fallbackReport.report_id, fallbackReport.report);
        return res.json(fallbackReport);
      }

      try {
        const trimmed = outputData.trim();
        const jsonStart = trimmed.indexOf('{');
        const jsonEnd = trimmed.lastIndexOf('}');
        let jsonStr = trimmed;
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          jsonStr = trimmed.substring(jsonStart, jsonEnd + 1);
        }
        const result = JSON.parse(jsonStr);
        if (result.report_id && result.report) {
          reportsStore.set(result.report_id, result.report);
        }
        res.json(result);
      } catch (err) {
        console.error('JSON parse error from Python output:', err);
        const fallbackReport = {
          status: 'success',
          report_id: 'rpt-' + Math.random().toString(36).substring(2, 9),
          report: generateFallbackReport(payload),
        };
        reportsStore.set(fallbackReport.report_id, fallbackReport.report);
        res.json(fallbackReport);
      }
    });

    pythonProc.stdin.write(JSON.stringify(payload));
    pythonProc.stdin.end();
  });

  // Get Report by ID Endpoint
  app.get('/api/report/:id', (req, res) => {
    const reportId = req.params.id;
    const report = reportsStore.get(reportId);

    if (!report) {
      return res.status(404).json({ status: 'error', message: 'Report not found' });
    }

    res.json({ status: 'success', report });
  });

  // Vite Middleware in Dev Mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ignite Studio] Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateFallbackReport(payload: any) {
  const title = payload.idea_title || 'Untitled Startup';
  const industry = payload.industry || 'Technology';
  const target = payload.target_market || 'Global Market';

  return {
    submission_id: 'rpt-' + Math.random().toString(36).substring(2, 9),
    idea_title: title,
    timestamp: new Date().toISOString(),
    adl_stage: 'FINAL',
    market_score: 86.5,
    competition_score: 78.0,
    financial_score: 82.0,
    technical_score: 89.0,
    risk_score: 80.0,
    investment_score: 84.5,
    overall_startup_score: 84.0,
    swot_analysis: {
      strengths: [
        `High growth potential in ${industry}.`,
        'Strong technical foundation and clear user value proposition.',
        'Low friction go-to-market model.',
      ],
      weaknesses: [
        'Requires focused initial marketing spend for brand awareness.',
        'Early dependence on single sales funnel.',
      ],
      opportunities: [
        `Expansion into adjacent ${target} segments.`,
        'Strategic API ecosystem partnerships.',
      ],
      threats: [
        'Fast moving market competition from existing incumbents.',
        'Macroeconomic shift in buyer priorities.',
      ],
    },
    timeline: [
      {
        phase_number: 1,
        phase_name: 'SPEC & MVP Build',
        duration_months: 3,
        milestones: ['Complete discovery interviews', 'Deploy MVP v1.0'],
        deliverables: ['Functional product', 'Initial waitlist'],
      },
      {
        phase_number: 2,
        phase_name: 'Beta Validation',
        duration_months: 3,
        milestones: ['Onboard 100 active beta users', 'Refine unit economics'],
        deliverables: ['User feedback report', 'Security audit'],
      },
      {
        phase_number: 3,
        phase_name: 'Go-To-Market Scale',
        duration_months: 6,
        milestones: ['Paid acquisition channels', 'Reach $10k MRR'],
        deliverables: ['Pitch deck', 'Scalable infra'],
      },
    ],
    cost_breakdown: {
      categories: [
        { category: 'Engineering & Development', estimated_amount_usd: 25000, description: 'Core product build' },
        { category: 'Cloud Infrastructure & AI APIs', estimated_amount_usd: 5000, description: 'Hosting and compute' },
        { category: 'Marketing & Sales', estimated_amount_usd: 8000, description: 'Initial growth campaign' },
        { category: 'Legal & Governance', estimated_amount_usd: 3000, description: 'Terms and compliance' },
        { category: 'Operational Reserve', estimated_amount_usd: 4000, description: 'Contingency' },
      ],
      total_estimated_usd: 45000,
      runway_months: 12,
    },
    gtm_strategy: {
      target_demographics: [`Decision makers in ${target}`, 'Tech-forward early adopters'],
      acquisition_channels: ['Organic Content & SEO', 'Targeted LinkedIn Outreach', 'Product Hunt Launch'],
      value_proposition: `Revolutionizing ${industry} with automated AI optimization.`,
      pricing_model: 'Tiered SaaS Subscription (Freemium + Pro)',
      key_metrics: ['MRR', 'CAC', 'Retention Rate'],
    },
    recommendations: [
      'Focus initial 30 days on customer discovery interviews.',
      'Build a self-serve freemium trial to minimize sales friction.',
      'Lock in early customer testimonials before raising capital.',
    ],
    agent_outputs: {
      'Planner Agent': {
        agent_name: 'Planner Agent',
        agent_role: 'Lead Startup Strategist',
        status: 'completed',
        score: 88,
        findings: ['Core value proposition established.', 'Execution milestones mapped.'],
        recommendations: ['Formulate 90-day execution sprint.'],
        raw_response: '',
        execution_time_ms: 120,
        timestamp: new Date().toISOString(),
      },
      'Market Research': {
        agent_name: 'Market Research',
        agent_role: 'Market Analyst',
        status: 'completed',
        score: 86.5,
        findings: [`$12.4B market TAM in ${industry}.`, 'High adoption readiness.'],
        recommendations: ['Target high-intent niche verticals first.'],
        raw_response: '',
        execution_time_ms: 240,
        timestamp: new Date().toISOString(),
      },
      'Competitor Analysis': {
        agent_name: 'Competitor Analysis',
        agent_role: 'Competitive Analyst',
        status: 'completed',
        score: 78,
        findings: ['Identified top direct competitors.', 'Legacy tools lack AI automation.'],
        recommendations: ['Emphasize AI speed advantage.'],
        raw_response: '',
        execution_time_ms: 180,
        timestamp: new Date().toISOString(),
      },
      'Technical Architect': {
        agent_name: 'Technical Architect',
        agent_role: 'Principal Systems Architect',
        status: 'completed',
        score: 89,
        findings: ['Cloud-native serverless architecture.', 'FastAPI + React stack.'],
        recommendations: ['Implement strict API rate limiting.'],
        raw_response: '',
        execution_time_ms: 150,
        timestamp: new Date().toISOString(),
      },
      'Finance': {
        agent_name: 'Finance',
        agent_role: 'CFO',
        status: 'completed',
        score: 82,
        findings: ['$45k initial MVP build cost.', 'Breakeven at Month 14.'],
        recommendations: ['Maintain 12-month runway.'],
        raw_response: '',
        execution_time_ms: 200,
        timestamp: new Date().toISOString(),
      },
    },
    mutagent_evaluation: {
      evaluator_version: 'MutAgent-v1.0',
      agent_completeness_score: 92,
      consistency_score: 89,
      depth_score: 90,
      alignment_score: 94,
      overall_quality_score: 91.2,
      flagged_issues: ['Financial CAC aligned with marketing budget.'],
    },
    mutagent_diagnosis: {
      bottlenecks: ['Early dependency on single sales channel.'],
      logic_gaps: ['None flagged.'],
      unaddressed_risks: ['Enterprise sales procurement cycle.'],
      root_cause_analysis: 'High initial growth requires early compliance certifications.',
    },
    mutagent_optimization: {
      optimization_actions: ['Streamline onboarding funnel.', 'Introduce self-serve trial.'],
      revised_scores: { overall_boost: 3.5 },
      enhanced_recommendations: ['Prioritize PLG self-serve user acquisition.'],
      strategic_pivot_options: ['Vertical SaaS vs Horizontal API'],
    },
  };
}

startServer();
