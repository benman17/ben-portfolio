import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PROJECTS } from '@/data/projects';
import { STORIES } from '@/lib/stories';
import { keepTogether } from '@/lib/typography';
import StoryFigure, { hasStoryFigure } from '@/components/story/StoryFigure';

export const metadata: Metadata = {
  title: 'Work | Ben Manguiat',
  description: 'Case studies in SQL, Snowflake, Power BI and Python, plus Scrum delivery on a client project.',
};

const work = PROJECTS.filter((p) => !p.colophon);

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8 sm:pt-14">
      <h1 className="text-4xl font-extrabold tracking-[-0.025em] text-ink sm:text-5xl">Work</h1>
      <p className="prose-body mt-4 max-w-[52ch] text-xl">
        Four projects, each led by what it found. Every case study links to the source.
      </p>

      <ol className="mt-12 border-t-2 border-ink">
        {work.map((project) => {
          const story = STORIES[project.slug] ?? { headline: project.title, dek: project.summary };
          return (
            <li key={project.slug} className="group relative border-b border-rule py-8 sm:py-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                <div className={hasStoryFigure(project.slug) ? 'md:col-span-7' : 'md:col-span-9'}>
                  <h2 className="text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[1.75rem]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]"
                    >
                      {story.headline}
                    </Link>
                  </h2>
                  <p className="prose-body mt-3 max-w-[60ch] text-[1.0625rem]">{keepTogether(story.dek)}</p>
                  <p className="mt-4 text-sm text-ink-3">
                    <span className="font-semibold text-ink-2">{project.title}</span>, {project.timeline}. {project.technologies.slice(0, 5).join(', ')}
                  </p>
                </div>
                {hasStoryFigure(project.slug) && (
                  <div className="md:col-span-5 md:pt-1">
                    <StoryFigure slug={project.slug} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 text-[0.9375rem] text-ink-3">
        Also: <Link href="/projects/ben-portfolio-app" className="link font-semibold">how this site is built</Link>, and{' '}
        <Link href="/github" className="link font-semibold">all public repositories</Link>.
      </p>
    </div>
  );
}
