import type { Project } from '../projects';
import type { Story } from '../../lib/stories';
import type { GitHubRepo } from '../../lib/github';

/*
 * Worst realistic content: what the next few projects Ben adds could look
 * like. Long titles, a missing cover, missing links, a single metric, an
 * empty results list, a long unbroken tool name and a long SQL line.
 */
export const WORST_PROJECTS: Project[] = [
  {
    slug: 'f2p-retention-queue-times',
    title: 'Player Retention and Matchmaking Queue-Time Analysis for a Free-to-Play Mobile Strategy Game',
    subtitle: 'BigQuery, dbt and Looker',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Product Data Analyst Intern, Live Operations Analytics',
    timeline: 'Summer 2026 to present',
    summary: 'Joined matchmaking logs to day-1, day-7 and day-30 retention cohorts in BigQuery to measure how much queue time players tolerate before they stop coming back, segmented by region, device tier and skill bracket.',
    technologies: ['BigQuery', 'SQL', 'dbt', 'dbt-snowflake-incremental-merge-strategy', 'Looker', 'LookML', 'Python', 'pandas', 'statsmodels', 'Amplitude', 'Airflow', 'Google Sheets'],
    metrics: [{ label: 'Matchmaking sessions analyzed', value: '1,284,903,117' }],
    problem: 'Queue times had grown in low-population regions, and nobody knew whether that was costing players.',
    dataApproach: ['Joined session_start, queue_enter and queue_exit events per player per day, deduplicating client retries that resent the same event_id up to 6 times.'],
    solution: 'A Looker explore and a weekly retention-by-queue-time report.',
    results: [],
    sqlSnippet: `SELECT player_id, DATE_TRUNC(event_ts, DAY) AS d, APPROX_QUANTILES(TIMESTAMP_DIFF(queue_exit_ts, queue_enter_ts, SECOND), 100)[OFFSET(95)] AS p95_queue_seconds_including_backfill_and_reconnect_attempts FROM analytics.fct_matchmaking_sessions_partitioned_by_day_clustered_by_region GROUP BY 1, 2`
  },
  {
    slug: 'churn',
    title: 'Churn',
    subtitle: '',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: false,
    role: 'Analyst',
    timeline: '2026',
    summary: 'Short.',
    technologies: ['SQL'],
    metrics: [],
    problem: 'Why do subscribers cancel?',
    dataApproach: ['Queried cancellations.'],
    solution: 'A list.',
    results: ['1 segment'],
  },
];

export const WORST_STORIES: Record<string, Story> = {
  'f2p-retention-queue-times': {
    headline: 'Players who waited more than 90 seconds for a match in their first session were far less likely to return the following week, across every region and device tier we measured.',
    dek: 'Matchmaking logs joined to retention cohorts in BigQuery, segmented by region, device tier and skill bracket, with client retries removed before counting sessions.',
  },
  // 'churn' deliberately has no story: a project added without one.
};

const repo = (r: Partial<GitHubRepo> & { name: string }): GitHubRepo => ({
  id: r.name.length * 7919 + (r.description?.length ?? 0),
  full_name: `benman17/${r.name}`,
  html_url: `https://github.com/benman17/${r.name}`,
  description: null,
  stargazers_count: 0,
  forks_count: 0,
  language: null,
  topics: [],
  updated_at: null,
  ...r,
});

export const WORST_REPOS: GitHubRepo[] = [
  repo({
    name: 'fantasy-football-value-over-replacement-kmeans-clustering-pipeline',
    description: 'End-to-end pipeline that pulls weekly player stats, computes custom PPR + IDP scoring, calculates positional Value Over Replacement against 12-team starter baselines, and clusters players into draft tiers with K-Means, validated with the elbow method, silhouette analysis and the gap statistic. Includes a Colab notebook and a bundled sample dataset so it runs without an API key.',
    language: 'Jupyter Notebook',
    stargazers_count: 1,
    updated_at: '2026-10-07T23:59:59Z',
  }),
  repo({ name: 'x', description: null, language: null, stargazers_count: 0 }),
  repo({ name: 'sql-practice', description: 'LeetCode and StrataScratch SQL solutions.', language: 'TSQL', stargazers_count: 1284, updated_at: '2024-01-02T00:00:00Z' }),
  repo({ name: 'benman17', description: 'Config files for my GitHub profile', language: null }),
];
