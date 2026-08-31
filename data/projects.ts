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
  chartData?: { name: string; value1: number; value2: number }[];
}

export const PROJECTS: Project[] = [
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
}`,
    chartData: [
      { name: 'Core Engine', value1: 95, value2: 90 },
      { name: 'Interactive Widgets', value1: 92, value2: 88 },
      { name: 'API Services', value1: 89, value2: 85 },
      { name: 'Responsive Styling', value1: 98, value2: 95 }
    ]
  },
  {
    slug: 'nfl-clustering',
    title: 'NFL Player Clustering & Fantasy Tier Analytics',
    subtitle: 'K-Means Machine Learning & Apache Spark (PySpark) in Google Colab',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Lead Data & Machine Learning Engineer',
    timeline: 'Google Colab Notebook',
    summary: 'Clustering NFL players into fantasy football tiers using historical performance data, Apache Spark (PySpark), and K-Means modeling in Google Colab.',
    technologies: ['PySpark', 'Apache Spark', 'Python', 'K-Means', 'Google Colab', 'Fantasy Football', 'Machine Learning', 'Data Pipelines'],
    githubUrl: 'https://github.com/benman17/NFL-Clustering',
    metrics: [
      { label: 'Modeling Framework', value: 'PySpark MLlib' },
      { label: 'Clustering Algorithm', value: 'K-Means (k=4)' },
      { label: 'Environment', value: 'Google Colab' }
    ],
    problem: 'Evaluating NFL player fantasy draft value using raw stats leads to recency bias. Traditional position labels ignore historical performance clusters, efficiency metrics, and usage consistency.',
    dataApproach: [
      'Loaded historical NFL player performance datasets into PySpark DataFrame in Google Colab.',
      'Preprocessed features (fantasy points per game, target/touchdown share, efficiency metrics) using PySpark VectorAssembler and StandardScaler.',
      'Trained an Apache Spark K-Means clustering model to group players into distinct performance tiers.',
      'Evaluated tier centroids to identify undervalued breakout candidates and regression candidates.'
    ],
    solution: 'Built a scalable PySpark K-Means machine learning workflow in Google Colab that partitions NFL players into actionable fantasy performance tiers.',
    results: [
      'Engineered automated PySpark ML pipeline processing multi-season NFL player statistics.',
      'Established 4 distinct player tiers separating elite RB/WR studs, high-volume flex plays, and sleeper targets.',
      'Published reproducible Google Colab notebook & full source repository on GitHub.'
    ],
    sqlSnippet: `# PySpark K-Means Clustering on NFL Player Data (Google Colab)
from pyspark.sql import SparkSession
from pyspark.ml.feature import VectorAssembler, StandardScaler
from pyspark.ml.clustering import KMeans

spark = SparkSession.builder.appName("NFL_Fantasy_Clustering").getOrCreate()

# 1. Feature assembly for Spark MLlib
assembler = VectorAssembler(
    inputCols=["fantasy_points_avg", "usage_rate", "efficiency_score", "touchdown_share"],
    outputCol="raw_features"
)
df_features = assembler.transform(nfl_spark_df)

# 2. Scale features & train K-Means model
scaler = StandardScaler(inputCol="raw_features", outputCol="features")
scaled_data = scaler.fit(df_features).transform(df_features)

