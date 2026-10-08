# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers filling **product analyst, BI analyst, and data analyst** roles. They arrive from a resume, LinkedIn, or an application link, skim for a minute or two, and decide whether to reach out. Their job on the site: confirm that Ben can actually do the work (SQL, Snowflake, BI dashboards, Python analysis) and find the proof fast.

Dream role: **game data analyst**. Gaming-adjacent work (the TFT ranked-match analysis in Snowflake) is the strongest signal for that audience and should be easy to find.

Secondary: technical interviewers who open repos and case studies to check depth. They are served by the same evidence, one click deeper.

## Product Purpose

A personal portfolio for Ben Manguiat (B.S. Information Systems, Miami University, 2026) that gets him interviews. Success means a recruiter can, within the first screen or two, see what roles he fits, see real SQL/Snowflake and BI work, and contact him by email or LinkedIn.

## Positioning

Not a resume restated: the site shows working analysis from real datasets (Snowflake SQL over ~400K TFT boards, a PostgreSQL star-schema pipeline with Power BI, K-Means tiering of NFL players) with links to the repos behind them. Analytics depth plus Scrum/business-analysis delivery experience is the combination to convey, with data/BI/product analytics leading.

## Operating Context

- Visitors usually come from a job application, resume link, or LinkedIn; many skim on a laptop between other candidates, some on a phone.
- Proof lives in GitHub repos under `benman17` and in project case studies at `/projects/[slug]`.
- Contact is email and LinkedIn; there is a contact modal.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Recharts, framer-motion, lucide-react. Deployed as a standard Next.js app. Read `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md).
- Routes: `/` (home), `/projects`, `/projects/[slug]`, `/analytics`, `/project-management`, `/github`, `/about`.
- Content source of truth: `data/projects.ts` (projects, case studies, methodology) and `data/skills.ts` (skills, profile, links). GitHub data via `lib/github.ts`.
- Interactive widgets exist per project (TFT Snowflake, Northstar dashboard, NFL clusters, Scrum board, analytics sandbox, methodology).
- Speed matters: the site must stay fast and skimmable; nothing should slow down a recruiter getting to the projects.
- Content (projects, bio, links) is not changed without asking Ben.

## Brand Commitments

- Name: Ben Manguiat. GitHub: `benman17`. LinkedIn and site email as recorded in `data/skills.ts`.
- Voice: direct and factual; describes what was built and what the data showed.

## Evidence on Hand

Real projects (all in `data/projects.ts`):
- **TFT Ranked Match Analysis in Snowflake**: ~400K boards, 49,977 matches, Platinum–Challenger; Snowflake SQL (LATERAL FLATTEN over VARIANT trait data) and a Power BI dashboard. Repo `benman17/tft-snowflake`. Image: `public/images/projects/tft_snowflake/dashboard.png`.
- **Northstar Commerce**: PostgreSQL pipeline, star schema, Power BI executive dashboard; $5.94M revenue / $2.29M profit across 63k+ orders. Repo `benman17/northstar-commerce`. Images in `public/images/projects/northstar_commerce/`.
- **NFL Player Clustering**: K-Means fantasy tiers with VOR, validated by Elbow, Silhouette and Gap statistic (k=4). Repo `benman17/NFL-Clustering`. Images in `public/images/projects/nfl_clustering/`.
- **Woodland Country Manor redesign**: Scrum Master for DevHawks, a 6-person student team, Wix Studio, Jira sprints, usability audit. Live site linked.
- **This portfolio**: repo `benman17/ben-portfolio`.

Absent and must not be fabricated: testimonials, employer logos, work-experience metrics, client quotes.

## Product Principles

1. **Proof over claims.** Every number or claim traces to a real project, repo, or credential. No invented metrics, testimonials, or self-rated skill percentages. Demo or illustrative figures inside widgets must be labeled or replaced with real project data.
2. **Fast to the evidence.** A recruiter reaches SQL/Snowflake work and the project list within seconds; no gating, intros, or motion that delays skimming.
3. **Lead with data, BI, and product analytics.** Scrum/PM and systems analysis support the story; they don't compete with it for first position.
4. **Gaming signal is a feature.** Game-data work is surfaced deliberately, since game data analyst is the target role.
5. **Content is Ben's.** Projects, bio, and links change only with his approval.

## Accessibility & Inclusion

No product-specific requirement established beyond WCAG 2.1 AA as a baseline; the site must work on phones and with keyboard navigation.
