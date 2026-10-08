import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Process from '@/components/Process';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import { PROJECTS } from '@/data/projects';
import { STORIES } from '@/lib/stories';

export const metadata: Metadata = {
  title: 'How I analyze data | Ben Manguiat',
  description: 'The process behind the SQL, Snowflake, Power BI and Python case studies.',
};

const analytics = PROJECTS.filter((p) => p.category === 'analytics');

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
      <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl">
        How I work with data
      </h1>
      <p className="prose-body mt-4 max-w-[58ch] text-xl">
        SQL pipelines in PostgreSQL and Snowflake, dimensional models, Power BI dashboards, and Python where the question needs it. Every step below shows up in at least one of the case studies.
      </p>

      <section aria-labelledby="cases" className="mt-14">
        <h2 id="cases" className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">Case studies</h2>
        <ul className="mt-2">
          {analytics.map((p) => (
            <li key={p.slug} className="border-b border-rule py-4">
              <Link href={`/projects/${p.slug}`} className="group block">
                <span className="text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]">
                  {STORIES[p.slug]?.headline}
                </span>
                <span className="mt-0.5 block text-sm text-ink-3">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process" className="mt-16">
        <h2 id="process" className="mb-6 text-2xl font-extrabold tracking-[-0.015em] text-ink sm:text-3xl">The process</h2>
        <Process kind="analytics" />
      </section>

      <section className="mt-16">
        <AnalyticsSandbox />
      </section>
    </div>
  );
}
