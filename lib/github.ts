export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number | null;
  forks_count: number | null;
  language: string | null;
  topics: string[];
  updated_at: string | null;
  fromFallback?: boolean;
}

/**
 * Shown only when the GitHub API is unavailable (rate limit, offline). These
 * are the real project repos; stats and dates are unknown here, so they are
 * left empty rather than guessed. `fromFallback` lets the UI say so.
 */
const fallback = (name: string, description: string, language: string): GitHubRepo => ({
  id: -name.length - description.length,
  name,
  full_name: `benman17/${name}`,
  description,
  html_url: `https://github.com/benman17/${name}`,
  stargazers_count: null,
  forks_count: null,
  language,
  topics: [],
  updated_at: null,
  fromFallback: true
});

export const FALLBACK_REPOS: GitHubRepo[] = [
  fallback('tft-snowflake', 'Ranked Teamfight Tactics match data loaded into Snowflake, analyzed with SQL, and visualized in Power BI.', 'SQL'),
  fallback('northstar-commerce', 'PostgreSQL star-schema pipeline and Power BI executive dashboard on margin and returns across 63k+ order items.', 'SQL'),
  fallback('NFL-Clustering', 'K-Means fantasy draft tiers built on Value Over Replacement, with elbow, silhouette and gap-statistic validation.', 'Python'),
  fallback('ben-portfolio', 'This portfolio: Next.js, TypeScript, Tailwind CSS and Recharts.', 'TypeScript')
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

    const repos: Array<Omit<GitHubRepo, 'fromFallback'>> = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      return FALLBACK_REPOS;
    }

    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || null,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count ?? null,
      forks_count: repo.forks_count ?? null,
      language: repo.language || null,
      topics: repo.topics || [],
      updated_at: repo.updated_at
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return FALLBACK_REPOS;
  }
}
