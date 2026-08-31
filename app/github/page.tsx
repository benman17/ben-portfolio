import React from 'react';
import GitHubShowcase from '@/components/GitHubShowcase';
import { Code, Star, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { PROFILE_INFO } from '@/data/skills';

export default function GitHubPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>OPEN SOURCE TRANSPARENCY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            GitHub Code Repositories
          </h1>
          <p className="text-slate-400 text-base">
            Inspect live source code for analytical data pipelines, SQL script libraries, Python notebooks, and Next.js applications directly on GitHub.
          </p>
        </div>

        <a
          href={`https://github.com/${PROFILE_INFO.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Follow @{PROFILE_INFO.githubUsername} ↗</span>
        </a>
      </div>

      {/* GitHub Showcase Component */}
      <GitHubShowcase />

    </div>
  );
}
