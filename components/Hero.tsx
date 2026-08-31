'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Kanban, 
  ArrowRight, 
  Terminal, 
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Layers,
  Database
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-grid">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Top Status & Role Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              BEN MANGUIAT
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-medium text-slate-300">
              Information Systems & Agile Analytics
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Turning Raw Data & Ideas into{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Organized, Measurable Outcomes.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
              Information Systems specialist focused on <strong className="text-slate-200">Data Analytics</strong>,{' '}
              <strong className="text-slate-200">Executive Power BI / Tableau Dashboards</strong>, and{' '}
              <strong className="text-slate-200">Agile / Scrum Project Delivery</strong>.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:opacity-95 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/project-management"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all shadow-lg"
            >
              <Kanban className="w-4 h-4 text-emerald-400" />
              <span>Interactive Scrum Board</span>
            </Link>

            <a
              href="https://github.com/benman17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900 hover:border-slate-700 transition-all"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GitHub ↗</span>
            </a>
          </div>

          {/* High-Tech System Status HUD Bar */}
          <div className="w-full max-w-4xl pt-6">
            <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800/80 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-3 mb-4 text-left">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 font-semibold">SYSTEM STATUS</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ● ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span>FOCUS: <strong className="text-cyan-400">ANALYTICS & SCRUM</strong></span>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span className="hidden sm:inline">PROJECTS LOADED: <strong className="text-emerald-400">05</strong></span>
                </div>
              </div>

              {/* 3 Core Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-medium">Data Analyzed</span>
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">250,000+</div>
                  <div className="text-[11px] text-slate-400 mt-1">Records via SQL & Python ETL</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-medium">Business Revenue Growth</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">+14.2%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Identified via BI Dashboarding</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-medium">On-Time Story Delivery</span>
                    <Kanban className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">96%</div>
                  <div className="text-[11px] text-slate-400 mt-1">4 Sprints (DevHawks Team)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
