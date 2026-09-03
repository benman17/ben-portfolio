export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: 'analytics' | 'project-management' | 'systems';
  categoryLabel: string;
  featured: boolean;
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

export const PROJECTS: Project[] = [
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
    githubUrl: 'https://github.com/benman17/ben-portfolio/tree/main/northstar_commerce',
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
    slug: 'ben-portfolio-app',
    title: 'Interactive Portfolio & Analytics Platform',
    subtitle: 'Modern Web Application (Next.js, TypeScript, Tailwind CSS, Recharts)',
    category: 'systems',
    categoryLabel: 'Business & Systems',
    featured: true,
    role: 'Full-Stack & Systems Engineer',
    timeline: '1 Month',
    summary: 'Engineered a modern, responsive web application showcase for data analytics pipelines, interactive Machine Learning scatter plots, and Agile Scrum Master project workflows.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'GitHub REST API', 'Glassmorphism'],
    githubUrl: 'https://github.com/benman17/ben-portfolio',
    metrics: [
      { label: 'Page Load Speed', value: '< 1.0s (Prerendered)' },
      { label: 'Static Routes', value: '15 SSG Pages' },
      { label: 'API Integration', value: 'GitHub REST' }
    ],
    problem: 'Traditional PDF resumes and static link lists fail to communicate the interactive nature of data analytics models, SQL query pipelines, and Agile sprint velocity metrics to recruiters.',
    dataApproach: [
      'Architected a modular Next.js 16 App Router application with full TypeScript type safety.',
      'Built custom interactive visualization components using Recharts (NFL PCA Scatter Plot, Executive Revenue & Churn Sandbox, Sprint Burndown).',
      'Designed an interactive Agile Scrum Kanban simulator allowing recruiters to drag/advance stories across Sprint stages.',
      'Integrated dynamic client-side fetching with GitHub REST API to display live public repositories.'
    ],
    solution: 'Built a high-performance, glassmorphic portfolio web app that transforms static project summaries into interactive product showcases.',
    results: [
      'Delivered 100% static route pre-rendering for instant page loads and optimal SEO.',
      'Automated dynamic GitHub repository sync with intelligent offline fallback state.',
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
  },
  {
    slug: 'nfl-clustering',
    title: 'NFL Player Clustering & Fantasy Tier Analytics',
    subtitle: 'K-Means Machine Learning & VOR Modeling | Python & Scikit-Learn',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Lead Data & Machine Learning Engineer',
    timeline: 'Python / Scikit-Learn / CLI & Notebook',
    summary: 'Unsupervised machine learning pipeline that clusters NFL players into actionable fantasy performance tiers using custom PPR+IDP scoring, Value Over Replacement (VOR), and K-Means with triple-metric validation.',
    technologies: ['Python', 'Scikit-Learn', 'K-Means', 'Pandas', 'Value Over Replacement (VOR)', 'Matplotlib', 'Seaborn', 'CLI Pipeline'],
    githubUrl: 'https://github.com/benman17/NFL-Clustering',
    metrics: [
      { label: 'Validation Methods', value: 'Elbow, Silhouette, Gap' },
      { label: 'Clustering Model', value: 'K-Means (k=4)' },
      { label: 'Core Metric', value: 'VOR (Value Over Replacement)' }
    ],
    problem: 'Evaluating NFL player fantasy draft value using raw stats leads to recency bias. Traditional position labels ignore historical performance clusters, positional scarcity, and replacement baselines.',
    dataApproach: [
      'Ingested multi-category 2024 NFL player performance statistics via SportsData.io API and local cached datasets.',
      'Standardized positions (mapping FB->RB, OLB/ILB->LB, secondary roles) and formulated custom PPR + IDP scoring weights.',
      'Calculated positional Value Over Replacement (VOR) baselines based on standard 12-team roster starter demand.',
      'Evaluated optimal tier count using the Elbow Method, Silhouette Analysis, and Gap Statistic (confirming k=4).',
      'Trained K-Means model, sorted clusters by descending average VOR, and mapped actionable fantasy draft tiers.'
    ],
    solution: 'Built a modular data science repository with an end-to-end CLI pipeline and reproducible Google Colab notebook that partitions NFL players into 4 empirical draft tiers.',
    results: [
      'Eliminated draft recency bias by isolating true positional scarcity through Value Over Replacement (VOR).',
      'Benchmarked empirical K-Means clusters against industry consensus FantasyPros tiers to identify market inefficiencies.',
      'Architected a modular production codebase with automated CLI runner, sample dataset, and publication-ready diagnostic charts.'
    ],
    sqlSnippet: `# K-Means Clustering on Value Over Replacement (VOR)
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Isolate feature vector (Value Over Replacement)
X = df_selected_players[['VOR']].values

# 2. Fit K-Means clustering model (optimal k=4)
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
    slug: 'tft-snowflake',
    title: 'TFT Analytics & Snowflake Data Warehouse',
    subtitle: 'SQL Dimensional Data Modeling & Snowflake Cloud Warehousing',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Data Engineer & Analytics Specialist',
    timeline: '2 Months',
    summary: 'Engineered a Snowflake cloud data warehouse and analytical SQL pipeline analyzing Teamfight Tactics (TFT) player performance, team composition synergies, and win-rate trends.',
    technologies: ['Snowflake', 'SQL', 'Python', 'Data Warehousing', 'Dimensional Modeling', 'ETL Pipelines'],
    githubUrl: 'https://github.com/benman17/tft-snowflake',
    metrics: [
      { label: 'Data Warehouse', value: 'Snowflake Cloud' },
      { label: 'Schema Model', value: 'Star Schema (Fact/Dim)' },
      { label: 'Query Optimization', value: 'Custom CTEs' }
    ],
    problem: 'Competitive gaming data contains unstructured JSON payload streams across thousands of matches, making trend analysis and meta-composition evaluation difficult without relational modeling.',
    dataApproach: [
      'Ingested match history and player trajectory data into staging tables within Snowflake.',
      'Designed a Star Schema data model with Fact tables (Match Performance) and Dimension tables (Champions, Traits, Items).',
      'Engineered complex SQL analytical queries using Window functions and aggregations to evaluate trait synergy win rates.',
      'Optimized query performance using clustering keys and materialized views in Snowflake.'
    ],
    solution: 'Designed an automated Snowflake analytical data warehouse translating raw match telemetry into relational insights on meta composition trends.',
    results: [
      'Built production-ready Snowflake database architecture with automated staging-to-fact transformation.',
      'Identified top-performing item and champion trait combinations across meta shifts.',
      'Published open-source repository on GitHub at benman17/tft-snowflake.'
    ],
    sqlSnippet: `-- Snowflake Analytical Query: Synergy Win Rates
WITH TraitSynergies AS (
  SELECT 
    f.match_id,
    d.trait_name,
    d.tier_level,
    f.placement,
    CASE WHEN f.placement <= 4 THEN 1 ELSE 0 END AS top_4_finish
  FROM fact_tft_match f
  JOIN dim_tft_traits d ON f.trait_id = d.trait_id
  WHERE f.game_version >= '14.1'
)
SELECT 
  trait_name,
  tier_level,
  COUNT(match_id) AS total_games,
  AVG(placement) AS avg_placement,
  ROUND(SUM(top_4_finish) * 100.0 / COUNT(match_id), 2) AS top_4_rate_pct
FROM TraitSynergies
GROUP BY trait_name, tier_level
HAVING COUNT(match_id) >= 50
ORDER BY top_4_rate_pct DESC;`
  },
  {
    slug: 'woodland-agile-redesign',
    title: 'Woodland Manor Agile Web Redesign & Systems Overhaul',
    subtitle: 'Scrum Master & Business Analyst Project Management Delivery',
    category: 'project-management',
    categoryLabel: 'Project Management & Scrum',
    featured: true,
    role: 'Scrum Master & Lead Business Analyst',
    timeline: '4 Sprints (8 Weeks)',
    summary: 'Led a cross-functional Scrum team (DevHawks) through 4 2-week Sprints to redesign Woodland Country Manor’s digital presence, streamlining stakeholder reviews and boosting user engagement by 45%.',
    technologies: ['Agile / Scrum', 'Jira / Confluence', 'Backlog Grooming', 'Stakeholder Management', 'User Stories', 'Process Mapping'],
    liveUrl: 'https://manguibo.wixstudio.com/woodlandcountrymanor',
    metrics: [
      { label: 'Sprint Velocity Increase', value: '+35%', trend: 'up' },
      { label: 'On-Time Story Completion', value: '96%' },
      { label: 'Stakeholder Feedback Loop', value: '-40%' }
    ],
    problem: 'Woodland Country Manor had an outdated web platform with fragmented information architecture, unclear booking pathways, and inconsistent stakeholder alignment during previous software updates.',
    dataApproach: [
      'Facilitated stakeholder discovery sessions and mapped customer personas to craft 30+ structured User Stories with clear Acceptance Criteria.',
      'Established a Jira Scrum board, defined Sprint Goals, and led daily Standups, Backlog Refinement, and Sprint Retrospectives.',
      'Utilized Planning Poker estimation techniques to standardize team story points and stabilize Sprint Velocity.',
      'Built a Confluence documentation hub containing sprint burndown charts, decision logs, and wireframe prototypes.'
    ],
    solution: 'Served as Scrum Master and BA, eliminating sprint blockers, prioritizing high-value features in the Product Backlog, and delivering a modern, responsive web application on schedule.',
    results: [
      'Delivered 100% of P0/P1 core user stories across 4 Sprints with zero scope creep.',
      'Increased mobile visitor session duration by 45% and online reservation inquiries by 28%.',
      'Received 9.5/10 stakeholder satisfaction rating for project transparency and delivery speed.'
    ],
    scrumDetails: {
      sprintDuration: '2 Weeks per Sprint',
      teamSize: '6 Members (Devs, Designers, BA)',
      velocity: '42 Story Points / Sprint Avg',
      keyArtifacts: ['Product Backlog', 'Sprint Burndown', 'User Story Mapping Matrix', 'Definition of Done (DoD)']
    }
  }
];

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
      description: 'Perform exploratory data analysis (EDA), trend modeling, segmentation, and statistical validation to surface root causes, growth opportunities, and anomaly patterns.',
      tools: ['Python SciPy/NumPy', 'Cohort Analysis', 'Regression Modeling'],
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
      description: 'Present data-driven strategic recommendations to cross-functional leaders, measuring ROI impact and establishing automated pipeline monitoring.',
      tools: ['Executive Briefings', 'ROI Projection', 'Automated Alerts'],
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
