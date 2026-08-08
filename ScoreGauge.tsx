import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  sublabel?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, size = 'md', sublabel }) => {
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDasharray = 283; // 2 * pi * 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * normalizedScore) / 100;

  const getColor = (s: number) => {
    if (s >= 80) return '#10b981'; // emerald
    if (s >= 70) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  const color = getColor(normalizedScore);

  const dimensionClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className={`relative ${dimensionClasses} flex items-center justify-center`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-extrabold font-mono text-2xl text-white tracking-tight">
            {normalizedScore.toFixed(0)}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">/ 100</span>
        </div>
      </div>
      <h4 className="mt-3 text-xs font-bold text-slate-200 text-center uppercase tracking-wider">{label}</h4>
      {sublabel && <p className="text-[10px] text-slate-400 mt-0.5">{sublabel}</p>}
    </div>
  );
};
