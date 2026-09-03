'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import ProjectCard from './ProjectCard';

interface ProjectShowcaseProps {
  externalFilter?: 'all' | 'analytics' | 'project-management' | 'systems';
  onFilterChange?: (filter: 'all' | 'analytics' | 'project-management' | 'systems') => void;
}

export default function ProjectShowcase({ externalFilter, onFilterChange }: ProjectShowcaseProps) {
  const [internalFilter, setInternalFilter] = useState<'all' | 'analytics' | 'project-management' | 'systems'>('all');

  const activeFilter = externalFilter !== undefined ? externalFilter : internalFilter;

  const handleFilterSelect = (filter: 'all' | 'analytics' | 'project-management' | 'systems') => {
    setInternalFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'ALL CASE STUDIES', count: PROJECTS.length },
    { id: 'analytics', label: 'DATA & ANALYTICS', count: PROJECTS.filter(p => p.category === 'analytics').length },
    { id: 'project-management', label: 'SCRUM / PM', count: PROJECTS.filter(p => p.category === 'project-management').length },
    { id: 'systems', label: 'BUSINESS SYSTEMS', count: PROJECTS.filter(p => p.category === 'systems').length },
  ];

  return (
    <section className="py-20 relative bg-[#050505]" id="projects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1a1a20] pb-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">
              02 / SELECTED WORK
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-[#8a8a8a] text-sm sm:text-base leading-relaxed font-normal">
              In-depth systems, data models, and project delivery frameworks demonstrating end-to-end analytical problem solving.
            </p>
          </div>

          {/* Minimalist Filter Bar */}
          <div className="flex flex-wrap gap-2 text-xs font-mono self-start md:self-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleFilterSelect(opt.id as any)}
                className={`px-3 py-1.5 transition-all border ${
                  activeFilter === opt.id
                    ? 'border-white text-white bg-white/10 font-bold'
                    : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                <span className="ml-2 text-[10px] opacity-70">({opt.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Single-Column Alternating Project Layout */}
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
