'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Database, BarChart3, Workflow, Kanban } from 'lucide-react';

interface HeroProps {
  onSelectCategory?: (category: 'analytics' | 'systems' | 'project-management' | 'all') => void;
}

export default function Hero({ onSelectCategory }: HeroProps) {
  const [activeNode, setActiveNode] = useState<'DATA' | 'ANALYTICS' | 'SYSTEMS' | 'SCRUM' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleNodeClick = (node: 'DATA' | 'ANALYTICS' | 'SYSTEMS' | 'SCRUM', categoryKey?: 'analytics' | 'systems' | 'project-management') => {
    setActiveNode(node);
    if (categoryKey && onSelectCategory) {
      onSelectCategory(categoryKey);
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#050505] overflow-hidden border-b border-[#1a1a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: High-End Editorial Typography */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Editorial Name Header */}
            <div className="space-y-2">
              <div className="text-xs font-mono tracking-widest text-[#8a8a8a] uppercase flex items-center gap-3">
                <span>BEN MANGUIAT</span>
                <span className="h-[1px] w-12 bg-[#2a2a35]" />
                <span className="text-[#38bdf8]">SYSTEM ARCHITECT & ANALYST</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Data Analytics.<br />
                Business Systems.<br />
                <span className="text-[#8a8a8a]">Agile Delivery.</span>
              </h1>
            </div>

            {/* Subtle Divider Rule */}
            <div className="h-[1px] w-full bg-[#1a1a20]" />

            {/* Editorial Statement */}
            <p className="text-base sm:text-lg text-[#8a8a8a] max-w-xl font-normal leading-relaxed">
              I turn complex raw data and vague business requirements into organized relational systems, executive insights, and actionable delivery.
            </p>

            {/* Category Anchor Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleNodeClick('ANALYTICS', 'analytics')}
                className={`p-3 text-left font-mono text-xs border transition-all ${
                  activeNode === 'ANALYTICS'
                    ? 'border-white text-white bg-white/5'
                    : 'border-[#1a1a20] text-[#8a8a8a] hover:border-[#38bdf8] hover:text-white'
                }`}
              >
                <div className="text-[10px] text-[#8a8a8a] mb-1">01 — CATEGORY</div>
                <div className="font-bold">ANALYTICS →</div>
              </button>

              <button
                onClick={() => handleNodeClick('SYSTEMS', 'systems')}
                className={`p-3 text-left font-mono text-xs border transition-all ${
                  activeNode === 'SYSTEMS'
                    ? 'border-white text-white bg-white/5'
                    : 'border-[#1a1a20] text-[#8a8a8a] hover:border-[#38bdf8] hover:text-white'
                }`}
              >
                <div className="text-[10px] text-[#8a8a8a] mb-1">02 — CATEGORY</div>
                <div className="font-bold">SYSTEMS →</div>
              </button>

              <button
                onClick={() => handleNodeClick('SCRUM', 'project-management')}
                className={`p-3 text-left font-mono text-xs border transition-all ${
                  activeNode === 'SCRUM'
                    ? 'border-white text-white bg-white/5'
                    : 'border-[#1a1a20] text-[#8a8a8a] hover:border-[#38bdf8] hover:text-white'
                }`}
              >
                <div className="text-[10px] text-[#8a8a8a] mb-1">03 — CATEGORY</div>
                <div className="font-bold">SCRUM / PM →</div>
              </button>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono">
              <Link
                href="/projects"
                className="px-5 py-3 text-black bg-white font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <span>VIEW CASE STUDIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://github.com/benman17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a8a] hover:text-white transition-colors"
              >
                GITHUB REPOSITORIES ↗
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Geometric Coordinate System */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className="lg:col-span-5 relative h-[380px] sm:h-[420px] bg-[#08080c] border border-[#1a1a20] p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Coordinate Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8a8a] border-b border-[#1a1a20] pb-3">
              <span>ARCHITECTURAL SYSTEM NODE MAP</span>
              <span className="text-[#38bdf8]">
                X: {mousePos.x.toFixed(1)} | Y: {mousePos.y.toFixed(1)}
              </span>
            </div>

            {/* Intersecting SVG Lines & Nodes */}
            <div className="relative flex-1 my-4 flex items-center justify-center">
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                {/* Connecting Lines */}
                <line x1="50%" y1="20%" x2="25%" y2="55%" stroke="#1a1a28" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="50%" y1="20%" x2="75%" y2="55%" stroke="#1a1a28" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="25%" y1="55%" x2="75%" y2="55%" stroke="#1a1a28" strokeWidth="1.5" />
                <line x1="25%" y1="55%" x2="50%" y2="85%" stroke="#1a1a28" strokeWidth="1.5" />
                <line x1="75%" y1="55%" x2="50%" y2="85%" stroke="#1a1a28" strokeWidth="1.5" />
              </svg>

              {/* Node 1: DATA (Top) */}
              <button
                onClick={() => handleNodeClick('DATA')}
                className={`absolute top-[15%] left-1/2 -translate-x-1/2 px-3 py-1.5 font-mono text-xs border transition-all ${
                  activeNode === 'DATA'
                    ? 'border-[#38bdf8] text-[#38bdf8] bg-black shadow-md'
                    : 'border-[#1a1a25] text-[#8a8a8a] bg-[#050508] hover:border-white hover:text-white'
                }`}
                style={{
                  transform: `translate3d(-50%, ${mousePos.y * 0.3}px, 0)`
                }}
              >
                <div className="text-[9px] text-[#8a8a8a]">SOURCE</div>
                <div className="font-bold flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#38bdf8]" />
                  <span>DATA</span>
                </div>
              </button>

              {/* Node 2: ANALYTICS (Middle Left) */}
              <button
                onClick={() => handleNodeClick('ANALYTICS', 'analytics')}
                className={`absolute top-[50%] left-[10%] -translate-y-1/2 px-3 py-1.5 font-mono text-xs border transition-all ${
                  activeNode === 'ANALYTICS'
                    ? 'border-[#38bdf8] text-[#38bdf8] bg-black shadow-md'
                    : 'border-[#1a1a25] text-[#8a8a8a] bg-[#050508] hover:border-white hover:text-white'
                }`}
                style={{
                  transform: `translate3d(${mousePos.x * 0.4}px, -50%, 0)`
                }}
              >
                <div className="text-[9px] text-[#8a8a8a]">ETL / MODELS</div>
                <div className="font-bold flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-[#38bdf8]" />
                  <span>ANALYTICS</span>
                </div>
              </button>

              {/* Node 3: SYSTEMS (Middle Right) */}
              <button
                onClick={() => handleNodeClick('SYSTEMS', 'systems')}
                className={`absolute top-[50%] right-[10%] -translate-y-1/2 px-3 py-1.5 font-mono text-xs border transition-all ${
                  activeNode === 'SYSTEMS'
                    ? 'border-[#818cf8] text-[#818cf8] bg-black shadow-md'
                    : 'border-[#1a1a25] text-[#8a8a8a] bg-[#050508] hover:border-white hover:text-white'
                }`}
                style={{
                  transform: `translate3d(${mousePos.x * -0.4}px, -50%, 0)`
                }}
              >
                <div className="text-[9px] text-[#8a8a8a]">ARCHITECTURE</div>
                <div className="font-bold flex items-center gap-1">
                  <Workflow className="w-3 h-3 text-[#818cf8]" />
                  <span>SYSTEMS</span>
                </div>
              </button>

              {/* Node 4: SCRUM (Bottom) */}
              <button
                onClick={() => handleNodeClick('SCRUM', 'project-management')}
                className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 px-3 py-1.5 font-mono text-xs border transition-all ${
                  activeNode === 'SCRUM'
                    ? 'border-[#34d399] text-[#34d399] bg-black shadow-md'
                    : 'border-[#1a1a25] text-[#8a8a8a] bg-[#050508] hover:border-white hover:text-white'
                }`}
                style={{
                  transform: `translate3d(-50%, ${mousePos.y * -0.3}px, 0)`
                }}
              >
                <div className="text-[9px] text-[#8a8a8a]">DELIVERY</div>
                <div className="font-bold flex items-center gap-1">
                  <Kanban className="w-3 h-3 text-[#34d399]" />
                  <span>SCRUM / PM</span>
                </div>
              </button>
            </div>

            {/* Bottom Status Info */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8a8a] border-t border-[#1a1a20] pt-3">
              <span>SYSTEM STATE: {activeNode ? `FILTERED [${activeNode}]` : 'READY'}</span>
              <span>CLICK NODE TO FILTER</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
