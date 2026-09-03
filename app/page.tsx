'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import PillarsSection from '@/components/PillarsSection';
import MethodologyWidget from '@/components/MethodologyWidget';
import ProjectShowcase from '@/components/ProjectShowcase';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import GitHubShowcase from '@/components/GitHubShowcase';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'analytics' | 'project-management' | 'systems'>('all');

  const handleSelectCategory = (category: 'all' | 'analytics' | 'project-management' | 'systems') => {
    setSelectedCategory(category);
    const projectsEl = document.getElementById('projects-section');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0 bg-[#050505]">
      {/* Hero Header with Interactive Coordinate System */}
      <Hero onSelectCategory={handleSelectCategory} />

      {/* Core 3 Pillars of Competency */}
      <PillarsSection />

      {/* Editorial Interactive Project Showcase */}
      <ProjectShowcase 
        externalFilter={selectedCategory} 
        onFilterChange={setSelectedCategory} 
      />

      {/* Interactive Methodology & Workflow */}
      <MethodologyWidget />

      {/* Live Interactive Executive Analytics Sandbox */}
      <section className="py-20 relative bg-[#050505] border-b border-[#1a1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnalyticsSandbox />
        </div>
      </section>

      {/* Live Interactive Scrum Kanban Simulator */}
      <section className="py-20 relative bg-[#050505] border-b border-[#1a1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrumBoardWidget />
        </div>
      </section>

      {/* GitHub Repository Showcase */}
      <GitHubShowcase />
    </div>
  );
}
