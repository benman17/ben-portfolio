import React from 'react';
import type { Metadata } from 'next';
import GitHubShowcase from '@/components/GitHubShowcase';
import { PROFILE_INFO } from '@/data/skills';

export const metadata: Metadata = {
  title: 'Code | Ben Manguiat',
  description: 'Public GitHub repositories: SQL, Python and the source of this site.',
};

export default function GitHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
      <h1 className="text-4xl font-extrabold tracking-[-0.025em] text-ink sm:text-5xl">Code</h1>
      <p className="prose-body mt-4 max-w-[56ch] text-xl">
        Every case study links to its repository. Here is everything public on{' '}
        <a href={`https://github.com/${PROFILE_INFO.githubUsername}`} target="_blank" rel="noopener noreferrer" className="link">
          github.com/{PROFILE_INFO.githubUsername}
        </a>
        .
      </p>
      <div className="mt-12">
        <GitHubShowcase />
      </div>
    </div>
  );
}
