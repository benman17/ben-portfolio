import React from 'react';
import Link from 'next/link';
import { PROFILE_INFO } from '@/data/skills';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-ink-3 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div className="space-y-1">
          <p className="font-bold text-ink">Ben Manguiat</p>
          <p>Data analyst. B.S. Information Systems, Miami University.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
          <li>
            <a className="hover:text-ink" href={`mailto:${PROFILE_INFO.email}`}>Email me</a>
          </li>
          <li>
            <a className="hover:text-ink" href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a className="hover:text-ink" href={`https://github.com/${PROFILE_INFO.githubUsername}`} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <Link className="hover:text-ink" href="/projects/ben-portfolio-app">About this site</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
