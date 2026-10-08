/**
 * Dev-only data fixtures for stress-testing layouts (break-ui).
 * Set NEXT_PUBLIC_PORTFOLIO_FIXTURE=worst (or github-empty) when running
 * `next dev`. Production builds always use the real data.
 */
export type Fixture = 'worst' | 'github-empty' | undefined;

export const FIXTURE: Fixture =
  process.env.NODE_ENV !== 'production'
    ? (process.env.NEXT_PUBLIC_PORTFOLIO_FIXTURE as Fixture)
    : undefined;
