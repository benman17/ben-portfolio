'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Search } from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'analytics' | 'project-management' | 'systems'>('all');

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left font-mono">
      
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-[#1a1a20] pb-10">
        <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
          COMPLETE PORTFOLIO INDEX
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#ffffff] tracking-tight font-sans">
          All Interactive Case Studies
        </h1>
        <p className="text-sm sm:text-base text-[#8a8a8a] max-w-3xl leading-relaxed font-sans font-normal pt-1">
          Browse complete interactive project case studies spanning Data Analytics Pipelines, SQL/Python ETL, Agile/Scrum project delivery, and Business Systems Architecture.
        </p>
      </div>

      {/* Minimalist Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#08080c] border border-[#1a1a20]">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8a8a8a] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="SEARCH TOOLS, SQL, PYTHON..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black border border-[#1a1a20] text-xs text-white placeholder-[#8a8a8a] focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto text-xs">
          {[
            { id: 'all', label: 'ALL PROJECTS' },
            { id: 'analytics', label: 'DATA & ANALYTICS' },
            { id: 'project-management', label: 'SCRUM / PM' },
            { id: 'systems', label: 'BUSINESS SYSTEMS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-3 py-1.5 transition-all border ${
                selectedCategory === tab.id
                  ? 'border-white text-white bg-white/10 font-bold'
                  : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Projects Single Column Editorial Layout */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center bg-[#08080c] border border-[#1a1a20]">
          <p className="text-[#8a8a8a] text-xs">NO PROJECTS MATCHING YOUR SEARCH CRITERIA.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      )}

    </div>
  );
}
