import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import CopyEmail from '@/components/CopyEmail';
import { PROFILE_INFO, SKILL_CATEGORIES } from '@/data/skills';
import SplitText from '@/components/reactbits/SplitText';
import AnimatedContent from '@/components/reactbits/AnimatedContent';

export const metadata: Metadata = {
  title: 'About | Ben Manguiat',
  description: 'Ben Manguiat, data analyst. B.S. Information Systems, Miami University, 2026.',
};

const COURSEWORK =
  'Database Architecture, Relational Data Modeling, Information Systems Strategy, Agile Software Development, Systems Analysis & Design, and Business Analytics Data Mining.';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SplitText tag="h1" immediate text="About" className="text-5xl font-extrabold tracking-[-0.035em] text-ink sm:text-7xl" />
          <p className="prose-body mt-5 text-xl">{PROFILE_INFO.bio}</p>
          <p className="prose-body mt-4 text-xl">
            I&apos;m looking for product, BI and data analyst roles. Games are where I&apos;d most like to apply it: my{' '}
            <Link href="/projects/tft-snowflake" className="link">Teamfight Tactics analysis</Link> is the kind of work I want to do every day.
          </p>
        </div>

        <aside className="lg:col-span-5 lg:pt-3">
          <h2 className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">Contact</h2>
          <div className="mt-4">
            <CopyEmail />
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
            <a href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
            <a href={`https://github.com/${PROFILE_INFO.githubUsername}`} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
          </p>

          <h2 className="mt-12 border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">Education</h2>
          <p className="mt-3 font-bold text-ink">{PROFILE_INFO.education}, Miami University, 2026</p>
          <p className="prose-body mt-2 text-base">Coursework: {COURSEWORK}</p>
        </aside>
      </div>

      <section aria-labelledby="tools" className="mt-20">
        <h2 id="tools" className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">Tools and methods</h2>
        <AnimatedContent stagger={0.1} className="mt-6 grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-3">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-lg font-bold text-ink">{cat.title}</h3>
              <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-ink-2">
                {cat.skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedContent>
        <p className="mt-10 text-[0.9375rem] text-ink-3">
          More on how I use them: <Link href="/analytics" className="link font-semibold">how I work with data</Link> and{' '}
          <Link href="/project-management" className="link font-semibold">how I run a sprint</Link>.
        </p>
      </section>
    </div>
  );
}
