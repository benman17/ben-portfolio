'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { Filter, Layers } from 'lucide-react';

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'analytics' | 'project-management' | 'systems'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'analytics', label: 'Data & Analytics', count: PROJECTS.filter(p => p.category === 'analytics').length },
    { id: 'project-management', label: 'Project Management & Scrum', count: PROJECTS.filter(p => p.category === 'project-management').length },
    { id: 'systems', label: 'Business Systems', count: PROJECTS.filter(p => p.category === 'systems').length },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              INTERACTIVE CASE STUDIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Project Showcase
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore in-depth case studies detailing the business problem, SQL/Python data pipeline, Scrum delivery framework, and measurable ROI.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md self-start md:self-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  activeFilter === opt.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  activeFilter === opt.id ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  {opt.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
