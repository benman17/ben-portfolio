import React from 'react';
import GitHubShowcase from '@/components/GitHubShowcase';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { PROFILE_INFO } from '@/data/skills';

export default function GitHubPage() {
  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left font-mono">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1a1a20] pb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
            SOURCE CODE TRANSPARENCY
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            GitHub Repositories
          </h1>
          <p className="text-sm sm:text-base text-[#8a8a8a] leading-relaxed font-sans font-normal pt-1">
            Inspect live open-source repositories for analytical data pipelines, SQL script libraries, PySpark machine learning notebooks, and Next.js applications directly on GitHub.
          </p>
        </div>

        <a
          href={`https://github.com/${PROFILE_INFO.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 text-xs font-bold text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-2 shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          <span>FOLLOW @{PROFILE_INFO.githubUsername.toUpperCase()} ↗</span>
        </a>
      </div>

      {/* GitHub Showcase Component */}
      <GitHubShowcase />

    </div>
  );
}
