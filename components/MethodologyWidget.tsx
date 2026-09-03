'use client';

import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '@/data/projects';
import { BarChart3, Kanban, CheckCircle2, ChevronRight } from 'lucide-react';

export default function MethodologyWidget() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'scrum'>('analytics');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = METHODOLOGY_STEPS[activeTab];
  const currentStep = steps[activeStepIndex];

  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
            METHODOLOGY & WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Approach & Solve Problems
          </h2>
          <p className="text-[#8a8a8a] text-sm sm:text-base">
            Whether engineering an analytical data pipeline or leading an Agile Scrum sprint, I follow a disciplined methodology to ensure predictable, measurable results.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#08080c] border border-[#1a1a20] gap-2">
            <button
              onClick={() => {
                setActiveTab('analytics');
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'border border-white text-white bg-white/10 font-bold'
                  : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
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
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono font-semibold transition-all ${
                activeTab === 'scrum'
                  ? 'border border-white text-white bg-white/10 font-bold'
                  : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
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
                className={`relative flex flex-col p-4 text-left border transition-all ${
                  isSelected
                    ? activeTab === 'analytics'
                      ? 'bg-[#08080c] border-[#38bdf8]'
                      : 'bg-[#08080c] border-[#34d399]'
                    : 'bg-[#08080c] border-[#1a1a20] hover:bg-[#1a1a20] hover:border-[#2a2a35]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 ${
                    isSelected
                      ? activeTab === 'analytics' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'bg-[#34d399]/20 text-[#34d399]'
                      : 'bg-[#1a1a20] text-[#8a8a8a]'
                  }`}>
                    {item.step}
                  </span>
                  {isSelected && (
                    <span className={`flex h-2 w-2 ${activeTab === 'analytics' ? 'bg-[#38bdf8]' : 'bg-[#34d399]'}`} />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-[#8a8a8a] mt-1 line-clamp-1">{item.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep-Dive Card */}
        <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 border ${
                  activeTab === 'analytics'
                    ? 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/40'
                    : 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/40'
                }`}>
                  STAGE {currentStep.step} OF 05
                </span>
                <span className="text-[#8a8a8a] text-xs font-mono">{currentStep.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentStep.title}
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {currentStep.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-[#8a8a8a] font-semibold block mb-2">
                  TOOLS & METHODOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-[#08080c] border border-[#1a1a20] text-white text-xs font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Badge Box */}
            <div className="lg:col-span-1 p-6 bg-black border border-[#1a1a20] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>KEY DELIVERABLE</span>
              </div>
              <div className="text-lg font-bold text-white">
                {currentStep.deliverable}
              </div>
              <p className="text-xs text-[#8a8a8a]">
                Guarantees alignment between technical execution and business value at this stage.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev + 1) % steps.length)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white text-xs font-mono font-semibold transition-all"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-4 h-4 text-[#38bdf8]" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
