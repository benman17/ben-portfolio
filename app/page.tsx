import React from 'react';
import Hero from '@/components/Hero';
import PillarsSection from '@/components/PillarsSection';
import MethodologyWidget from '@/components/MethodologyWidget';
import ProjectShowcase from '@/components/ProjectShowcase';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import GitHubShowcase from '@/components/GitHubShowcase';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <Hero />

      {/* Core 3 Pillars */}
      <PillarsSection />

      {/* Interactive Methodology & Workflow */}
      <MethodologyWidget />

      {/* Interactive Project Showcase */}
      <ProjectShowcase />

      {/* Live Interactive Analytics Sandbox Widget */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnalyticsSandbox />
        </div>
      </section>

      {/* Live Interactive Scrum Kanban Simulator */}
      <section className="py-16 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrumBoardWidget />
        </div>
      </section>

      {/* GitHub Repository Showcase */}
      <GitHubShowcase />
    </div>
  );
}
