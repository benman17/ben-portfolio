# Ben Manguiat, Data Analyst: Portfolio

Portfolio site for Ben Manguiat (B.S. Information Systems, Miami University, 2026). Each project is presented by what it found, with the charts, queries and source behind it.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Recharts**.

## Projects

| Project | Finding | Stack | Source |
| :--- | :--- | :--- | :--- |
| TFT Ranked Match Analysis | Reaching level 9 meant a top-4 finish 86.6% of the time (vs 51.3% at level 8), across 399,906 boards from 49,977 ranked matches | Snowflake, SQL (VARIANT / LATERAL FLATTEN), Power BI | [tft-snowflake](https://github.com/benman17/tft-snowflake) |
| Northstar Commerce | Electronics margin eroded by 7.62% average discounting and a 7.26% return rate; $231k in Unassigned products at 22.28% margin vs 38.57% | PostgreSQL, star schema, Power BI, DAX | [northstar-commerce](https://github.com/benman17/northstar-commerce) |
| NFL Player Clustering | 163 players split into four draft tiers on Value Over Replacement; 22 in the elite tier | Python, pandas, scikit-learn (K-Means) | [NFL-Clustering](https://github.com/benman17/NFL-Clustering) |
| Woodland Country Manor redesign | Scrum Master for a six-person student team that shipped a client site redesign | Jira, Wix Studio, Scrum | [Live site](https://manguibo.wixstudio.com/woodlandcountrymanor) |

The revenue chart on `/analytics` is a filter-to-SQL demo with sample data and is labeled as such on the page.

## Running locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

### Stress-testing layouts

`data/fixtures/worst.ts` holds realistic worst-case content (long titles, missing fields, long repo names, a long email). Development builds use it when started with:

```bash
NEXT_PUBLIC_PORTFOLIO_FIXTURE=worst npm run dev
NEXT_PUBLIC_PORTFOLIO_FIXTURE=github-empty npm run dev
```

Production builds always use the real data.

## Where things live

- `data/projects.ts`: projects and case-study content
- `lib/stories.ts`: the finding-led headline for each project
- `data/skills.ts`: profile, links and tools
- `components/story/`: the chart, tabs and figure components shared by the case studies
- `PRODUCT.md` and `DESIGN.md`: product context and the design system

## Contact

- Email: [bmanguiat03@gmail.com](mailto:bmanguiat03@gmail.com)
- LinkedIn: [Benjamin Manguiat](https://www.linkedin.com/in/benjamin-manguiat-84340b251/)
- GitHub: [@benman17](https://github.com/benman17)
