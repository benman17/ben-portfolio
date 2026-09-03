'use client';

import React from 'react';
import Link from 'next/link';
import { SKILL_CATEGORIES } from '@/data/skills';
import { BarChart3, Kanban, Workflow } from 'lucide-react';

export default function PillarsSection() {
  const iconMap: Record<string, any> = {
    BarChart3: BarChart3,
    Kanban: Kanban,
    Workflow: Workflow
  };

  return (
    <section className="py-20 relative bg-[#050505] border-b border-[#1a1a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1a1a20] pb-8 font-mono">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="text-xs font-bold tracking-widest text-[#38bdf8] uppercase">
              CORE COMPETENCIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
              Data, Systems & Agile Delivery
            </h2>
            <p className="text-[#8a8a8a] text-sm sm:text-base leading-relaxed font-sans font-normal">
              Combining technical data analytics proficiency with structured Agile Scrum leadership and relational systems architecture.
            </p>
          </div>
        </div>

        {/* 3 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((pillar, index) => {
            const IconComponent = iconMap[pillar.iconName] || BarChart3;
            
            return (
              <div
                key={pillar.title}
                className="p-6 bg-[#08080c] border border-[#1a1a20] flex flex-col justify-between group hover:border-[#38bdf8] transition-colors text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a1a20]">
                    <div className="p-2 border border-[#1a1a20] text-white">
                      <IconComponent className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2 font-sans">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs text-[#8a8a8a] mb-6 leading-relaxed font-sans font-normal">
                    {pillar.subtitle}
                  </p>

                  {/* Editorial Capability List */}
                  <ul className="space-y-2 mb-8 font-mono text-xs text-[#8a8a8a]">
                    {pillar.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between border-b border-[#1a1a20]/60 pb-1.5">
                        <span className={skill.highlight ? 'text-white font-bold' : 'text-[#8a8a8a]'}>
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-[#38bdf8]">✓</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 border-t border-[#1a1a20] font-mono">
                  <Link
                    href={index === 1 ? '/project-management' : index === 0 ? '/analytics' : '/projects'}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#38bdf8] transition-colors"
                  >
                    <span>EXPLORE {pillar.title.toUpperCase()} →</span>
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
