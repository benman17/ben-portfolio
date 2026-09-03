'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { 
  ArrowRight, 
  ExternalLink, 
  BarChart3, 
  Cpu, 
  Database, 
  Kanban, 
  Workflow, 
  Maximize2 
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);
  const isEven = index % 2 === 0;
  const formattedNumber = String((index || 0) + 1).padStart(2, '0');

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
      className={`py-12 border-b border-[#1a1a20] transition-all duration-300 ${
        isExpanding ? 'scale-[1.02] opacity-90' : ''
      }`}
    >
      {/* Top Header Index Number & Category */}
      <div className="flex items-center justify-between pb-6 text-xs font-mono text-[#8a8a8a]">
        <span className="text-white font-bold text-sm tracking-widest">{formattedNumber}</span>
        <span className="uppercase tracking-widest text-[#38bdf8]">{project.categoryLabel}</span>
      </div>

      {/* Asymmetric Spatial Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Content Column */}
        <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#8a8a8a]">{project.subtitle}</p>
          </div>

          {/* Short Summary */}
          <p className="text-sm text-[#8a8a8a] leading-relaxed font-sans font-normal">
            {project.summary}
          </p>

          {/* Technologies Line */}
          <div className="pt-1">
            <div className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider mb-1">TECHNOLOGY STACK</div>
            <div className="text-xs font-mono text-white tracking-wide">
              {project.technologies.join(' · ')}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1a1a20]">
            {project.metrics.map((m) => (
              <div key={m.label} className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block truncate">
                  {m.label}
                </span>
                <span className="text-sm font-bold font-mono text-white block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center gap-6 text-xs font-mono">
            <button
              onClick={handleExplore}
              className="px-5 py-2.5 text-black bg-white font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <span>EXPLORE CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#34d399] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>LIVE SITE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a8a] hover:text-white transition-colors"
              >
                GITHUB REPO ↗
              </a>
            ) : null}
          </div>

        </div>

        {/* Visual Preview Column */}
        <div 
          onClick={handleExplore}
          className={`lg:col-span-7 cursor-pointer group transition-all duration-300 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="p-2 bg-[#08080c] border border-[#1a1a20] group-hover:border-[#38bdf8] transition-colors relative">
            <div className="text-[10px] font-mono text-[#8a8a8a] p-2 border-b border-[#1a1a20] flex items-center justify-between mb-2">
              <span>VISUAL ANALYSIS PREVIEW</span>
              <span className="text-[#38bdf8] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>ZOOM IN</span>
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
            {renderCleanVisualPreview()}
          </div>
        </div>

      </div>
    </article>
  );
}
