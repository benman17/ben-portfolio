'use client';

import React from 'react';
import Link from 'next/link';
import { SKILL_CATEGORIES } from '@/data/skills';
import { BarChart3, Kanban, Workflow, ArrowRight, CheckCircle } from 'lucide-react';

export default function PillarsSection() {
  const iconMap: Record<string, any> = {
    BarChart3: BarChart3,
    Kanban: Kanban,
    Workflow: Workflow
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            CORE PILLARS OF COMPETENCY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging Data, Agile Delivery & Systems
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Rather than a list of isolated tools, my expertise spans the three critical pillars necessary to deliver high-performing digital business products.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((pillar, index) => {
            const IconComponent = iconMap[pillar.iconName] || BarChart3;
            const numberLabel = `0${index + 1}`;
            
            return (
              <div
                key={pillar.title}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-slate-700 group-hover:text-cyan-400/40 transition-colors">
                      {numberLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {pillar.subtitle}
                  </p>

                  {/* Skills List */}
                  <ul className="space-y-2.5 mb-8">
                    {pillar.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-3.5 h-3.5 ${skill.highlight ? 'text-cyan-400' : 'text-slate-600'}`} />
                          <span className={skill.highlight ? 'font-semibold text-slate-200' : 'text-slate-400'}>
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500">{skill.level}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    href={index === 1 ? '/project-management' : index === 0 ? '/analytics' : '/projects'}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Explore {pillar.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
