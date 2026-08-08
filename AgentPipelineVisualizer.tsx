import React from 'react';
import { AgentOutput } from '../types/startup';
import { AgentCard } from './AgentCard';
import { Cpu, Network, Zap } from 'lucide-react';

interface AgentPipelineVisualizerProps {
  agents: Record<string, AgentOutput>;
  onSelectAgent: (agent: AgentOutput) => void;
}

export const AgentPipelineVisualizer: React.FC<AgentPipelineVisualizerProps> = ({ agents, onSelectAgent }) => {
  const agentList = Object.values(agents) as AgentOutput[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Network className="w-5 h-5 text-amber-400" />
            <span>Multi-Agent Swarm Orchestration Topology</span>
          </h3>
          <p className="text-xs text-slate-400">
            All 11 specialist agents executed in parallel, audited by MutAgent Evaluator, Diagnosis & Optimizer.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <Zap className="w-4 h-4" />
          <span>Parallel Execution Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agentList.map((agent) => (
          <AgentCard key={agent.agent_name} agent={agent} onSelect={onSelectAgent} />
        ))}
      </div>
    </div>
  );
};
