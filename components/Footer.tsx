'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { PROFILE_INFO } from '@/data/skills';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                  BM
                </div>
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                BEN MANGUIAT
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Information Systems specialist focused on Data Analytics, Power BI / Tableau dashboards, and Agile Scrum Master project delivery. Turning complex data into organized outcomes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PROFILE_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              </a>
              <a
                href={`https://github.com/${PROFILE_INFO.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
              </a>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Core Focus Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              PORTFOLIO AREAS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/analytics" className="hover:text-cyan-400 transition-colors">
                  Data & Analytics Lifecycle
                </Link>
              </li>
              <li>
                <Link href="/project-management" className="hover:text-cyan-400 transition-colors">
                  Scrum Master & Agile Delivery
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  All Interactive Case Studies
                </Link>
              </li>
              <li>
                <Link href="/github" className="hover:text-cyan-400 transition-colors">
                  GitHub Repositories Source Code
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ben Manguiat. Built with Next.js, TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] text-slate-400">STATUS: READY FOR OPPORTUNITIES</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
