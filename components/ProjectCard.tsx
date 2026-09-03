'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { ArrowRight, ExternalLink } from 'lucide-react';
import NorthstarDashboardWidget from './NorthstarDashboardWidget';
import NflClusterWidget from './NflClusterWidget';
import TftSnowflakeWidget from './TftSnowflakeWidget';
import ScrumBoardWidget from './ScrumBoardWidget';
import AnalyticsSandbox from './AnalyticsSandbox';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);
  const isEven = index % 2 === 0;
  const formattedNumber = String(index + 1).padStart(2, '0');

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanding(true);
    setTimeout(() => {
      router.push(`/projects/${project.slug}`);
    }, 300);
  };

  const renderProjectVisual = () => {
    switch (project.slug) {
      case 'northstar-commerce':
        return <NorthstarDashboardWidget />;
      case 'nfl-clustering':
        return <NflClusterWidget />;
      case 'tft-snowflake':
        return <TftSnowflakeWidget />;
      case 'woodland-agile-redesign':
        return <ScrumBoardWidget />;
      default:
        return <AnalyticsSandbox />;
    }
  };

  return (
    <article
      className={`py-12 border-b border-[#1a1a20] transition-all duration-300 ${
        isExpanding ? 'scale-[1.03] opacity-90 z-40' : ''
      }`}
    >
      {/* Top Thin Horizontal Rule & Index Number */}
      <div className="flex items-center justify-between pb-6 text-xs font-mono text-[#8a8a8a]">
        <span className="text-white font-bold text-sm tracking-widest">{formattedNumber}</span>
        <span className="uppercase tracking-widest text-[#38bdf8]">{project.categoryLabel}</span>
      </div>

      {/* Asymmetric Spatial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Layout A (Text Left, Visual Right) vs Layout B (Visual Left, Text Right) */}
        <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#8a8a8a]">{project.subtitle}</p>
          </div>

          {/* Short Summary */}
          <p className="text-sm text-[#8a8a8a] leading-relaxed">
            {project.summary}
          </p>

          {/* Technologies as Editorial Text Line */}
          <div className="pt-2">
            <div className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider mb-1">TECHNOLOGY STACK</div>
            <div className="text-xs font-mono text-white tracking-wide">
              {project.technologies.join(' · ')}
            </div>
          </div>

          {/* Metrics Grid separated by typography & whitespace */}
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

          {/* Action Button */}
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

        {/* Project Visual Area */}
        <div 
          onClick={handleExplore}
          className={`lg:col-span-7 cursor-pointer group transition-all duration-300 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="p-2 bg-[#08080c] border border-[#1a1a20] group-hover:border-[#38bdf8] transition-colors relative overflow-hidden">
            <div className="text-[10px] font-mono text-[#8a8a8a] p-2 border-b border-[#1a1a20] flex items-center justify-between">
              <span>VISUAL ANALYSIS PREVIEW</span>
              <span className="text-[#38bdf8] group-hover:translate-x-1 transition-transform">ZOOM IN →</span>
            </div>
            <div className="p-2">
              {renderProjectVisual()}
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
