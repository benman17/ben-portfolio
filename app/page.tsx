import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import LevelChart from '@/components/story/LevelChart';
import CopyEmail from '@/components/CopyEmail';
import { PROJECTS } from '@/data/projects';
import { PROFILE_INFO } from '@/data/skills';
import { STORIES } from '@/lib/stories';

const lead = STORIES['tft-snowflake'];
const more = ['northstar-commerce', 'nfl-clustering'].flatMap((slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return project ? [{ project, story: STORIES[slug] ?? { headline: project.title, dek: project.summary } }] : [];
});
const woodland = PROJECTS.find((p) => p.slug === 'woodland-agile-redesign')!;

export default function Home() {
  return (
    <>
      {/* Lead story: the finding is the headline */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8 sm:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h1 className="text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.375rem]">
              {lead.headline}
            </h1>
            <p className="prose-body mt-5 max-w-[40ch] text-xl sm:text-[1.375rem] sm:leading-snug">
              {lead.dek}
            </p>

            <Link
              href="/projects/tft-snowflake"
              className="group mt-8 inline-flex min-h-12 items-center gap-2.5 bg-ink px-5 text-[0.9375rem] font-bold text-paper transition-transform duration-150 ease-out-expo active:scale-[0.98]"
            >
              Read the analysis
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
            </Link>

            <div className="mt-10 max-w-xl border-t border-rule pt-4 text-[0.9375rem]">
              <p>
                <span className="font-bold text-ink">By Ben Manguiat.</span>{' '}
                <span className="text-ink-2">Data analyst looking for product, BI and data analyst roles. B.S. Information Systems, Miami University, 2026.</span>
              </p>
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                <a href={`mailto:${PROFILE_INFO.email}`} className="text-accent underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
                  Email me
                </a>
                <a href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn
                </a>
                <a href={`https://github.com/${PROFILE_INFO.githubUsername}`} target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <LevelChart />
          </div>
        </div>
      </section>

      {/* More analyses */}
      <section aria-labelledby="more-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 lg:pb-28">
        <h2 id="more-heading" className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">
          More analyses
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
          {more.map(({ project, story }) => (
            <article key={project.slug} className="group relative flex flex-col">
              {story.cover && (
                <div className="overflow-hidden border border-rule bg-white">
                  <Image
                    src={story.cover.src}
                    alt={story.cover.alt}
                    width={story.cover.width}
                    height={story.cover.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-300 ease-out-expo group-hover:scale-[1.012]"
                  />
                </div>
              )}
              <h3 className="mt-5 text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]">
                  {story.headline}
                </Link>
              </h3>
              <p className="prose-body mt-3 text-[1.0625rem]">{story.dek}</p>
              <p className="mt-4 text-sm text-ink-3">
                {project.technologies.slice(0, 4).join(', ')}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Delivery */}
      <section aria-labelledby="delivery-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 lg:pb-28">
        <div className="grid grid-cols-1 gap-6 border-t-2 border-ink pt-6 lg:grid-cols-12 lg:gap-14">
          <h2 id="delivery-heading" className="text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.125rem] lg:col-span-7">
            {STORIES[woodland.slug].headline}
          </h2>
          <div className="lg:col-span-5">
            <p className="prose-body text-[1.0625rem]">{STORIES[woodland.slug].dek}</p>
            <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-rule pt-4 text-sm">
              <div>
                <dt className="text-ink-3">Team</dt>
                <dd className="tnum mt-0.5 font-semibold text-ink">6 people</dd>
              </div>
              <div>
                <dt className="text-ink-3">Sprints</dt>
                <dd className="mt-0.5 font-semibold text-ink">2 weeks</dd>
              </div>
              <div>
                <dt className="text-ink-3">Tools</dt>
                <dd className="mt-0.5 font-semibold text-ink">Jira, Wix Studio</dd>
              </div>
            </dl>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
              <Link href={`/projects/${woodland.slug}`} className="link">
                Read the case study
              </Link>
              {woodland.liveUrl && (
                <a href={woodland.liveUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                  See the live site <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </a>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-wash">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-20">
          <h2 id="contact-heading" className="max-w-[20ch] text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl">
            Hiring a data, BI or product analyst?
          </h2>
          <p className="prose-body mt-4 max-w-[48ch]">Email is the quickest way to reach me.</p>
          <div className="mt-6">
            <CopyEmail size="lg" />
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
            <a href={PROFILE_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
            </a>
            <a href={`https://github.com/${PROFILE_INFO.githubUsername}`} target="_blank" rel="noopener noreferrer" className="link">
              GitHub
            </a>
            <Link href="/projects" className="link">
              All work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
