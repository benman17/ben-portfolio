'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PROJECTS, Project } from '@/data/projects';
import { 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  Kanban, 
  Workflow, 
  Maximize2 
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);

  // Derive stable sequential number (01, 02, 03, 04, 05) based on project position in PROJECTS
  const projectIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const sequentialNum = index !== undefined ? index + 1 : (projectIndex >= 0 ? projectIndex + 1 : 1);
  const formattedNumber = String(sequentialNum).padStart(2, '0');

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);
    setTimeout(() => {
      router.push(`/projects/${project.slug}`);
    }, 250);
  };

  const renderCleanVisualPreview = () => {
    switch (project.slug) {
      case 'northstar-commerce':
        return (
          <div className="relative w-full aspect-[16/10] bg-[#050508] border border-[#1a1a25] overflow-hidden group/img">
            <Image
              src="/images/projects/northstar_commerce/executive_overview.png"
              alt="Northstar Commerce Executive BI Dashboard Overview"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold bg-black/80 px-2 py-1 border border-white/20">
                POWER BI EXECUTIVE COMMAND CENTER
              </span>
              <span className="text-[#38bdf8] bg-black/80 px-2 py-1 border border-[#38bdf8]/40 font-bold">
                $5.94M NET REVENUE
              </span>
            </div>
          </div>
        );

      case 'nfl-clustering':
        return (
          <div className="relative w-full aspect-[16/10] bg-[#050508] border border-[#1a1a25] p-5 flex flex-col justify-between overflow-hidden font-mono group/img">
            <div className="flex items-center justify-between border-b border-[#1a1a20] pb-2 text-[10px] text-[#8a8a8a]">
              <span className="text-[#38bdf8] font-bold flex items-center gap-1">
                <Cpu className="w-3 h-3" /> PYSPARK MLlib K-MEANS TIERS (k=4)
              </span>
              <span>COLAB SPARK MODEL</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] my-auto">
              <div className="p-2.5 bg-black border border-cyan-500/30 text-cyan-300">
                <div className="font-bold">TIER 1: ELITE STUDS</div>
                <div className="text-[9px] text-[#8a8a8a] mt-0.5">Target Share &gt;25% • 18.5 PPG</div>
              </div>
              <div className="p-2.5 bg-black border border-emerald-500/30 text-emerald-300">
                <div className="font-bold">TIER 2: STARTERS</div>
                <div className="text-[9px] text-[#8a8a8a] mt-0.5">High Touch Volume • 13.2 PPG</div>
              </div>
              <div className="p-2.5 bg-black border border-indigo-500/30 text-indigo-300">
                <div className="font-bold">TIER 3: FLEX PLAYS</div>
                <div className="text-[9px] text-[#8a8a8a] mt-0.5">High Efficiency • 9.8 PPG</div>
              </div>
              <div className="p-2.5 bg-black border border-[#1a1a20] text-[#8a8a8a]">
                <div className="font-bold text-white">TIER 4: DEPTH</div>
                <div className="text-[9px] text-[#8a8a8a] mt-0.5">Situational Role • 5.4 PPG</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8a8a8a] border-t border-[#1a1a20] pt-2">
              <span>SILHOUETTE SCORE: <strong className="text-emerald-400">0.72</strong></span>
              <span className="text-[#38bdf8] font-bold">INSPECT CLUSTERS →</span>
            </div>
          </div>
        );

      case 'tft-snowflake':
        return (
          <div className="relative w-full aspect-[16/10] bg-[#050508] border border-[#1a1a25] overflow-hidden group/img">
            <Image
              src="/images/projects/northstar_commerce/data_model_star_schema.png"
              alt="Snowflake Star Schema Relational Data Model"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold bg-black/80 px-2 py-1 border border-white/20">
                SNOWFLAKE STAR SCHEMA MODEL
              </span>
              <span className="text-[#34d399] bg-black/80 px-2 py-1 border border-[#34d399]/40 font-bold">
                META WIN-RATE CTEs
              </span>
            </div>
          </div>
        );

      case 'woodland-agile-redesign':
        return (
          <div className="relative w-full aspect-[16/10] bg-[#050508] border border-[#1a1a25] p-5 flex flex-col justify-between font-mono group/img">
            <div className="flex items-center justify-between border-b border-[#1a1a20] pb-2 text-[10px] text-[#8a8a8a]">
              <span className="text-[#34d399] font-bold flex items-center gap-1">
                <Kanban className="w-3 h-3" /> AGILE SCRUM SPRINT DELIVERY
              </span>
              <span>4 SPRINTS · 8 WEEKS</span>
            </div>

            <div className="space-y-2 my-auto">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-black border border-[#1a1a20]">
                  <div className="text-[10px] text-[#8a8a8a]">AVG VELOCITY</div>
                  <div className="font-bold text-white">42 Pts</div>
                </div>
                <div className="p-2 bg-black border border-[#1a1a20]">
                  <div className="text-[10px] text-[#8a8a8a]">ON-TIME</div>
                  <div className="font-bold text-[#34d399]">96%</div>
                </div>
                <div className="p-2 bg-black border border-[#1a1a20]">
                  <div className="text-[10px] text-[#8a8a8a]">FEEDBACK</div>
                  <div className="font-bold text-[#38bdf8]">-40%</div>
                </div>
              </div>

              <div className="p-2 bg-black border border-[#1a1a20] text-[10px] text-[#8a8a8a] flex items-center justify-between">
                <span>ARTIFACTS: <strong className="text-white">Backlog · Burndown · DoD</strong></span>
                <span className="text-[#34d399] font-bold">LIVE WEBSITE →</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8a8a8a] border-t border-[#1a1a20] pt-2">
              <span>TEAM: <strong className="text-white">DevHawks (6 Members)</strong></span>
              <span className="text-[#34d399] font-bold">EXPLORE FRAMEWORK →</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full aspect-[16/10] bg-[#050508] border border-[#1a1a25] p-5 flex flex-col justify-between font-mono group/img">
            <div className="flex items-center justify-between border-b border-[#1a1a20] pb-2 text-[10px] text-[#8a8a8a]">
              <span className="text-[#818cf8] font-bold flex items-center gap-1">
                <Workflow className="w-3 h-3" /> NEXT.JS 16 SYSTEM ARCHITECTURE
              </span>
              <span>100% SSG</span>
            </div>

            <div className="space-y-2 my-auto text-xs">
              <div className="p-3 bg-black border border-[#1a1a20] flex items-center justify-between">
                <span className="text-white font-bold">Next.js 16 App Router</span>
                <span className="text-[#8a8a8a] text-[10px]">React 19 & Tailwind v4</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8a8a8a]">
                <div className="p-2 bg-black border border-[#1a1a20]">
                  <span>PAGE LOAD SPEED</span>
                  <div className="font-bold text-[#38bdf8] text-xs">&lt; 1.0s SSG</div>
                </div>
                <div className="p-2 bg-black border border-[#1a1a20]">
                  <span>STATIC ROUTES</span>
                  <div className="font-bold text-white text-xs">15 SSG Pages</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8a8a8a] border-t border-[#1a1a20] pt-2">
              <span>API: <strong className="text-white">GitHub REST API</strong></span>
              <span className="text-[#818cf8] font-bold">INSPECT ARCHITECTURE →</span>
            </div>
          </div>
        );
    }
  };

  return (
    <article
      className={`py-12 border-b border-[#1a1a20] transition-all duration-300 space-y-8 text-left font-mono ${
        isExpanding ? 'scale-[1.02] opacity-90' : ''
      }`}
    >
      {/* SECTION 1: TOP FULL-WIDTH HEADER (Index Number, Category & Project Title) */}
      <div className="space-y-3 w-full">
        <div className="flex items-center justify-between text-xs text-[#8a8a8a]">
          <span className="text-white font-extrabold text-base tracking-widest">{formattedNumber}</span>
          <span className="uppercase tracking-widest text-[#38bdf8] font-bold">{project.categoryLabel}</span>
        </div>

        {/* FULL-WIDTH HORIZONTAL TITLE & SUBTITLE */}
        <div className="space-y-1 pt-1 w-full">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-[#8a8a8a]">{project.subtitle}</p>
        </div>
      </div>

      {/* SECTION 2: MIDDLE 2-COLUMN GRID (Summary & Tech Stack on Left / Visual Preview on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
        
        {/* Left Column: Short Summary & Technology Stack */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-sm text-[#8a8a8a] leading-relaxed font-sans font-normal">
            {project.summary}
          </p>

          <div className="pt-2 border-t border-[#1a1a20]/60">
            <div className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider mb-1.5">TECHNOLOGY STACK</div>
            <div className="text-xs font-mono text-white tracking-wide leading-relaxed">
              {project.technologies.join(' · ')}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Preview Graphic */}
        <div 
          onClick={handleExplore}
          className="lg:col-span-7 cursor-pointer group transition-all duration-300"
        >
          <div className="p-2 bg-[#08080c] border border-[#1a1a20] group-hover:border-[#38bdf8] transition-colors relative">
            <div className="text-[10px] font-mono text-[#8a8a8a] p-2 border-b border-[#1a1a20] flex items-center justify-between mb-2">
              <span>VISUAL ANALYSIS PREVIEW</span>
              <span className="text-[#38bdf8] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                <span>ZOOM IN</span>
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
            {renderCleanVisualPreview()}
          </div>
        </div>

      </div>

      {/* SECTION 3: BOTTOM FULL-WIDTH HORIZONTAL METRICS & ACTIONS BAR */}
      <div className="w-full pt-6 border-t border-[#1a1a20] space-y-6">
        
        {/* Horizontal Metrics Grid across full width */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {project.metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                {m.label}
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-white block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Full-Width Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1a1a20]/60 w-full text-xs font-mono">
          <button
            onClick={handleExplore}
            className="px-6 py-3 text-black bg-white font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
          >
            <span>EXPLORE CASE STUDY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-6">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#34d399] hover:underline flex items-center gap-1 font-bold"
              >
                <span>LIVE WEBSITE ↗</span>
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a8a] hover:text-white transition-colors font-bold"
              >
                GITHUB REPOSITORY ↗
              </a>
            ) : null}
          </div>
        </div>

      </div>

    </article>
  );
}
