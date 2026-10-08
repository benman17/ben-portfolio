import { FIXTURE } from './fixtures';
import { WORST_PROJECTS } from './fixtures/worst';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: 'analytics' | 'project-management' | 'systems';
  categoryLabel: string;
  featured: boolean;
  /** Shown as a footer link ('About this site'), not in the project list. */
  colophon?: boolean;
  role: string;
  timeline: string;
  summary: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: { label: string; value: string; trend?: string }[];
  problem: string;
  dataApproach: string[];
  solution: string;
  results: string[];
  sqlSnippet?: string;
  scrumDetails?: {
    sprintDuration: string;
    teamSize: string;
    velocity: string;
    keyArtifacts: string[];
  };
}

const REAL_PROJECTS: Project[] = [
  {
    slug: 'tft-snowflake',
    title: 'TFT Ranked Match Analysis in Snowflake',
    subtitle: 'Snowflake SQL Pipeline & Power BI Dashboard',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Data Analyst (Solo Project)',
    timeline: 'Fall 2025',
    summary: 'Loaded ~400K ranked Teamfight Tactics player boards (49,977 matches, Platinum to Challenger) into Snowflake, unpacked nested trait data with SQL, and built a Power BI dashboard on what separates top-4 finishes.',
    technologies: ['Snowflake', 'SQL', 'VARIANT / FLATTEN', 'Power BI', 'Data Cleaning'],
    githubUrl: 'https://github.com/benman17/tft-snowflake',
    metrics: [
      { label: 'Matches', value: '49,977' },
      { label: 'Player Boards', value: '399,906' },
      { label: 'Rank Tiers', value: 'Platinum to Challenger' }
    ],
    problem: 'Ranked TFT match exports store each board\'s traits and champions as nested text, one CSV per rank tier. That makes it hard to answer basic questions like which traits and levels actually lead to top-4 finishes.',
    dataApproach: [
      'Staged 5 rank-tier CSVs (Set 3, Korean server) in Snowflake with a custom CSV file format.',
      'Loaded each tier with COPY INTO, tagging rows by rank and parsing nested trait/champion text into VARIANT columns.',
      'Removed duplicate rows and rows with invalid placements before analysis.',
      'Used LATERAL FLATTEN to unpack traits and aggregate placement and top-4 rate per trait and per player level.',
      'Connected Power BI directly to Snowflake for KPI, rank-tier and trait-effectiveness views.'
    ],
    solution: 'A reproducible Snowflake load (scripts run in order) feeding a Power BI dashboard on placement, rank tier and trait effectiveness.',
    results: [
      'Reaching level 9 was the strongest signal found: 86.6% top-4 rate vs 51.3% at level 8.',
      'Starship (69.0% top-4) and Mercenary (60.6%) boards placed best; Vanguard (48.1%) and Sorcerer (49.2%) placed worst among common traits.',
      'Flagged that trait results are confounded with level: high-cost traits mostly appear on boards that were already ahead.'
    ],
    sqlSnippet: `-- Top-4 rate and average placement per trait
SELECT
  REPLACE(t.key, 'Set3_', '')                         AS trait,
  COUNT(*)                                            AS boards,
  ROUND(AVG(m.placement), 2)                          AS avg_placement,
  ROUND(AVG(IFF(m.placement <= 4, 1, 0)) * 100, 1)    AS top_4_rate_pct
FROM matches m,
     LATERAL FLATTEN(input => m.traits) t
WHERE m.placement BETWEEN 1 AND 8
GROUP BY 1
HAVING COUNT(*) >= 5000
ORDER BY avg_placement;`
  },
  {
    slug: 'northstar-commerce',
    title: 'Northstar Commerce Executive BI Dashboard & Data Pipeline',
    subtitle: 'PostgreSQL Data Pipeline, Star Schema Dimensional Modeling & Power BI',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Lead BI & Data Analyst',
    timeline: '1 Month',
    summary: 'Engineered an end-to-end PostgreSQL data analytics pipeline and interactive Power BI Executive Command Center to diagnose margin decay ($5.94M revenue, $2.29M profit) across 63k+ order transactions.',
    technologies: ['PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Data Modeling', 'Star Schema', 'ETL Pipelines', 'Data Quality Audit'],
    githubUrl: 'https://github.com/benman17/northstar-commerce',
    metrics: [
      { label: 'Net Revenue', value: '$5.94M' },
      { label: 'Gross Profit Margin', value: '38.6%' },
      { label: 'Order Items Analyzed', value: '63,635' }
    ],
    problem: 'Northstar Commerce scaled to $5.94M in net revenue across 63,635 order items, but leadership lacked visibility into profit margin compression in top categories, data quality anomalies (duplicates, missing categories), and high return rates.',
    dataApproach: [
      'Loaded 7 raw staging tables into PostgreSQL database and executed comprehensive SQL data quality diagnostics.',
      'Engineered an automated SQL ETL pipeline (ROW_NUMBER window function deduplication, COALESCE missing metadata imputations, CASE channel standardization).',
      'Designed a production Star Schema relational model connecting Fact tables (order_items, returns, targets) to Dimension tables (customers, products, orders).',
      'Created production analytical views (vw_order_details, vw_monthly_performance) and built interactive DAX measures in Power BI Desktop.'
    ],
    solution: 'Constructed an executive-facing Power BI Command Center highlighting category profit margins, monthly target vs. actual variance, return rate leakage, and strategic pricing action items.',
    results: [
      'Uncovered Electronics margin compression driven by 7.62% average discounting and 7.26% return rate.',
      'Identified $231k drag from Unassigned inventory categories performing at 22.28% margin vs 38.57% baseline.',
      'Highlighted Accessories as the highest margin expansion opportunity at 44.21% gross margin.'
    ],
    sqlSnippet: `-- Executive Sales & Profit Margin View (PostgreSQL)
CREATE VIEW analytics.vw_order_details AS
SELECT 
    oi.order_item_id,
    o.order_id,
    o.order_date,
    c.customer_id,
    c.customer_name,
    c.segment AS customer_segment,
    COALESCE(c.region, 'Unknown') AS customer_region,
    o.channel AS sales_channel,
    p.product_id,
    p.product_name,
    p.category AS product_category,
    oi.quantity,
    oi.net_revenue,
    ROUND((oi.quantity * p.unit_cost), 2) AS total_cost,
    ROUND(oi.net_revenue - (oi.quantity * p.unit_cost), 2) AS gross_profit,
    ROUND(((oi.net_revenue - (oi.quantity * p.unit_cost)) / oi.net_revenue) * 100, 2) AS gross_margin_pct
FROM analytics.fact_order_items oi
JOIN analytics.dim_orders o ON oi.order_id = o.order_id
JOIN analytics.dim_customers c ON o.customer_id = c.customer_id
JOIN analytics.dim_products p ON oi.product_id = p.product_id;`
  },
  {
    slug: 'nfl-clustering',
    title: 'NFL Player Clustering & Fantasy Tier Analytics',
    subtitle: 'K-Means Machine Learning & VOR Modeling | Python & Scikit-Learn',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Data Analyst (Solo Project)',
    timeline: 'Spring 2025',
    summary: 'Unsupervised machine learning pipeline that clusters NFL players into actionable fantasy performance tiers using custom PPR+IDP scoring, Value Over Replacement (VOR), and K-Means, with the tier count checked against three validation methods.',
    technologies: ['Python', 'Scikit-Learn', 'K-Means', 'Pandas', 'Value Over Replacement (VOR)', 'Matplotlib', 'Seaborn', 'CLI Pipeline'],
    githubUrl: 'https://github.com/benman17/NFL-Clustering',
    metrics: [
      { label: 'Validation Methods', value: 'Elbow, Silhouette, Gap' },
      { label: 'Clustering Model', value: 'K-Means (k=4, silhouette 0.57)' },
      { label: 'Core Metric', value: 'VOR (Value Over Replacement)' }
    ],
    problem: 'Evaluating NFL player fantasy draft value using raw stats leads to recency bias. Traditional position labels ignore historical performance clusters, positional scarcity, and replacement baselines.',
    dataApproach: [
      'Ingested multi-category 2024 NFL player performance statistics via SportsData.io API and local cached datasets.',
      'Standardized positions (mapping FB->RB, OLB/ILB->LB, secondary roles) and formulated custom PPR + IDP scoring weights.',
      'Calculated positional Value Over Replacement (VOR) baselines based on standard 12-team roster starter demand.',
      'Compared tier counts from k=2 to 10 with the elbow method, silhouette analysis and the gap statistic.',
      'Trained K-Means model, sorted clusters by descending average VOR, and mapped actionable fantasy draft tiers.'
    ],
    solution: 'Built a modular data science repository with an end-to-end CLI pipeline and reproducible Google Colab notebook that partitions NFL players into 4 empirical draft tiers.',
    results: [
      'Ranked players across positions on one scale by comparing each to a replacement-level starter (VOR), instead of raw points.',
      'Split players into 4 draft tiers. The validation methods did not agree on one k (silhouette peaked at k=2 with 0.69); k=4 was chosen to give usable draft tiers, with a silhouette of 0.57.',
      'Packaged as a CLI pipeline + Colab notebook with a bundled sample dataset so it runs without an API key.'
    ],
    sqlSnippet: `# K-Means Clustering on Value Over Replacement (VOR)
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Isolate feature vector (Value Over Replacement)
X = df_selected_players[['VOR']].values

# 2. Fit K-Means clustering model (k=4)
kmeans = KMeans(n_clusters=4, random_state=418, n_init=10)
df_selected_players['Cluster'] = kmeans.fit_predict(X)

# 3. Sort & rank clusters by descending mean VOR into actionable tiers
cluster_summary = df_selected_players.groupby('Cluster')['VOR'].mean().sort_values(ascending=False)
tier_map = {old: new for new, old in enumerate(cluster_summary.index)}
df_selected_players['Tier'] = df_selected_players['Cluster'].map(tier_map)

# 4. Map readable tier labels
tier_labels = ["Tier 1 — Elite", "Tier 2 — High-End Starters", "Tier 3 — Average", "Tier 4 — Sub-Replacement"]
df_selected_players['TierLabel'] = df_selected_players['Tier'].map(lambda x: tier_labels[x])`
  },
  {
    slug: 'woodland-agile-redesign',
    title: 'Woodland Manor Agile Web Redesign & Systems Overhaul',
    subtitle: 'Scrum Master & Business Analyst Project Management Delivery',
    category: 'project-management',
    categoryLabel: 'Project Management & Scrum',
    featured: true,
    role: 'Scrum Master & Website Development Consultant',
    timeline: 'Jan to May 2026',
    summary: 'Scrum Master for DevHawks, a 6-person student team that redesigned Woodland Country Manor’s website in Wix Studio. Ran sprints in Jira, handled client communication, and led a usability audit of the service pages.',
    technologies: ['Agile / Scrum', 'Jira', 'Wix Studio', 'Backlog Prioritization', 'User Stories', 'Usability Audit'],
    liveUrl: 'https://manguibo.wixstudio.com/woodlandcountrymanor',
    metrics: [
      { label: 'Team Size', value: '6' },
      { label: 'Pages Audited', value: '5+' },
      { label: 'Stack', value: 'Jira · Wix Studio' }
    ],
    problem: 'Woodland Country Manor had an outdated web platform with fragmented information architecture, unclear booking pathways, and inconsistent stakeholder alignment during previous software updates.',
    dataApproach: [
      'Ran sprint planning and backlog prioritization for the team in Jira.',
      'Owned client communication and turned the client\'s feedback into prioritized user stories.',
      'Led a usability audit across 5+ service pages, finding navigation and mobile layout gaps.',
      'Built site components in Wix Studio and stepped in to debug when the team was stretched.'
    ],
    solution: 'Delivered a redesigned, mobile-friendly site for the client, with scope and timeline managed through the sprint backlog.',
    results: [
      'Shipped the redesigned site (live link above).',
      'Used the audit findings to steer the new navigation and mobile layout.',
      'Kept the project on track through scope and timeline changes from the client.'
    ],
    scrumDetails: {
      sprintDuration: '2 Weeks per Sprint',
      teamSize: '6 Members',
      velocity: 'Tracked in Jira',
      keyArtifacts: ['Product Backlog', 'User Stories', 'Usability Audit']
    }
  },
  {
    slug: 'ben-portfolio-app',
    colophon: true,
    title: 'Interactive Portfolio & Analytics Platform',
    subtitle: 'Modern Web Application (Next.js, TypeScript, Tailwind CSS, Recharts)',
    category: 'systems',
    categoryLabel: 'Business & Systems',
    featured: true,
    role: 'Full-Stack & Systems Engineer',
    timeline: '1 Month',
    summary: 'This site: a Next.js and TypeScript portfolio that presents each project through its findings, charts and source code.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'GitHub REST API'],
    githubUrl: 'https://github.com/benman17/ben-portfolio',
    metrics: [
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'Charts', value: 'Recharts' },
      { label: 'API Integration', value: 'GitHub REST' }
    ],
    problem: 'A PDF resume and a list of links do not show what the analysis found or how it was built.',
    dataApproach: [
      'Architected a modular Next.js 16 App Router application with full TypeScript type safety.',
      'Built interactive chart components with Recharts (TFT level chart, NFL tier scatter plot, Northstar dashboard views, a labeled sample revenue sandbox).',
      'Integrated dynamic client-side fetching with GitHub REST API to display live public repositories.'
    ],
    solution: 'A portfolio that shows each project through its own data: the findings, the queries behind them and links to the source.',
    results: [
      'Pages are prerendered at build time; project pages use generateStaticParams.',
      'The GitHub page lists public repositories from the GitHub API, with a plain list of project repos if the API is unavailable.',
      'Deployed clean source repository to GitHub at benman17/ben-portfolio.'
    ],
    sqlSnippet: `// Next.js App Router API & Static Generation
export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function fetchGitHubRepos(username: string = 'benman17') {
  const res = await fetch(\`https://api.github.com/users/\${username}/repos?sort=updated\`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}`
  }
];

