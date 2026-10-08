import React from 'react';
import BarList from './BarList';

/*
 * House-drawn summary figure for each project, used on the home page and the
 * work index. Every number is copied from data/projects.ts or the project's
 * widget data. The original screenshots stay on the case-study pages.
 */
const FIGURES: Record<string, { node: React.ReactNode; source: string }> = {
  'tft-snowflake': {
    node: (
      <BarList
        still
        caption="Top-4 rate by player level"
        valueHeader="Top-4 rate"
        max={100}
        reference={{ value: 50, label: 'Half of all boards finish top four' }}
        rows={[
          { label: 'Level 7', value: 26.9, display: '26.9%' },
          { label: 'Level 8', value: 51.3, display: '51.3%' },
          { label: 'Level 9', value: 86.6, display: '86.6%', highlight: true },
        ]}
      />
    ),
    source: 'Source: 399,906 boards from 49,977 ranked matches, queried in Snowflake.',
  },
  'northstar-commerce': {
    node: (
      <BarList
        still
        caption="Return rate by product group"
        valueHeader="Return rate"
        max={10}
        rows={[
          { label: 'Electronics', value: 7.26, display: '7.26%', sub: '7.62% average discount', highlight: true },
          { label: 'Accessories', value: 5.55, display: '5.55%', sub: '44.21% gross margin' },
        ]}
      />
    ),
    source: 'Source: 63,635 order items, $5.94M net revenue, modeled in PostgreSQL.',
  },
  'nfl-clustering': {
    node: (
      <BarList
        still
        caption="Players per fantasy draft tier"
        valueHeader="Players"
        max={80}
        rows={[
          { label: 'Elite', value: 22, display: '22', highlight: true },
          { label: 'High-end starters', value: 36, display: '36' },
          { label: 'Average', value: 73, display: '73' },
          { label: 'Below replacement', value: 32, display: '32' },
        ]}
      />
    ),
    source: "Source: 163 players in the repo's 2024 sample dataset, K-Means with k=4 on Value Over Replacement.",
  },
};

export const hasStoryFigure = (slug: string) => slug in FIGURES;

export default function StoryFigure({ slug }: { slug: string }) {
  const fig = FIGURES[slug];
  if (!fig) return null;
  return (
    <div>
      {fig.node}
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-3">{fig.source}</p>
    </div>
  );
}
