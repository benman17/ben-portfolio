'use client';

import React from 'react';
import Tabs from '@/components/story/Tabs';
import BarList from '@/components/story/BarList';
import Figure from '@/components/story/Figure';
import WidgetFrame from '@/components/story/WidgetFrame';
import LevelChart from '@/components/story/LevelChart';

// Computed from the project's raw data (TFT_CSV_DATA.zip): Set 3, Korean ranked,
// Platinum to Challenger. 399,906 player boards / 49,977 matches after removing
// duplicate rows and rows with an invalid placement. Traits with 5,000+ boards.
const TRAIT_RESULTS = [
  { trait: 'Starship', boards: '23.2K', top4: 69.0, avgPlacement: '3.53' },
  { trait: 'Mercenary', boards: '127.3K', top4: 60.6, avgPlacement: '3.94' },
  { trait: 'Valkyrie', boards: '178.6K', top4: 54.9, avgPlacement: '4.24' },
  { trait: 'Mystic', boards: '140.9K', top4: 53.4, avgPlacement: '4.30' },
  { trait: 'Sorcerer', boards: '136.0K', top4: 49.2, avgPlacement: '4.54' },
  { trait: 'Vanguard', boards: '191.0K', top4: 48.1, avgPlacement: '4.59' }
];

const PIPELINE_STEPS = [
  { name: '5 ranked CSVs', desc: 'Platinum, Diamond, Master, Grandmaster and Challenger, about 80K player boards each.' },
  { name: 'Internal stage and file format', desc: 'Files uploaded to a Snowflake stage; the CSV format handles quoted fields, headers and null strings.' },
  { name: 'COPY INTO matches', desc: 'One load per rank tier, tagging each row with its tier and parsing the nested trait and champion text into VARIANT.' },
  { name: 'Analysis queries', desc: 'LATERAL FLATTEN unpacks the trait VARIANT so placement can be aggregated per trait and per player level.' },
  { name: 'Power BI dashboard', desc: 'Live Snowflake connection: KPIs, placement by rank tier, and trait effectiveness.' }
];

function Findings() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
      <LevelChart />
      <div>
        <BarList
          caption="Top-4 rate by trait on the board"
          valueHeader="Top-4 rate"
          max={100}
          reference={{ value: 50, label: 'Half of all boards finish top four. Traits with 5,000+ boards.' }}
          rows={TRAIT_RESULTS.map((t, i) => ({
            label: t.trait,
            sub: `${t.boards} boards, avg ${t.avgPlacement}`,
            value: t.top4,
            display: `${t.top4.toFixed(1)}%`,
            highlight: i === 0,
          }))}
        />
        <p className="mt-4 border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-ink-3">
          These are correlations, not trait strength. Starship is a single 5-cost unit, so it mostly shows up on boards that already reached a high level, and level separates outcomes more than any single trait.
        </p>
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <ol className="max-w-3xl">
      {PIPELINE_STEPS.map((s, i) => (
        <li key={s.name} className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-rule py-3.5 first:border-t-0">
          <span className="tnum pt-0.5 text-sm font-bold text-ink-3">{i + 1}</span>
          <div>
            <p className="font-bold text-ink">{s.name}</p>
            <p className="prose-body mt-0.5 text-base">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function TftSnowflakeWidget() {
  return (
    <WidgetFrame title="The data" note="Set 3 ranked matches, Korean server, Platinum to Challenger.">
      <Tabs
        label="TFT analysis views"
        tabs={[
          { id: 'findings', label: 'Findings', content: <Findings /> },
          {
            id: 'dashboard',
            label: 'Power BI dashboard',
            content: (
              <Figure
                src="/images/projects/tft_snowflake/dashboard.png"
                alt="Power BI dashboard: average placement 4.50, average player level 7.85, win rate and average placement by trait, and player level by rank tier."
                width={1171}
                height={658}
                caption="The Power BI report, connected live to Snowflake."
              />
            ),
          },
          { id: 'pipeline', label: 'Load pipeline', content: <Pipeline /> },
        ]}
      />
    </WidgetFrame>
  );
}