kmeans = KMeans(k=4, seed=42)
model = kmeans.fit(scaled_data)
predictions = model.transform(scaled_data)`,
    chartData: [
      { name: 'Tier 1 (Elite)', value1: 96, value2: 88 },
      { name: 'Tier 2 (Core Starters)', value1: 82, value2: 74 },
      { name: 'Tier 3 (Flex / Sleepers)', value1: 68, value2: 60 },
      { name: 'Tier 4 (Depth)', value1: 52, value2: 45 }
    ]
  },
  {
    slug: 'sales-intelligence-dashboard',
    title: 'Sales Intelligence & Revenue Analytics',
    subtitle: 'End-to-End SQL Data Pipeline & Executive Power BI Dashboard',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Lead Data Analyst',
    timeline: '3 Months',
    summary: 'Transformed 250k+ raw transactional records into an automated SQL & Python ETL pipeline, powering an executive dashboard that identified $340k in untapped regional sales opportunities.',
    technologies: ['SQL', 'Python', 'Pandas', 'Power BI', 'ETL Pipelines', 'Data Modeling'],
    githubUrl: 'https://github.com/benman17/sales-intelligence-analytics',
    metrics: [
      { label: 'Revenue Growth Identified', value: '+14.2%', trend: 'up' },
      { label: 'Records Processed', value: '250,000+' },
      { label: 'ETL Processing Time', value: '-65%' }
    ],
    problem: 'Executive leadership lacked unified visibility into cross-channel sales trends, regional product performance, and customer churn drivers. Legacy spreadsheet reporting took 12+ hours weekly and had frequent data mismatches.',
    dataApproach: [
      'Extracted raw multi-source transactional data from relational databases using complex SQL JOINs, CTEs, and Window functions.',
      'Developed automated Python (Pandas/NumPy) data cleaning scripts to resolve duplicate orders, missing customer segments, and currency conversions.',
      'Designed a Star Schema data model with Fact and Dimension tables in PostgreSQL optimized for analytical queries.',
      'Built interactive DAX measures in Power BI for rolling 30-day revenue metrics, customer acquisition costs (CAC), and customer lifetime value (LTV).'
    ],
    solution: 'Engineered an automated end-to-end data pipeline and interactive BI dashboard featuring dynamic drill-downs by region, product category, and customer tier.',
    results: [
      'Reduced weekly executive report generation time from 12 hours to instant automated refreshes.',
      'Identified high-churn product categories, allowing marketing to optimize retargeting campaigns (+18% retention).',
      'Uncovered $340,000 in under-serviced mid-market accounts.'
    ],
    sqlSnippet: `WITH RegionalMetrics AS (
  SELECT 
    r.region_name,
    p.category,
    SUM(f.sales_amount) AS total_revenue,
    COUNT(DISTINCT f.customer_id) AS active_customers,
    AVG(f.sales_amount) AS avg_order_value,
    DENSE_RANK() OVER (PARTITION BY r.region_name ORDER BY SUM(f.sales_amount) DESC) as category_rank
  FROM fact_sales f
  JOIN dim_region r ON f.region_id = r.region_id
  JOIN dim_product p ON f.product_id = p.product_id
  WHERE f.order_date >= DATEADD(month, -6, CURRENT_DATE())
  GROUP BY r.region_name, p.category
)
SELECT * FROM RegionalMetrics 
WHERE category_rank <= 3
ORDER BY total_revenue DESC;`,
    chartData: [
      { name: 'Jan', value1: 42000, value2: 38000 },
      { name: 'Feb', value1: 51000, value2: 43000 },
      { name: 'Mar', value1: 58000, value2: 47000 },
      { name: 'Apr', value1: 63000, value2: 52000 },
      { name: 'May', value1: 72000, value2: 58000 },
      { name: 'Jun', value1: 89000, value2: 64000 },
      { name: 'Jul', value1: 94000, value2: 71000 }
    ]
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
    },
    chartData: [
      { name: 'Sprint 1', value1: 45, value2: 42 },
      { name: 'Sprint 2', value1: 40, value2: 38 },
      { name: 'Sprint 3', value1: 35, value2: 35 },
      { name: 'Sprint 4', value1: 30, value2: 28 },
      { name: 'Delivery', value1: 0, value2: 0 }
    ]
  },
  {
    slug: 'supply-chain-inventory-analytics',
    title: 'Supply Chain & Inventory Data Optimization Engine',
    subtitle: 'Python ETL Pipeline & Stockout Forecasting Model',
    category: 'analytics',
    categoryLabel: 'Data & Analytics',
    featured: true,
    role: 'Data & Systems Analyst',
    timeline: '2 Months',
    summary: 'Analyzed inventory turnover rate across 14 distribution centers using Python and SQL to optimize safety stock thresholds, reducing inventory carrying costs by 15%.',
    technologies: ['Python', 'SQL', 'Tableau', 'Demand Forecasting', 'Statistical Analysis', 'ETL'],
    githubUrl: 'https://github.com/benman17/supply-chain-analytics',
    metrics: [
      { label: 'Stockout Rate Reduction', value: '-22%', trend: 'up' },
      { label: 'Carrying Cost Savings', value: '15%' },
      { label: 'Forecast Accuracy', value: '91.4%' }
    ],
    problem: 'Inaccurate manual forecasting caused frequent stockouts of high-demand items while over-stocking slow-moving SKUs, tying up critical capital.',
    dataApproach: [
      'Aggregated 3 years of historical SKU-level warehouse movements and lead time variances using Python (Pandas/SciPy).',
      'Calculated dynamic Safety Stock levels based on standard deviation of daily demand and lead time uncertainty.',
      'Created an interactive Tableau dashboard alerting inventory managers when stock dipped below calculated reorder points.'
    ],
    solution: 'Designed an automated inventory optimization engine combining statistical safety stock calculations with automated replenishment alerts.',
    results: [
      'Reduced stockouts on critical SKUs by 22% within 60 days of deployment.',
      'Freed up $185,000 in working capital by liquidating excess safety stock of slow-moving inventory.'
    ],
    chartData: [
      { name: 'Week 1', value1: 18, value2: 18 },
      { name: 'Week 2', value1: 15, value2: 14 },
      { name: 'Week 3', value1: 12, value2: 10 },
      { name: 'Week 4', value1: 9, value2: 7 },
      { name: 'Week 5', value1: 6, value2: 4 },
      { name: 'Week 6', value1: 4, value2: 2 }
    ]
  },
  {
    slug: 'healthcare-patient-flow-analytics',
    title: 'Healthcare Patient Flow & Capacity Analytics',
    subtitle: 'Queueing Simulation & Operational Efficiency Analysis',
    category: 'systems',
    categoryLabel: 'Business Systems & Analytics',
    featured: false,
    role: 'Operations Data Analyst',
    timeline: '6 Weeks',
    summary: 'Analyzed emergency department queueing bottlenecks using Python discrete event simulation, proposing bed allocation schedules that cut patient wait times by 18 minutes.',
    technologies: ['Python', 'SimPy', 'Data Visualization', 'Process Optimization', 'Tableau'],
    githubUrl: 'https://github.com/benman17/patient-flow-analytics',
    metrics: [
      { label: 'Wait Time Reduction', value: '-18 min' },
      { label: 'Bed Utilization Rate', value: '88%' }
    ],
    problem: 'Hospital emergency room peak-hour congestion resulted in elevated patient wait times and clinician fatigue.',
    dataApproach: [
      'Extracted arrival timestamp data and triage severity scores across 40,000 patient visits.',
      'Built a discrete-event simulation model in Python to test bottleneck hypotheses under varying staffing levels.'
    ],
    solution: 'Recommended dynamic staffing shift adjustments and a fast-track triage queue for low-acuity patients.',
    results: [
      'Shortened average intake-to-physician wait times by 18 minutes.',
      'Improved patient satisfaction metrics by 24% without increasing total headcount.'
    ]
  },
  {
    slug: 'enterprise-process-automation',
    title: 'Enterprise Business Process Automation & Systems Mapping',
    subtitle: 'BPMN Workflow Redesign & Requirements Specification',
    category: 'project-management',
    categoryLabel: 'Project Management & Systems',
    featured: false,
    role: 'Systems Analyst & Product Owner Delegate',
    timeline: '2 Months',
    summary: 'Documented AS-IS and TO-BE business processes for vendor procurement, translating business needs into detailed System Requirements Specifications (SRS) and Agile epics.',
    technologies: ['BPMN 2.0', 'Business Analysis', 'Jira Epics', 'Requirements Engineering', 'Lucidchart'],
    githubUrl: 'https://github.com/benman17/procurement-process-automation',
    metrics: [
      { label: 'Cycle Time Reduction', value: '-50%' },
      { label: 'Process Bottlenecks Resolved', value: '4 Major' }
    ],
    problem: 'Manual procurement approval workflows across 5 departments delayed software vendor onboarding by an average of 21 business days.',
    dataApproach: [
      'Conducted interviews with 12 department heads to map AS-IS workflow bottlenecks in BPMN 2.0.',
      'Designed TO-BE automated workflow specifications integrated with API-driven email approvals.'
    ],
    solution: 'Created comprehensive Functional Requirements Documents (FRD) and 18 prioritized Jira Epics for dev implementation.',
    results: [
      'Cut vendor onboarding cycle time from 21 days to 10 days.',
      'Eliminated 100% of manual paper form handoffs across departments.'
    ]
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
