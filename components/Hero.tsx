'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Kanban, 
  ArrowRight, 
  Terminal, 
  TrendingUp,
  Database,
  Crosshair
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Top Status & Role Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white/15 backdrop-blur-md shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              BEN MANGUIAT
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-mono text-neutral-300">
              Information Systems & Agile Analytics
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl space-y-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Turning Raw Data & Ideas into{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Organized, Measurable Outcomes.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Information Systems specialist focused on <strong className="text-white">Data Analytics Pipelines</strong>,{' '}
              <strong className="text-white">Executive Power BI / Tableau Dashboards</strong>, and{' '}
              <strong className="text-white">Agile / Scrum Delivery</strong>.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs font-mono text-black bg-white hover:bg-neutral-200 active:scale-95 transition-all shadow-lg"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/project-management"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs font-mono text-white bg-black border border-white/20 hover:border-emerald-400/50 hover:bg-neutral-900 active:scale-95 transition-all shadow-md"
            >
              <Kanban className="w-4 h-4 text-emerald-400" />
              <span>SCRUM SIMULATOR</span>
            </Link>

            <a
              href="https://github.com/benman17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-semibold text-neutral-300 hover:text-white bg-black border border-white/15 hover:border-white/30 transition-all"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GITHUB ↗</span>
            </a>
          </div>

          {/* Geometric HUD Matrix Bar */}
          <div className="w-full max-w-4xl pt-6">
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/15 shadow-2xl relative group">
              
              {/* Corner reticles */}
              <div className="absolute top-2 left-2 text-white/30 text-[10px] font-mono">+</div>
              <div className="absolute top-2 right-2 text-white/30 text-[10px] font-mono">+</div>
              <div className="absolute bottom-2 left-2 text-white/30 text-[10px] font-mono">+</div>
              <div className="absolute bottom-2 right-2 text-white/30 text-[10px] font-mono">+</div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3.5 mb-4 text-left">
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold tracking-wider">SYSTEM HUD METRICS</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                    ● ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span>FOCUS: <strong className="text-cyan-400">ANALYTICS & SCRUM</strong></span>
                  <span className="hidden sm:inline text-neutral-700">|</span>
                  <span className="hidden sm:inline">CASE STUDIES: <strong className="text-emerald-400">05 REPOS</strong></span>
                </div>
              </div>

              {/* 3 Core Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-cyan-400/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1 font-mono">
                    <span>Data Analyzed</span>
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">250,000+</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">Records via SQL & Python ETL</div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-emerald-400/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1 font-mono">
                    <span>Baseline Net Revenue</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">$5.94M</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">Northstar Commerce BI Pipeline</div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/10 hover:border-indigo-400/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1 font-mono">
                    <span>On-Time Story Delivery</span>
                    <Kanban className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">96%</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">4 Sprints (DevHawks Team)</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
