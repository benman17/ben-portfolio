/**
 * How each project is introduced on the home page and the work index: the
 * finding first, then what it was built with. Every number here is copied
 * from data/projects.ts or the project's widget data; do not add new ones.
 */
import { FIXTURE } from '../data/fixtures';
import { WORST_STORIES } from '../data/fixtures/worst';

export interface Story {
  headline: string;
  dek: string;
  cover?: { src: string; alt: string; width: number; height: number };
  /** Language of the project's code excerpt, shown above the block. */
  codeLabel?: string;
}

const REAL_STORIES: Record<string, Story> = {
  'tft-snowflake': {
    headline: 'Reaching level\u00a09 in ranked TFT meant a top\u20114 finish 87% of the time.',
    dek: 'I loaded 399,906 ranked boards into Snowflake to see what separates top\u20114 finishes.',
    cover: {
      src: '/images/projects/tft_snowflake/dashboard.png',
      alt: 'Power BI dashboard for the TFT analysis: KPIs, placement by rank tier and trait top-4 rates.',
      width: 1171,
      height: 658,
    },
    codeLabel: 'SQL (Snowflake)',
  },
  'northstar-commerce': {
    headline: 'Electronics was losing margin to discounts and returns.',
    dek: 'A PostgreSQL star schema and Power BI dashboard over 63,635 order items found 7.62% average discounting and a 7.26% return rate in Electronics.',
    cover: {
      src: '/images/projects/northstar_commerce/executive_overview.png',
      alt: 'Northstar Commerce executive overview dashboard in Power BI.',
      width: 1313,
      height: 741,
    },
    codeLabel: 'SQL (PostgreSQL)',
  },
  'nfl-clustering': {
    headline: 'Only 22 of 163 NFL players earned an elite fantasy tier.',
    dek: 'I scored players on Value Over Replacement so every position shares one scale, then used K-Means to split them into four draft tiers: 22 elite, 36 high-end starters, 73 average, 32 below replacement.',
    cover: {
      src: '/images/projects/nfl_clustering/players_per_tier_bar.png',
      alt: 'Bar chart of players per fantasy tier: 73 average, 36 high-end starters, 32 below replacement, 22 elite.',
      width: 2700,
      height: 1350,
    },
    codeLabel: 'Python (scikit-learn)',
  },
  'woodland-agile-redesign': {
    headline: 'Scrum Master for a six-person team that shipped a client’s site redesign.',
    dek: 'Ran sprints in Jira, handled client communication, and led a usability audit of the service pages for Woodland Country Manor.',
  },
  'ben-portfolio-app': {
    headline: 'How this site is built.',
    dek: 'Next.js 16, TypeScript, Tailwind CSS and Recharts, with every chart drawn from the projects’ own data.',
    codeLabel: 'TypeScript (Next.js)',
  },
};

export const STORIES: Record<string, Story> =
  FIXTURE === 'worst' ? { ...REAL_STORIES, ...WORST_STORIES } : REAL_STORIES;
