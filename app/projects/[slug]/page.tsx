import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { STORIES } from '@/lib/stories';
import { keepTogether } from '@/lib/typography';
import { GithubIcon } from '@/components/icons/SocialIcons';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import NflClusterWidget from '@/components/NflClusterWidget';
import NorthstarDashboardWidget from '@/components/NorthstarDashboardWidget';
import TftSnowflakeWidget from '@/components/TftSnowflakeWidget';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Ben Manguiat`,
    description: STORIES[slug]?.headline ?? project.summary,
  };
}

const WIDGETS: Record<string, React.ComponentType> = {
  'tft-snowflake': TftSnowflakeWidget,
  'northstar-commerce': NorthstarDashboardWidget,
  'nfl-clustering': NflClusterWidget,
  'ben-portfolio-app': AnalyticsSandbox,
};

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">
      {children}
    </h2>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const story = STORIES[project.slug];
  const Widget = WIDGETS[project.slug];
  const work = PROJECTS.filter((p) => !p.colophon);
  const index = work.findIndex((p) => p.slug === project.slug);
  const next = index >= 0 ? work[(index + 1) % work.length] : work[0];

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-8 sm:pt-12">
      <Link href="/projects" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-ink-3 hover:text-ink">
        <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
        All work
      </Link>

      {/* Headline block */}
      <header className="mt-6 max-w-4xl">
        <p className="text-sm font-semibold text-ink-3">{project.title}</p>
        <h1 className="mt-3 text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl">
          {story?.headline ?? project.title}
        </h1>
        <p className="prose-body mt-5 max-w-[62ch] text-xl">{keepTogether(project.summary)}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-rule pt-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-ink-3">Role</dt>
            <dd className="mt-0.5 font-semibold text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="text-ink-3">When</dt>
            <dd className="mt-0.5 font-semibold text-ink">{project.timeline}</dd>
          </div>
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <dt className="text-ink-3">{m.label}</dt>
              <dd className="tnum mt-0.5 font-semibold text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>

        {(project.githubUrl || project.liveUrl) && (
          <p className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-ink px-4 text-sm font-bold text-paper transition-transform duration-150 ease-out-expo active:scale-[0.98]"
              >
                <GithubIcon className="h-4 w-4" />
                Source code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-ink px-4 text-sm font-bold text-ink transition-transform duration-150 ease-out-expo active:scale-[0.98]"
              >
                Live site
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </a>
            )}
          </p>
        )}
      </header>

      {/* Findings first */}
      {project.results.length > 0 && (
      <section aria-labelledby="findings" className="mt-14">
        <SectionHeading id="findings">{project.category === 'project-management' ? 'What I did' : 'What I found'}</SectionHeading>
        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
          {project.results.map((res) => (
            <li key={res} className="prose-body border-l border-rule pl-4 text-[1.0625rem] text-ink">
              {keepTogether(res)}
            </li>
          ))}
        </ul>
      </section>
      )}

      {Widget && (
        <section aria-label="Interactive view of the data" className="mt-14">
          <Widget />
        </section>
      )}

      <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          <section aria-labelledby="question">
            <SectionHeading id="question">The question</SectionHeading>
            <p className="prose-body mt-4 max-w-[65ch]">{keepTogether(project.problem)}</p>
          </section>

          <section aria-labelledby="approach">
            <SectionHeading id="approach">How I built it</SectionHeading>
            <ol className="prose-body mt-4 max-w-[65ch] list-decimal space-y-3 pl-6 marker:font-sans marker:text-sm marker:font-bold marker:text-ink-3">
              {project.dataApproach.map((step) => (
                <li key={step} className="pl-1">{keepTogether(step)}</li>
              ))}
            </ol>
          </section>

          {project.sqlSnippet && (
            <section aria-labelledby="code">
              <SectionHeading id="code">The code</SectionHeading>
              <p className="mt-4 text-sm font-semibold text-ink-3">{story?.codeLabel ?? 'Excerpt'}</p>
              <pre className="tnum mt-2 overflow-x-auto border border-rule bg-code p-4 font-mono text-[0.8125rem] leading-relaxed text-ink sm:p-5">
                <code>{project.sqlSnippet}</code>
              </pre>
            </section>
          )}

          <section aria-labelledby="delivered">
            <SectionHeading id="delivered">What I delivered</SectionHeading>
            <p className="prose-body mt-4 max-w-[65ch]">{keepTogether(project.solution)}</p>
          </section>
        </div>

        <aside className="space-y-10 lg:col-span-4">
          <div>
            <h2 className="border-t border-rule pt-3 text-sm font-bold text-ink">Tools</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{project.technologies.join(', ')}</p>
          </div>

          {project.scrumDetails && (
            <div>
              <h2 className="border-t border-rule pt-3 text-sm font-bold text-ink">Team setup</h2>
              <dl className="mt-2 space-y-2 text-[0.9375rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Sprint length</dt>
                  <dd className="font-semibold text-ink">{project.scrumDetails.sprintDuration}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Team</dt>
                  <dd className="font-semibold text-ink">{project.scrumDetails.teamSize}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Artifacts</dt>
                  <dd className="text-right font-semibold text-ink">{project.scrumDetails.keyArtifacts.join(', ')}</dd>
                </div>
              </dl>
            </div>
          )}
        </aside>
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next case study" className="mt-20 border-t-2 border-ink pt-4">
          <Link href={`/projects/${next.slug}`} className="group block">
            <span className="text-sm font-semibold text-ink-3">Next case study</span>
            <span className="mt-1 block max-w-4xl text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[1.75rem]">
              <span className="group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]">
                {STORIES[next.slug]?.headline ?? next.title}
              </span>
              <ArrowRight className="ml-2 inline h-6 w-6 -translate-y-px align-middle transition-transform duration-200 ease-out-expo group-hover:translate-x-1" strokeWidth={2} aria-hidden />
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
