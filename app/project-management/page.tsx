'use client';

import React from 'react';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import { PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectManagementPage() {
  const pmProjects = PROJECTS.filter((p) => p.category === 'project-management');

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left font-mono">
      
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-[#1a1a20] pb-10">
        <div className="text-xs text-[#34d399] font-bold tracking-widest uppercase">
          AGILE & SCRUM LEADERSHIP
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
          Agile Delivery & Scrum Management
        </h1>
        <p className="text-sm sm:text-base text-[#8a8a8a] max-w-3xl leading-relaxed font-sans font-normal pt-1">
          Scrum Master & Systems Analyst experienced in leading cross-functional developer and designer teams (DevHawks). Facilitating Sprint Ceremonies, managing Jira backlogs, and ensuring predictable software delivery.
        </p>
      </div>

      {/* Agile Pillars Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">SPRINT CEREMONIES</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Facilitating Daily Standups, Sprint Planning, Backlog Refinement, and Sprint Retrospectives that keep cross-functional engineering teams focused.
          </p>
        </div>

        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">BACKLOG & USER STORIES</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Crafting INVEST-compliant User Stories with concrete Acceptance Criteria. Estimating story points using Planning Poker to stabilize sprint velocity.
          </p>
        </div>

        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">BLOCKER REMOVAL & SHIELDING</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Proactively identifying technical dependencies, shielding engineering teams from scope creep, and maintaining transparent stakeholder alignment.
          </p>
        </div>
      </div>

      {/* Interactive Scrum Board */}
      <div className="space-y-4 pt-4 border-t border-[#1a1a20]">
        <div className="text-xs font-bold text-[#34d399] tracking-wider uppercase">SPRINT KANBAN SIMULATOR</div>
        <ScrumBoardWidget />
      </div>

      {/* Featured Scrum Projects */}
      <div className="space-y-8 pt-6 border-t border-[#1a1a20]">
        <div className="text-xs font-bold text-white tracking-wider uppercase">SCRUM CASE STUDIES</div>
        <div className="space-y-12">
          {pmProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
}
