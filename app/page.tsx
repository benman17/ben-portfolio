import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import LevelChart from '@/components/story/LevelChart';
import StoryFigure from '@/components/story/StoryFigure';
import CopyEmail from '@/components/CopyEmail';
import SplitText from '@/components/reactbits/SplitText';
import AnimatedContent from '@/components/reactbits/AnimatedContent';
import CountUp from '@/components/reactbits/CountUp';
import Magnet from '@/components/reactbits/Magnet';
import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import { PROJECTS } from '@/data/projects';
import { PROFILE_INFO } from '@/data/skills';
import { STORIES } from '@/lib/stories';

const lead = STORIES['tft-snowflake'];
const more = ['northstar-commerce', 'nfl-clustering'].flatMap((slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  return project ? [{ project, story: STORIES[slug] ?? { headline: project.title, dek: project.summary } }] : [];
});
const woodland = PROJECTS.find((p) => p.slug === 'woodland-agile-redesign')!;

// Every figure here is copied from lib/stories.ts / data/projects.ts.
const NUMBERS = [
  { value: 399906, label: 'ranked TFT boards queried in Snowflake', href: '/projects/tft-snowflake' },
  { value: 63635, label: 'order items modeled in a PostgreSQL star schema', href: '/projects/northstar-commerce' },
  { value: 163, label: 'NFL players split into draft tiers with K-Means', href: '/projects/nfl-clustering' },
  { value: 6, label: 'people on the Scrum team I ran for a client redesign', href: '/projects/woodland-agile-redesign' },
];

// Tools used in the projects above (data/projects.ts technologies).
const TOOLS = ['SQL', 'Snowflake', 'PostgreSQL', 'Power BI', 'DAX', 'Python', 'pandas', 'scikit-learn', 'K-Means', 'Star schemas', 'Jira', 'Scrum'];

export default function Home() {
  return (
    <>
      {/* Lead story: the finding is the headline */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-8 sm:pt-16 lg:pb-28">
        <SplitText
          tag="h1"
          immediate
          text={lead.headline}
          className="max-w-[20ch] text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.75rem]"
        />

        <div className="mt-10 grid grid-cols-1 gap-12 border-t border-rule pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="prose-body max-w-[40ch] text-xl sm:text-[1.375rem] sm:leading-snug">
              {lead.dek}
            </p>

            <Magnet className="mt-8">
              <Link
                href="/projects/tft-snowflake"
                className="group inline-flex min-h-12 items-center gap-2.5 bg-ink px-5 text-[0.9375rem] font-bold text-paper transition-transform duration-150 ease-out-expo active:scale-[0.98]"
              >
                Read the analysis
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
              </Link>
            </Magnet>

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

          <div className="lg:col-span-7 lg:pl-6">
            <LevelChart />
          </div>
        </div>
      </section>

      {/* The numbers behind the work: an inverted band, so the page has one change of key */}
      <section aria-labelledby="numbers-heading" className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <h2 id="numbers-heading" className="border-t-2 border-paper pt-3 text-xl font-extrabold tracking-[-0.01em]">
            The data behind the work
          </h2>
          <AnimatedContent as="div" stagger={0.08} className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <Link key={n.href} href={n.href} className="group block border-t border-paper/25 pt-4">
                <CountUp to={n.value} className="tnum block text-5xl font-extrabold leading-none tracking-[-0.03em] lg:text-[3.5rem]" />
                <span className="mt-3 block max-w-[26ch] text-[0.9375rem] leading-snug text-paper/75 group-hover:text-paper group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[0.2em]">
                  {n.label}
                </span>
              </Link>
            ))}
          </AnimatedContent>
        </div>
        <ScrollVelocity
          items={TOOLS}
          label="Tools used in these projects"
          className="border-t border-paper/15 py-6 text-4xl font-extrabold tracking-[-0.03em] text-paper sm:py-8 sm:text-6xl lg:text-7xl"
        />
      </section>

      {/* More analyses */}
      <section aria-labelledby="more-heading" className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
        <h2 id="more-heading" className="border-t-2 border-ink pt-3 text-xl font-extrabold tracking-[-0.01em] text-ink">
          More analyses
        </h2>

        <AnimatedContent stagger={0.12} className="mt-8 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
          {more.map(({ project, story }) => (
            <article key={project.slug} className="group relative flex flex-col">
              <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:decoration-accent group-hover:underline-offset-[0.18em]">
                  {story.headline}
                </Link>
              </h3>
              <p className="prose-body mt-3 text-[1.0625rem]">{story.dek}</p>
              <p className="mt-4 text-sm text-ink-3">
                {project.technologies.slice(0, 4).join(', ')}
              </p>
              <div className="mt-6 border-t border-rule pt-4">
                <StoryFigure slug={project.slug} />
              </div>
            </article>
          ))}
        </AnimatedContent>
      </section>

      {/* Delivery */}
      <section aria-labelledby="delivery-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 lg:pb-28">
        <AnimatedContent className="grid grid-cols-1 gap-6 border-t-2 border-ink pt-6 lg:grid-cols-12 lg:gap-14">
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
        </AnimatedContent>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-wash">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 lg:py-28">
          <SplitText
            tag="h2"
            id="contact-heading"
            text="Hiring a data, BI or product analyst?"
            className="max-w-[16ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl"
          />
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
