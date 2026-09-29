export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Data & Analytics',
    subtitle: 'Extracting actionable insight from complex datasets',
    iconName: 'BarChart3',
    skills: [
      { name: 'SQL (PostgreSQL, MySQL, Snowflake)', level: 92, highlight: true },
      { name: 'Python (Pandas, NumPy, SciPy)', level: 88, highlight: true },
      { name: 'Power BI & DAX Modeling', level: 90, highlight: true },
      { name: 'Tableau & Data Storytelling', level: 85 },
      { name: 'ETL Pipelines & Data Cleanse', level: 86 },
      { name: 'Excel (Pivot Tables, Lookups)', level: 85 }
    ]
  },
  {
    title: 'Project Management & Scrum',
    subtitle: 'Driving agile delivery and stakeholder alignment',
    iconName: 'Kanban',
    skills: [
      { name: 'Agile & Scrum Frameworks', level: 94, highlight: true },
      { name: 'Sprint Planning & Ceremonies', level: 92, highlight: true },
      { name: 'Jira', level: 90, highlight: true },
      { name: 'Backlog Refinement & User Stories', level: 94 },
      { name: 'Stakeholder Communication', level: 92 },
      { name: 'Risk & Dependency Management', level: 86 },
      { name: 'Velocity & Capacity Planning', level: 88 }
    ]
  },
  {
    title: 'Business & Systems Analysis',
    subtitle: 'Bridging business objectives with technical solutions',
    iconName: 'Workflow',
    skills: [
      { name: 'Requirements Elicitation (BRD/FRD)', level: 90, highlight: true },
      { name: 'Usability Audits', level: 85, highlight: true },
      { name: 'Relational Database Architecture', level: 86 },
      { name: 'Information Systems Strategy', level: 88 },
      { name: 'Cost-Benefit & Feasibility Analysis', level: 84 }
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Ben Manguiat',
  tagline: 'Information Systems • Data Analytics • Scrum Master',
  bio: 'Information Systems graduate (Miami University, 2026) and analytical problem-solver specializing in data engineering pipelines, Power BI/Tableau executive dashboards, and Agile/Scrum project delivery. I turn complex raw data and vague business requirements into organized, high-impact technical solutions.',
  location: 'United States',
  education: 'B.S. Information Systems',
  githubUsername: 'benman17',
  linkedinUrl: 'https://www.linkedin.com/in/benjamin-manguiat-84340b251/',
  email: 'bmanguiat03@gmail.com'
};
