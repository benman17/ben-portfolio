# Ben Manguiat — Interactive Portfolio & Analytics Platform

> **Turning raw data and ideas into organized, actionable outcomes.**

An interactive web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, and the **GitHub REST API**. Designed to showcase data engineering pipelines, machine learning clustering models, executive Power BI / Tableau dashboards, and Agile Scrum Master project delivery.

---

## 🌟 Key Features & Interactive Showcases

### 🏈 1. NFL Player Performance & Archetype Clustering
- **Interactive PCA & K-Means Scatter Plot**: Explore player archetype distributions (Deep Threat Speedsters, YAC Specialists, Hybrid Backs, Red-Zone Anchors) derived from PySpark MLlib clustering models (`Silhouette Score: 0.72`, `92% PCA Variance`).
- **Interactive Tooltips**: Inspect individual player metrics including Top Sprint Speed (mph), Yards After Catch (YAC), and Average Depth of Target (ADOT).

### 📊 2. Executive BI Revenue & Churn Sandbox
- **Dynamic Recharts Visualization**: Filter revenue trends, order volume, and customer churn rates across Enterprise and Mid-Market segments.
- **Auto-Generated SQL Query Viewer**: Live preview of underlying PostgreSQL analytical queries using Window functions and CTEs.

### 🧩 3. Interactive Agile Scrum Kanban Simulator
- **Sprint 4 Kanban Board**: Drag/advance user stories across `Backlog` → `To Do` → `In Progress` → `Done` (Definition of Done).
- **Agile Metrics HUD**: Real-time tracking of team velocity (42 story points/sprint) and INVEST-compliant Acceptance Criteria.

### 🌐 4. Featured Project Case Studies
- **Woodland Country Manor Redesign**: Agile web overhaul with live website link ([`manguibo.wixstudio.com/woodlandcountrymanor`](https://manguibo.wixstudio.com/woodlandcountrymanor)).
- **Sales Intelligence & Revenue Analytics**: End-to-end SQL & Python ETL pipeline.
- **Supply Chain & Inventory Optimization**: Python safety stock forecasting engine.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript (Strict type checking) |
| **Styling** | Tailwind CSS v4, Glassmorphism Tokens, Custom Grid Mesh |
| **Visualizations** | Recharts (Area, Scatter, Composed Bar/Line Charts) |
| **Icons & Social** | Lucide React, Custom SVG Brand Icons |
| **Integration** | GitHub REST API (`@benman17`) |

---

## 🚀 Local Setup & Development

### 1. Prerequisites
- **Node.js**: `v20.9+` or `v24.x`
- **npm**: `v10.x` or `v11.x`

### 2. Installation & Running
```bash
# Navigate to project root
cd "Website Port"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Verification
```bash
npm run build
```

---

## 👤 Author & Contact

**Ben Manguiat** — *Information Systems • Data Analytics • Scrum Master*

- **GitHub**: [@benman17](https://github.com/benman17)
- **LinkedIn**: [Benjamin Manguiat](https://www.linkedin.com/in/benjamin-manguiat-84340b251/)
- **Email**: [bmanguiat03@gmail.com](mailto:bmanguiat03@gmail.com)
