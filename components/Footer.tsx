'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { PROFILE_INFO } from '@/data/skills';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a20] pt-16 pb-12 relative overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#1a1a20]">
          
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-white text-base tracking-widest">
                BEN MANGUIAT
              </span>
              <span className="text-[#8a8a8a] text-xs">| DIGITAL ARCHITECTURE</span>
            </div>
            
            <p className="text-[#8a8a8a] text-xs max-w-md leading-relaxed font-sans font-normal">
              Information Systems specialist focused on Data Analytics Pipelines, Power BI / Tableau dashboards, and Agile Scrum Master project delivery. Turning complex data into organized outcomes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PROFILE_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#1a1a20] text-[#8a8a8a] hover:text-white hover:border-white transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://github.com/${PROFILE_INFO.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#1a1a20] text-[#8a8a8a] hover:text-white hover:border-white transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="p-2 border border-[#1a1a20] text-[#8a8a8a] hover:text-white hover:border-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Focus Navigation */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              PORTFOLIO INDEX
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8a8a8a]">
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  DATA & ANALYTICAL PIPELINES
                </Link>
              </li>
              <li>
                <Link href="/project-management" className="hover:text-white transition-colors">
                  SCRUM MASTER & AGILE DELIVERY
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  ALL CASE STUDIES
                </Link>
              </li>
              <li>
                <Link href="/github" className="hover:text-white transition-colors">
                  GITHUB REPOS & SOURCE CODE
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a8a8a] gap-4">
          <p>© {new Date().getFullYear()} BEN MANGUIAT. BUILT WITH NEXT.JS 16 & TAILWIND CSS.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px]">SYSTEM STATUS: READY FOR OPPORTUNITIES</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
