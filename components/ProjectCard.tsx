'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { 
  ArrowUpRight, 
  BarChart3, 
  Kanban, 
  Workflow, 
  ExternalLink,
  ChevronRight,
  Database,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

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
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden border border-white/15 shadow-xl transition-all duration-300">
      
      {/* Corner Geometric Reticle Accent */}
      <div className="absolute top-2 left-2 text-white/20 text-[9px] font-mono pointer-events-none">+</div>
      <div className="absolute top-2 right-2 text-white/20 text-[9px] font-mono pointer-events-none">+</div>
      <div className="absolute bottom-2 left-2 text-white/20 text-[9px] font-mono pointer-events-none">+</div>
      <div className="absolute bottom-2 right-2 text-white/20 text-[9px] font-mono pointer-events-none">+</div>

      <div>
        {/* Top Category Badge & GitHub/Live Link */}
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
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors flex items-center gap-1.5 text-xs font-semibold font-mono"
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
              className="p-2 rounded-lg bg-black border border-white/15 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
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
        <p className="text-xs font-mono text-neutral-400 mb-4">{project.subtitle}</p>

        {/* Summary */}
        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Tailored Bespoke Project Visualization Block */}
        <div className="mb-6 rounded-xl bg-black p-3.5 border border-white/10 space-y-2.5 overflow-hidden">
          
          {/* 1. Northstar Commerce Power BI Preview */}
          {project.slug === 'northstar-commerce' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400">
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>POWER BI EXECUTIVE MARGIN BREAKDOWN</span>
                </div>
                <span className="text-neutral-500">PostgreSQL Audit Data</span>
              </div>
              
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 font-medium font-mono">Accessories</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold w-10 text-right">44.2%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 font-medium font-mono">Apparel</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: '83%' }}></div>
                    </div>
                    <span className="font-mono text-cyan-400 font-bold w-10 text-right">41.5%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 font-medium font-mono">Electronics</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                    <span className="font-mono text-amber-400 font-bold w-10 text-right">37.4%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-medium font-mono">Unassigned Drag</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-rose-400 h-full rounded-full" style={{ width: '44%' }}></div>
                    </div>
                    <span className="font-mono text-rose-400 font-bold w-10 text-right">22.3%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. NFL Clustering PySpark K-Means Tiers */}
          {project.slug === 'nfl-clustering' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>PYSPARK MLlib K-MEANS TIERS (k=4)</span>
                </div>
                <span className="text-neutral-500">Colab Spark Model</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <span className="font-bold block">TIER 1: ELITE STUDS</span>
                  <span className="text-neutral-400 text-[9px]">Target Share &gt;25% • 18.5 PPG</span>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <span className="font-bold block">TIER 2: STARTERS</span>
                  <span className="text-neutral-400 text-[9px]">High Touch Volume • 13.2 PPG</span>
                </div>
                <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  <span className="font-bold block">TIER 3: FLEX PLAYS</span>
                  <span className="text-neutral-400 text-[9px]">High Efficiency • 9.8 PPG</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <span className="font-bold block">TIER 4: DEPTH</span>
                  <span className="text-neutral-400 text-[9px]">Situational Usage • 5.4 PPG</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. TFT Snowflake Cloud Data Warehouse */}
          {project.slug === 'tft-snowflake' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-400">
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>SNOWFLAKE DATA WAREHOUSE PIPELINE</span>
                </div>
                <span className="text-neutral-500">Star Schema ETL</span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-mono gap-1 text-neutral-300 bg-neutral-900/80 p-2 rounded border border-white/10">
                <span className="px-1.5 py-0.5 rounded bg-black text-cyan-400 border border-white/10">Riot JSON API</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-cyan-400 border border-white/10">Snowflake Staging</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-cyan-400 border border-white/10">Star Schema</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-emerald-400 border border-white/10">Synergy CTEs</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono italic">
                Evaluates champion trait synergies and placement rates across patch shifts.
              </p>
            </div>
          )}

          {/* 4. Woodland Manor Agile Scrum Framework */}
          {project.slug === 'woodland-agile-redesign' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400">
                <div className="flex items-center gap-1.5">
                  <Kanban className="w-3.5 h-3.5" />
                  <span>AGILE SCRUM SPRINT DELIVERY</span>
                </div>
                <span className="text-neutral-500">4 Sprints • 8 Weeks</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <div className="p-1.5 rounded bg-neutral-900 border border-white/10">
                  <span className="text-neutral-400 block">Avg Velocity:</span>
                  <span className="font-bold text-emerald-400">42 Story Pts / Sprint</span>
                </div>
                <div className="p-1.5 rounded bg-neutral-900 border border-white/10">
                  <span className="text-neutral-400 block">P0/P1 Scope Delivered:</span>
                  <span className="font-bold text-emerald-400">100% On-Time</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Product Backlog</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Sprint Burndown</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">User Story Matrix</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">DoD</span>
              </div>
            </div>
          )}

          {/* 5. Interactive Portfolio & Systems Architecture */}
          {project.slug === 'ben-portfolio-app' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-indigo-400">
                <div className="flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5" />
                  <span>NEXT.JS 16 APP ROUTER ARCHITECTURE</span>
                </div>
                <span className="text-neutral-500">100% SSG</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono gap-1 text-neutral-300 bg-neutral-900/80 p-2 rounded border border-white/10">
                <span className="px-1.5 py-0.5 rounded bg-black text-indigo-300 border border-white/10">Next.js 16</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-indigo-300 border border-white/10">Tailwind v4</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-indigo-300 border border-white/10">Recharts</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-black text-cyan-400 border border-white/10">GitHub API</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>⚡ Prerendered Load: &lt; 1.0s</span>
                <span>🛡️ Type-Safe TypeScript</span>
              </div>
            </div>
          )}

        </div>

        {/* Key Metrics Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-2.5 rounded-xl bg-black border border-white/10">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block truncate">
                {metric.label}
              </span>
              <span className="text-sm font-bold font-mono text-white block">
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
              className="px-2.5 py-1 rounded-md bg-black border border-white/15 text-[11px] font-mono font-medium text-neutral-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 rounded-md bg-neutral-900 border border-white/10 text-[11px] font-mono text-neutral-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black bg-white hover:bg-neutral-200 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
        >
          <span>Explore Case Study</span>
          <ChevronRight className="w-4 h-4" />
        </Link>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
