export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  is_featured?: boolean;
}

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'sales-intelligence-analytics',
    full_name: 'benman17/sales-intelligence-analytics',
    description: 'Automated SQL & Python ETL data pipeline powering dynamic revenue analytics and Power BI dashboard.',
    html_url: 'https://github.com/benman17/sales-intelligence-analytics',
    stargazers_count: 8,
    forks_count: 3,
    language: 'Python',
    topics: ['sql', 'python', 'power-bi', 'etl', 'data-analytics'],
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_featured: true
  },
  {
    id: 2,
    name: 'woodland-manor-agile-redesign',
    full_name: 'benman17/woodland-manor-agile-redesign',
    description: 'Scrum project management repository featuring Jira user stories, sprint velocity metrics, and web portal source.',
    html_url: 'https://manguibo.wixstudio.com/woodlandcountrymanor',
    stargazers_count: 12,
    forks_count: 5,
    language: 'TypeScript',
    topics: ['agile', 'scrum', 'jira', 'project-management', 'nextjs'],
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    is_featured: true
  },
  {
    id: 3,
    name: 'supply-chain-data-engine',
    full_name: 'benman17/supply-chain-data-engine',
    description: 'Python statistical safety stock forecasting engine reducing warehouse stockouts.',
    html_url: 'https://github.com/benman17/supply-chain-data-engine',
    stargazers_count: 6,
    forks_count: 2,
    language: 'Jupyter Notebook',
    topics: ['python', 'pandas', 'supply-chain', 'tableau', 'forecasting'],
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    is_featured: true
  },
  {
    id: 4,
    name: 'sql-analytical-query-library',
    full_name: 'benman17/sql-analytical-query-library',
    description: 'Curated collection of advanced SQL queries (CTEs, Window functions, cohort retention matrices).',
    html_url: 'https://github.com/benman17/sql-analytical-query-library',
    stargazers_count: 15,
    forks_count: 7,
    language: 'T-SQL',
    topics: ['sql', 'postgresql', 'data-modeling', 'window-functions'],
    updated_at: new Date(Date.now() - 86400000 * 14).toISOString()
  },
  {
    id: 5,
    name: 'patient-flow-simulation',
    full_name: 'benman17/patient-flow-simulation',
    description: 'Healthcare Discrete Event Simulation evaluating emergency room intake queues.',
    html_url: 'https://github.com/benman17/patient-flow-simulation',
    stargazers_count: 5,
    forks_count: 1,
    language: 'Python',
    topics: ['simpy', 'python', 'operations-research', 'healthcare'],
    updated_at: new Date(Date.now() - 86400000 * 20).toISOString()
  },
  {
    id: 6,
    name: 'agile-scrum-templates-suite',
    full_name: 'benman17/agile-scrum-templates-suite',
    description: 'Re-usable Agile Scrum templates: Sprint Planning matrices, Retro boards, and INVEST story checklists.',
    html_url: 'https://github.com/benman17/agile-scrum-templates-suite',
    stargazers_count: 24,
    forks_count: 11,
    language: 'Markdown',
    topics: ['scrum', 'agile', 'jira', 'confluence', 'templates'],
    updated_at: new Date(Date.now() - 86400000 * 25).toISOString()
  }
];

export async function fetchGitHubRepos(username: string = 'benman17'): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Ben-Portfolio-App'
      }
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, using curated fallback data.`);
      return FALLBACK_REPOS;
    }

    const repos: any[] = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      return FALLBACK_REPOS;
    }

    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || 'Public repository showcasing analytics or project management work.',
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language || 'Code',
      topics: repo.topics || [],
      updated_at: repo.updated_at
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return FALLBACK_REPOS;
  }
}
