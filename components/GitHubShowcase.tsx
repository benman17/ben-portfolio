'use client';

import React, { useEffect, useState } from 'react';
import { fetchGitHubRepos, GitHubRepo } from '@/lib/github';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';

export default function GitHubShowcase() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLang, setFilterLang] = useState<string>('All');

  useEffect(() => {
    async function loadRepos() {
      setLoading(true);
      const data = await fetchGitHubRepos('benman17');
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];

  const filteredRepos = repos.filter((repo) => {
    if (filterLang === 'All') return true;
    return repo.language === filterLang;
  });

  return (
    <section className="py-20 bg-[#050505] relative border-b border-[#1a1a20] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">
              04 / OPEN SOURCE CODE REPOSITORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Live GitHub Synchronization
            </h2>
            <p className="text-[#8a8a8a] text-xs sm:text-sm font-sans font-normal leading-relaxed">
              Every project comes with full source code transparency. Inspect SQL scripts, Python notebooks, and Next.js applications directly on GitHub.
            </p>
          </div>

          {/* Language filter pills */}
          <div className="flex flex-wrap gap-2 text-xs self-start md:self-auto">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilterLang(lang)}
                className={`px-3 py-1.5 transition-all border ${
                  filterLang === lang
                    ? 'border-white text-white bg-white/10 font-bold'
                    : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Repos Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 h-44 animate-pulse bg-[#08080c] border border-[#1a1a20]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-6 bg-[#08080c] border border-[#1a1a20] hover:border-[#38bdf8] transition-colors flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                    <span className="text-[#38bdf8] font-bold">
                      {repo.language || 'Code'}
                    </span>
                    <span className="text-[#8a8a8a] text-[10px]">
                      ★ {repo.stargazers_count} · ⑂ {repo.forks_count}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans group-hover:text-[#38bdf8] transition-colors tracking-tight mb-2">
                    {repo.name}
                  </h3>

                  <p className="text-xs text-[#8a8a8a] font-sans font-normal line-clamp-3 leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1a20] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#8a8a8a]">
                    UPDATED: {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }).toUpperCase()}
                  </span>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-white hover:text-[#38bdf8] transition-colors"
                  >
                    <span>REPO ↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
