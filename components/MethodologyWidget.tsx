'use client';

import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '@/data/projects';
import { BarChart3, Kanban, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function MethodologyWidget() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'scrum'>('analytics');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = METHODOLOGY_STEPS[activeTab];
  const currentStep = steps[activeStepIndex];

  return (
    <section className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            METHODOLOGY & WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Approach & Solve Problems
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Whether engineering an analytical data pipeline or leading an Agile Scrum sprint, I follow a disciplined methodology to ensure predictable, measurable results.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab('analytics');
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Data Analytics Lifecycle</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('scrum');
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'scrum'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>Agile / Scrum Delivery</span>
            </button>
          </div>
        </div>

        {/* Interactive Step Pipeline Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((item, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative flex flex-col p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? activeTab === 'analytics'
                      ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    isSelected
                      ? activeTab === 'analytics' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.step}
                  </span>
                  {isSelected && (
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep-Dive Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            {activeTab === 'analytics' ? (
              <BarChart3 className="w-48 h-48 text-cyan-400" />
            ) : (
              <Kanban className="w-48 h-48 text-emerald-400" />
            )}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                  activeTab === 'analytics'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  STAGE {currentStep.step} OF 05
                </span>
                <span className="text-slate-400 text-xs font-mono">{currentStep.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentStep.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentStep.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                  TOOLS & METHODOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Badge Box */}
            <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>KEY DELIVERABLE</span>
              </div>
              <div className="text-lg font-bold text-white">
                {currentStep.deliverable}
              </div>
              <p className="text-xs text-slate-400">
                Guarantees alignment between technical execution and business value at this stage.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev + 1) % steps.length)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
