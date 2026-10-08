import React from 'react';

/*
 * Top-4 rate by final player level, from the TFT project (Set 3 ranked,
 * Korean server, Platinum to Challenger; 399,906 boards). Same figures as
 * LEVEL_RESULTS in TftSnowflakeWidget. Drawn as plain SVG so the lead chart
 * costs no chart library on the home page.
 */
const LEVELS = [
  { level: 7, top4: 26.9 },
  { level: 8, top4: 51.3 },
  { level: 9, top4: 86.6 },
];

const W = 520;
const ROW = 64;
const BAR = 30;
const LABEL_W = 72;
const TOP = 34;
const PLOT_W = W - LABEL_W - 64;
const H = TOP + ROW * LEVELS.length + 30;
const x = (pct: number) => LABEL_W + (pct / 100) * PLOT_W;

export default function LevelChart() {
  return (
    <figure className="m-0">
      <figcaption className="mb-3 space-y-1">
        <span className="block text-base font-bold text-ink">Top-4 rate by player level at the end of the game</span>
        <span className="block text-sm text-ink-3">Share of boards that finished in the top four of eight</span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="level-chart block h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="level-chart-desc"
      >
        <desc id="level-chart-desc">
          Bar chart. Level 7: 26.9 percent of boards finished top four. Level 8: 51.3 percent. Level 9: 86.6 percent. Half of all boards finish top four by definition.
        </desc>

        {/* 50% reference: four of eight players finish top four in every game */}
        <line x1={x(50)} x2={x(50)} y1={TOP - 14} y2={H - 26} stroke="var(--rule-strong)" strokeDasharray="3 4" />
        <text x={x(50) + 6} y={TOP - 18} className="fill-ink-3 text-[12px] font-semibold">
          Half of all boards
        </text>

        {LEVELS.map((d, i) => {
          const y = TOP + i * ROW + (ROW - BAR) / 2;
          const lead = d.level === 9;
          return (
            <g key={d.level} style={{ '--i': i } as React.CSSProperties}>
              <text x={0} y={y + BAR / 2 + 5} className={`text-[15px] font-semibold ${lead ? 'fill-ink' : 'fill-ink-3'}`}>
                Level {d.level}
              </text>
              <rect
                className="level-bar"
                x={LABEL_W}
                y={y}
                width={x(d.top4) - LABEL_W}
                height={BAR}
                fill={lead ? 'var(--accent)' : 'var(--chart)'}
              />
              <text
                x={x(d.top4) + 8}
                y={y + BAR / 2 + 6}
                className={`tnum text-[17px] ${lead ? 'fill-accent font-extrabold' : 'fill-ink-2 font-semibold'}`}
              >
                {d.top4.toFixed(1)}%
              </text>
            </g>
          );
        })}

        {[0, 25, 50, 75, 100].map((t) => (
          <text key={t} x={x(t)} y={H - 6} textAnchor="middle" className="tnum fill-ink-3 text-[11px]">
            {t}%
          </text>
        ))}
      </svg>

      <p className="mt-3 border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-ink-3">
        Source: 399,906 player boards from 49,977 Set 3 ranked matches (Korean server, Platinum to Challenger), cleaned and queried in Snowflake. Players who are already ahead level faster, so this is an association, not a cause.
      </p>
    </figure>
  );
}