export const PROJECTS: Project[] =
  FIXTURE === 'worst' ? [...WORST_PROJECTS, ...REAL_PROJECTS] : REAL_PROJECTS;

export const METHODOLOGY_STEPS = {
  analytics: [
    {
      step: '01',
      title: 'Business Problem Definition',
      subtitle: 'Identify Key Questions & KPIs',
      description: 'Collaborate with business stakeholders to convert vague business challenges into measurable analytical questions, target KPIs, and actionable success metrics.',
      tools: ['Stakeholder Interviews', 'KPI Framing', 'Requirements Matrix'],
      deliverable: 'Analytical Problem Charter'
    },
    {
      step: '02',
      title: 'Data Extraction & Wrangling',
      subtitle: 'SQL Querying & ETL Cleanse',
      description: 'Extract raw multi-source data from relational databases using complex SQL (CTEs, Window functions). Clean duplicates, handle missing values, and validate schema integrity in Python.',
      tools: ['PostgreSQL / Snowflake', 'Python Pandas', 'SQL Window Functions'],
      deliverable: 'Cleaned Analytical Dataset'
    },
    {
      step: '03',
      title: 'Exploratory & Modeling Analysis',
      subtitle: 'Pattern Discovery & Statistical Testing',
      description: 'Explore the data, segment it, and check that a pattern holds up (for example, validating a cluster count three different ways) before calling it a finding.',
      tools: ['Python pandas', 'scikit-learn (K-Means)', 'Validation checks'],
      deliverable: 'Statistical Findings Report'
    },
    {
      step: '04',
      title: 'Interactive BI Visualization',
      subtitle: 'Dashboarding & Dynamic Reports',
      description: 'Design intuitive, executive-ready Power BI / Tableau dashboards with interactive slicers, DAX metrics, and clear visual hierarchy optimized for fast decision-making.',
      tools: ['Power BI', 'Tableau', 'DAX / Calculated Fields'],
      deliverable: 'Executive BI Dashboard'
    },
    {
      step: '05',
      title: 'Strategic Impact & Recommendations',
      subtitle: 'Translate Insight into Action',
      description: 'Write up what the data shows, what it does not show, and what to do next, in terms the people acting on it can use.',
      tools: ['Written findings', 'Dashboard walkthrough', 'Stated caveats'],
      deliverable: 'Business Action Plan'
    }
  ],
  scrum: [
    {
      step: '01',
      title: 'Discovery & Product Backlog',
      subtitle: 'Epic Mapping & User Stories',
      description: 'Partner with Product Owners and users to translate high-level business goals into structured Epics and INVEST-compliant User Stories with concrete Acceptance Criteria.',
      tools: ['Jira / Confluence', 'User Story Mapping', 'Acceptance Criteria'],
      deliverable: 'Prioritized Product Backlog'
    },
    {
      step: '02',
      title: 'Sprint Planning & Estimation',
      subtitle: 'Capacity & Story Point Poker',
      description: 'Facilitate Sprint Planning ceremonies. Guide cross-functional developers through Planning Poker estimations, establish Sprint Goals, and commit to realistic team capacity.',
      tools: ['Planning Poker', 'Team Capacity Planner', 'Sprint Goal Alignment'],
      deliverable: 'Committed Sprint Backlog'
    },
    {
      step: '03',
      title: 'Sprint Execution & Blockers',
      subtitle: 'Daily Standups & Flow Management',
      description: 'Host daily 15-minute Standups to track progress against the Sprint Burndown chart. Proactively shield the engineering team from outside noise and resolve technical blockers.',
      tools: ['Daily Standup', 'Burndown Chart', 'Blocker Removal Matrix'],
      deliverable: 'Steady Sprint Velocity'
    },
    {
      step: '04',
      title: 'Sprint Review & Demo',
      subtitle: 'Stakeholder Feedback & Validation',
      description: 'Demonstrate potentially shippable product increments to key stakeholders. Gather feedback, validate against Definition of Done (DoD), and update backlog priorities.',
      tools: ['Stakeholder Demo', 'Definition of Done Checklist', 'Feedback Logs'],
      deliverable: 'Validated Product Increment'
    },
    {
      step: '05',
      title: 'Sprint Retrospective',
      subtitle: 'Continuous Process Improvement',
      description: 'Lead team Retrospectives using Start/Stop/Continue frameworks to surface team friction points, implement actionable process improvements, and elevate team morale.',
      tools: ['Retrospective Board', 'Action Item Tracker', 'Continuous Improvement'],
      deliverable: 'Actionable Team Retro Plan'
    }
  ]
};
