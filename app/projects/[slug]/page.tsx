import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Code, 
  Kanban
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import NflClusterWidget from '@/components/NflClusterWidget';
import NorthstarDashboardWidget from '@/components/NorthstarDashboardWidget';
import TftSnowflakeWidget from '@/components/TftSnowflakeWidget';

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
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-mono text-left">
      
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#8a8a8a] hover:text-white transition-colors tracking-wider uppercase"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all projects</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-5 border-b border-[#1a1a20] pb-10">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-[#38bdf8] font-bold font-mono tracking-widest uppercase">
            {project.categoryLabel}
          </span>
          <span className="text-[#1a1a20]">|</span>
          <span className="text-[#8a8a8a] font-mono">ROLE: {project.role}</span>
          <span className="text-[#1a1a20]">|</span>
          <span className="text-[#8a8a8a] font-mono">TIMELINE: {project.timeline}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          {project.title}
        </h1>

        <p className="text-base text-neutral-300 leading-relaxed max-w-3xl font-sans">
          {project.summary}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-[#2a2a35] text-white hover:border-white font-bold text-xs transition-all tracking-wider"
            >
              <GithubIcon className="w-4 h-4" />
              <span>VIEW SOURCE ↗</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all tracking-wider"
            >
              <ExternalLink className="w-4 h-4" />
              <span>VIEW LIVE ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1a1a20]">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-[#08080c] p-6 space-y-1">
            <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest block">
              {m.label}
            </span>
            <span className="text-2xl font-extrabold font-mono text-white block">
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
      ) : project.slug === 'tft-snowflake' ? (
        <TftSnowflakeWidget />
      ) : project.category === 'project-management' ? (
        <ScrumBoardWidget />
      ) : (
        <AnalyticsSandbox />
      )}

      {/* Deep-Dive Problem & Approach Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        {/* Main Case Study Column */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Section: Problem */}
          <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
              <span>The Business Problem</span>
            </div>
            <h3 className="text-xl font-bold text-white font-sans">What needed to be solved?</h3>
            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {project.problem}
            </p>
          </div>

          {/* Section: Methodology & Approach */}
          <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#34d399] font-bold tracking-widest uppercase">
              <span>Technical &amp; Agile Approach</span>
            </div>
            <h3 className="text-xl font-bold text-white font-sans">Execution & Implementation Steps</h3>
            <ul className="space-y-3">
              {project.dataApproach.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-sans">
                  <span className="text-[#38bdf8] font-mono font-bold text-[10px] mt-0.5 shrink-0 w-5 text-right">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SQL Snippet Code Block if available */}
          {project.sqlSnippet && (
            <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span className="tracking-widest uppercase">Code Snippet</span>
                </div>
                <span className="text-[#8a8a8a]">Python / Scikit-Learn</span>
              </div>
              <pre className="font-mono text-xs text-neutral-200 bg-black p-4 border border-[#1a1a20] overflow-x-auto whitespace-pre leading-relaxed">
                {project.sqlSnippet}
              </pre>
            </div>
          )}

          {/* Section: Measurable Results */}
          <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[#34d399] font-bold tracking-widest uppercase">
              <span>Measurable Business Impact</span>
            </div>
            <h3 className="text-xl font-bold text-white font-sans">Results & Outcomes</h3>
            <ul className="space-y-2.5">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          
          {/* Tech Stack Matrix */}
          <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-black border border-[#1a1a20] text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Scrum Details Card if available */}
          {project.scrumDetails && (
            <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-4">
              <h4 className="font-mono text-xs font-bold text-[#34d399] uppercase tracking-widest flex items-center gap-2">
                <Kanban className="w-4 h-4" />
                <span>Scrum Metrics</span>
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8a8a8a] block">Sprint Duration:</span>
                  <span className="text-white font-semibold">{project.scrumDetails.sprintDuration}</span>
                </div>
                <div>
                  <span className="text-[#8a8a8a] block">Team Composition:</span>
                  <span className="text-white font-semibold">{project.scrumDetails.teamSize}</span>
                </div>
                <div>
                  <span className="text-[#8a8a8a] block">Average Velocity:</span>
                  <span className="text-white font-semibold">{project.scrumDetails.velocity}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
