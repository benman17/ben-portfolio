import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { 
  ArrowLeft, 
  ExternalLink, 
  BarChart3, 
  Kanban, 
  CheckCircle2, 
  Code, 
  TrendingUp, 
  Clock, 
  Layers
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import NflClusterWidget from '@/components/NflClusterWidget';
import NorthstarDashboardWidget from '@/components/NorthstarDashboardWidget';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL PROJECTS</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-semibold">
            {project.categoryLabel}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">ROLE: {project.role}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">TIMELINE: {project.timeline}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 font-semibold text-xs transition-all shadow-md"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>VIEW SOURCE CODE ON GITHUB ↗</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>VIEW LIVE PROJECT DEMO ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              {m.label}
            </span>
            <span className="text-2xl font-extrabold font-mono text-cyan-400 block">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Feature Widget preview */}
      {project.slug === 'northstar-commerce' ? (
        <NorthstarDashboardWidget />
      ) : project.slug === 'nfl-clustering' ? (
        <NflClusterWidget />
      ) : project.category === 'analytics' ? (
        <AnalyticsSandbox />
      ) : project.category === 'project-management' ? (
        <ScrumBoardWidget />
      ) : null}

      {/* Deep-Dive Problem & Approach Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        
        {/* Main Case Study Column */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Section: Problem */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <span>01</span>
              <span>THE BUSINESS PROBLEM</span>
            </div>
            <h3 className="text-xl font-bold text-white">What needed to be solved?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Section: Methodology & Approach */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <span>02</span>
              <span>MY TECHNICAL & AGILE APPROACH</span>
            </div>
            <h3 className="text-xl font-bold text-white">Execution & Implementation Steps</h3>
            <ul className="space-y-3">
              {project.dataApproach.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SQL Snippet Code Block if available */}
          {project.sqlSnippet && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>PYTHON MACHINE LEARNING CODE SNIPPET</span>
                </div>
                <span className="text-slate-500">Python / Scikit-Learn</span>
              </div>
              <pre className="font-mono text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
                {project.sqlSnippet}
              </pre>
            </div>
          )}

          {/* Section: Measurable Results */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <span>03</span>
              <span>MEASURABLE BUSINESS IMPACT</span>
            </div>
            <h3 className="text-xl font-bold text-white">Results & Outcomes</h3>
            <ul className="space-y-2.5">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          
          {/* Tech Stack Matrix */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              TECHNOLOGIES USED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Scrum Details Card if available */}
          {project.scrumDetails && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Kanban className="w-4 h-4" />
                <span>SCRUM METRICS</span>
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Sprint Duration:</span>
                  <span className="text-slate-200 font-semibold">{project.scrumDetails.sprintDuration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Team Composition:</span>
                  <span className="text-slate-200 font-semibold">{project.scrumDetails.teamSize}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Average Velocity:</span>
                  <span className="text-slate-200 font-semibold">{project.scrumDetails.velocity}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
