---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects/page.tsx","app/projects/[slug]/page.tsx","app/about/page.tsx"]
---

# Surface brief: portfolio site (home, work index, case studies, about)

Scope: whole site redesign. Visitor mode: Experience (the work leads from the first viewport).
Audience/job: recruiters and hiring managers for product, BI and data analyst roles (dream: game data analyst) skimming in about a minute; technical reviewers one click deeper.
Action: open a case study, or email/LinkedIn. Proof: the real TFT, Northstar, NFL and Woodland numbers in data/projects.ts.
Constraints: no invented numbers; content changes need Ben's approval; keep it fast (no new animation libraries).
Approved content changes (2026-10-08): remove/correct fabricated content (Scrum board sprint data, fake GitHub fallback stats, PySpark claims, unverified perf metrics, cohort/regression/ROI methodology); contact becomes email + copy button + LinkedIn; project order TFT, Northstar, NFL, Woodland; portfolio project moves to a footer/colophon link.

## Direction contract

THESIS: Ben's portfolio reads like a short data story. The headline is a finding from his own analysis, not a job title. It refuses the dark terminal dev-portfolio (mono HUD, node maps, three skill pillars).

OWN-WORLD: White page, near-black ink, newsroom grotesk headlines (Libre Franklin, heavy) over a book serif for reading (Source Serif 4). Charts are grey with one vermilion highlight on the value the annotation discusses. Hairline rules, no cards, square corners, tabular figures, real figure captions and source lines.

STORY: In one viewport the visitor learns he finds things in data (level 9 nearly doubles top-4 odds across 49,977 TFT matches in Snowflake), who he is (byline: data analyst, Miami University 2026), and how to reach him. Below, "More analyses" lists each project by its finding.

FIRST VIEWPORT: Left column (about 7/12): headline finding in Libre Franklin, a byline with name, role and email/LinkedIn, a two-sentence standfirst, and a "Read the analysis" link. Right column (5/12): the annotated top-4-by-level bar chart, drawn from the real data, level 9 in vermilion, caption plus "Source: 399,906 boards, Snowflake". On mobile the chart follows the byline.

FORM: Data-journalism explainer, IMPECCABLE'S PICK (rank 1 of 7 grounded list); seed key 09cbfe60.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
