'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { 
  ArrowUpRight, 
  BarChart3, 
  Kanban, 
  Workflow, 
  TrendingUp, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryIcon = {
    analytics: BarChart3,
    'project-management': Kanban,
    systems: Workflow
  }[project.category];

  const CategoryIcon = categoryIcon || BarChart3;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden border border-slate-800/80">
      {/* Top Category Badge & GitHub Link */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
              project.category === 'analytics'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : project.category === 'project-management'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
            }`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{project.categoryLabel}</span>
            </span>
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Visit Live Site"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="View Source on GitHub"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
            </a>
          ) : null}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-slate-400 mb-4">{project.subtitle}</p>

        {/* Summary */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Mini Chart Preview Widget if available */}
        {project.chartData && (
          <div className="h-24 w-full bg-slate-950/60 rounded-xl p-2 border border-slate-800/60 mb-6 relative overflow-hidden">
            <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-400 z-10 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              <span>LIVE METRICS PREVIEW</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={project.chartData}>
                <defs>
                  <linearGradient id={`grad-${project.slug}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={project.category === 'analytics' ? '#38bdf8' : '#34d399'} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={project.category === 'analytics' ? '#38bdf8' : '#34d399'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value1" 
                  stroke={project.category === 'analytics' ? '#38bdf8' : '#34d399'} 
                  strokeWidth={2}
                  fill={`url(#grad-${project.slug})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Key Metrics Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-400 uppercase block truncate">
                {metric.label}
              </span>
              <span className="text-sm font-bold font-mono text-slate-100 block">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 rounded-md bg-slate-900 text-[11px] font-mono text-slate-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-xl transition-all shadow-md"
        >
          <span>Explore Case Study</span>
          <ChevronRight className="w-4 h-4" />
        </Link>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
