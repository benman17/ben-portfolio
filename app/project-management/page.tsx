import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Process from '@/components/Process';
import { PROJECTS } from '@/data/projects';
import { STORIES } from '@/lib/stories';

export const metadata: Metadata = {
  title: 'Scrum and delivery | Ben Manguiat',
  description: 'Scrum Master work on a six-person team that redesigned a client website.',
};

const woodland = PROJECTS.find((p) => p.slug === 'woodland-agile-redesign')!;

export default function ProjectManagementPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
      <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl">
        Scrum and delivery
      </h1>
      <p className="prose-body mt-4 max-w-[58ch] text-xl">
        I was Scrum Master for DevHawks, a six-person student team, on a client website redesign: sprints in Jira, client communication, and a usability audit.
      </p>

      <section aria-labelledby="case" className="mt-14 border-t-2 border-ink pt-4">
        <h2 id="case" className="text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[1.75rem]">
          {STORIES[woodland.slug].headline}
        </h2>
        <p className="prose-body mt-3 max-w-[60ch] text-[1.0625rem]">{STORIES[woodland.slug].dek}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
          <Link href={`/projects/${woodland.slug}`} className="link">Read the case study</Link>
          {woodland.liveUrl && (
            <a href={woodland.liveUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
              See the live site <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </a>
          )}
        </p>
      </section>

      <section aria-labelledby="process" className="mt-16">
        <h2 id="process" className="mb-6 text-2xl font-extrabold tracking-[-0.015em] text-ink sm:text-3xl">How I run a sprint</h2>
        <Process kind="scrum" />
      </section>
    </div>
  );
}
