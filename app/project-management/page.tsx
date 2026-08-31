import React from 'react';
import ScrumBoardWidget from '@/components/ScrumBoardWidget';
import { PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Kanban, Users, CheckCircle2, ShieldCheck, Zap, RefreshCw, FileText } from 'lucide-react';

export default function ProjectManagementPage() {
  const pmProjects = PROJECTS.filter((p) => p.category === 'project-management');

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <Kanban className="w-3.5 h-3.5" />
          <span>AGILE & SCRUM MASTER LEADERSHIP</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Agile Delivery & Scrum Project Management
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Scrum Master & Systems Analyst experienced in leading cross-functional developer and designer teams (DevHawks). Facilitating Sprint Ceremonies, managing Jira backlogs, and ensuring predictable software delivery.
        </p>
      </div>

      {/* Agile Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Sprint Facilitation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Leading high-energy Daily Standups, Sprint Planning, Backlog Refinement, and Retrospectives that keep engineering teams focused and morale high.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Backlog & User Stories</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Crafting INVEST-compliant User Stories with strict Acceptance Criteria. Estimating story points using Planning Poker to stabilize team velocity.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Blocker Removal & Shielding</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Proactively identifying technical dependencies, shielding developers from scope creep, and maintaining smooth cross-department stakeholder alignment.
          </p>
        </div>
      </div>

      {/* Interactive Scrum Board */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Interactive Sprint Kanban Board Simulator
        </h2>
        <ScrumBoardWidget />
      </div>

      {/* Featured Scrum Projects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Scrum & Project Management Case Studies
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pmProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

    </div>
  );
}
