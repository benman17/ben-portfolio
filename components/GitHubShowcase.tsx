'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchGitHubRepos, GitHubRepo } from '@/lib/github';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export default function GitHubShowcase() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetchGitHubRepos('benman17').then((data) => {
      if (alive) setRepos(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!repos) {
    return (
      <ul className="border-t-2 border-ink" aria-busy="true" aria-label="Loading repositories">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="border-b border-rule py-5">
            <div className="h-5 w-48 animate-pulse bg-wash" />
            <div className="mt-2 h-4 w-full max-w-lg animate-pulse bg-wash" />
          </li>
        ))}
      </ul>
    );
  }

  const offline = repos.some((r) => r.fromFallback);

  return (
    <div>
      {offline && (
        <p className="mb-4 text-sm text-ink-3" role="status">
          GitHub didn&apos;t respond, so this is the list of project repositories without live details.
        </p>
      )}
      <ul className="border-t-2 border-ink">
        {repos.map((repo) => {
          const meta = [
            repo.language,
            repo.stargazers_count ? `${repo.stargazers_count} ${repo.stargazers_count === 1 ? 'star' : 'stars'}` : null,
            repo.updated_at ? `Updated ${formatDate(repo.updated_at)}` : null,
          ].filter(Boolean);
          return (
            <li key={repo.id} className="group relative border-b border-rule py-5">
              <h2 className="text-lg font-bold text-ink">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]"
                >
                  {repo.name}
                  <ArrowUpRight className="h-4 w-4 text-ink-3" strokeWidth={2} aria-hidden />
                </a>
              </h2>
              {repo.description && <p className="prose-body mt-1 max-w-[70ch] text-base">{repo.description}</p>}
              {meta.length > 0 && <p className="tnum mt-1.5 text-sm text-ink-3">{meta.join(', ')}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
