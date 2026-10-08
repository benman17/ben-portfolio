import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PROJECTS } from '@/data/projects';
import { STORIES } from '@/lib/stories';

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
          const story = STORIES[project.slug];
          return (
            <li key={project.slug} className="group relative border-b border-rule py-8 sm:py-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                <div className={story.cover ? 'md:col-span-7' : 'md:col-span-9'}>
                  <p className="text-sm font-semibold text-ink-3">
                    {project.title}
                    <span className="font-normal"> ({project.timeline})</span>
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[1.75rem]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]"
                    >
                      {story.headline}
                    </Link>
                  </h2>
                  <p className="prose-body mt-3 max-w-[60ch] text-[1.0625rem]">{story.dek}</p>
                  <p className="mt-4 text-sm text-ink-3">{project.technologies.slice(0, 5).join(', ')}</p>
                </div>
                {story.cover && (
                  <div className="md:col-span-5">
                    <div className="overflow-hidden border border-rule bg-white">
                      <Image
                        src={story.cover.src}
                        alt=""
                        width={story.cover.width}
                        height={story.cover.height}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.015]"
                      />
                    </div>
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
