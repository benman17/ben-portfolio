import { FIXTURE } from './fixtures';

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: { name: string; highlight?: boolean }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Data & Analytics',
    subtitle: 'Extracting actionable insight from complex datasets',
    iconName: 'BarChart3',
    skills: [
      { name: 'SQL (PostgreSQL, MySQL, Snowflake)', highlight: true },
      { name: 'Python (Pandas, NumPy, SciPy)', highlight: true },
      { name: 'Power BI & DAX Modeling', highlight: true },
      { name: 'Tableau & Data Storytelling' },
      { name: 'ETL Pipelines & Data Cleanse' },
      { name: 'Excel (Pivot Tables, Lookups)' }
    ]
  },
  {
    title: 'Project Management & Scrum',
    subtitle: 'Driving agile delivery and stakeholder alignment',
    iconName: 'Kanban',
    skills: [
      { name: 'Agile & Scrum Frameworks', highlight: true },
      { name: 'Sprint Planning & Ceremonies', highlight: true },
      { name: 'Jira', highlight: true },
      { name: 'Backlog Refinement & User Stories' },
      { name: 'Stakeholder Communication' },
      { name: 'Risk & Dependency Management' },
      { name: 'Velocity & Capacity Planning' }
    ]
  },
  {
    title: 'Business & Systems Analysis',
    subtitle: 'Bridging business objectives with technical solutions',
    iconName: 'Workflow',
    skills: [
      { name: 'Requirements Elicitation (BRD/FRD)', highlight: true },
      { name: 'Usability Audits', highlight: true },
      { name: 'Relational Database Architecture' },
      { name: 'Information Systems Strategy' },
      { name: 'Cost-Benefit & Feasibility Analysis' }
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
  email: FIXTURE === 'worst' ? 'benjamin.manguiat.dataanalytics@outlook.com' : 'bmanguiat03@gmail.com'
};
