import React from 'react';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import NflClusterWidget from '@/components/NflClusterWidget';
import { PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { BarChart3, Database, Code, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  const analyticsProjects = PROJECTS.filter((p) => p.category === 'analytics');

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>DATA & BUSINESS INTELLIGENCE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Data Engineering & Analytics Showcase
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          I build automated SQL & Python pipelines that clean raw enterprise datasets and deliver executive-ready Power BI and Tableau dashboards driving strategic decisions.
        </p>
      </div>

      {/* Analytics Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Robust SQL Data Pipelines</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Proficient in writing complex PostgreSQL/Snowflake queries using Window functions, CTEs, and Star Schema dimensional modeling.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Executive BI Dashboarding</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designing clean Power BI & Tableau visual dashboards with interactive DAX measures, time-intelligence, and dynamic drill-downs.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Unsupervised Machine Learning</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Applying K-Means clustering, PCA dimensionality reduction, and Scikit-Learn pipelines to uncover hidden segments in complex tracking data.
          </p>
        </div>
      </div>

      {/* NFL Machine Learning Clustering Interactive Widget */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Machine Learning Case Study: NFL Player Archetype Clustering
        </h2>
        <NflClusterWidget />
      </div>

      {/* Interactive Sandbox */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Interactive Executive Revenue BI Sandbox
        </h2>
        <AnalyticsSandbox />
      </div>

      {/* Featured Analytics Projects Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Featured Analytics Case Studies
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {analyticsProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

    </div>
  );
}
