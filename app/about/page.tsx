'use client';

import React from 'react';
import { PROFILE_INFO } from '@/data/skills';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-36 pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left font-mono">
      
      {/* ABOUT HEADER */}
      <section className="space-y-6">
        <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
          ABOUT
        </div>

        <div className="space-y-3 border-b border-[#1a1a20] pb-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            BEN MANGUIAT
          </h1>
          <p className="text-[#8a8a8a] text-sm tracking-wider uppercase">
            Information Systems & Agile Analytics
          </p>
          <p className="text-base text-neutral-300 max-w-3xl leading-relaxed font-sans font-normal pt-2">
            {PROFILE_INFO.bio}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono">
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="px-4 py-2 text-black bg-white font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PROFILE_INFO.email}</span>
            </a>

            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a8a8a] hover:text-white transition-colors"
            >
              LINKEDIN ↗
            </a>

            <a
              href={`https://github.com/${PROFILE_INFO.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a8a8a] hover:text-white transition-colors"
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="space-y-4 border-b border-[#1a1a20] pb-10">
        <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
          EDUCATION
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white font-sans">
            {PROFILE_INFO.education}
          </h3>
          <p className="text-xs text-[#8a8a8a] uppercase tracking-wider">
            Academic Focus & Applied Coursework
          </p>
          <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed font-sans font-normal pt-1">
            Database Architecture, Relational Data Modeling, Information Systems Strategy, Agile Software Development, Systems Analysis & Design, and Business Analytics Data Mining.
          </p>
        </div>
      </section>

      {/* CAPABILITIES MATRIX */}
      <section className="space-y-6">
        <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
          CAPABILITIES & TECHNICAL DOMAINS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-2">
          
          {/* Column 1: DATA & ANALYTICS */}
          <div className="space-y-6 p-6 bg-[#08080c] border border-[#1a1a20]">
            <div className="border-b border-[#1a1a20] pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                DATA & ANALYTICS
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">SQL DATA PIPELINES</span>
                <span className="text-white font-bold">PostgreSQL · MySQL · Snowflake</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">PYTHON DATA SCIENCE</span>
                <span className="text-white font-bold">Pandas · NumPy · PySpark MLlib</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">BUSINESS INTELLIGENCE</span>
                <span className="text-white font-bold">Power BI · Tableau · DAX Modeling</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">DATA ENGINEERING</span>
                <span className="text-white font-bold">ETL · Star Schema · Data Quality Audit</span>
              </div>
            </div>
          </div>

          {/* Column 2: SCRUM & MANAGEMENT */}
          <div className="space-y-6 p-6 bg-[#08080c] border border-[#1a1a20]">
            <div className="border-b border-[#1a1a20] pb-3">
              <span className="text-xs font-bold text-[#34d399] uppercase tracking-wider block">
                AGILE & SCRUM MANAGEMENT
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">AGILE FRAMEWORK</span>
                <span className="text-white font-bold">Scrum Master · Sprint Ceremonies</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">BACKLOG & USER STORIES</span>
                <span className="text-white font-bold">Product Backlog · User Story Mapping · DoD</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">STAKEHOLDER ALIGNMENT</span>
                <span className="text-white font-bold">Requirement Grooming · Sprint Velocity</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">TOOLING</span>
                <span className="text-white font-bold">Jira · Confluence · Planning Poker</span>
              </div>
            </div>
          </div>

          {/* Column 3: BUSINESS SYSTEMS */}
          <div className="space-y-6 p-6 bg-[#08080c] border border-[#1a1a20]">
            <div className="border-b border-[#1a1a20] pb-3">
              <span className="text-xs font-bold text-[#818cf8] uppercase tracking-wider block">
                BUSINESS SYSTEMS & TECH
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">SYSTEMS ANALYSIS</span>
                <span className="text-white font-bold">Requirements Gathering · Process Modeling</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">WEB APPLICATIONS</span>
                <span className="text-white font-bold">Next.js 16 · React 19 · TypeScript</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">ARCHITECTURE</span>
                <span className="text-white font-bold">REST APIs · Cloud Warehousing · Git</span>
              </div>

              <div>
                <span className="text-[#8a8a8a] block text-[10px] uppercase tracking-wider mb-1">STYLING & COMPOSITION</span>
                <span className="text-white font-bold">Tailwind CSS v4 · Responsive Design</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
