import React from 'react';

/*
 * Top-4 rate by final player level, from the TFT project (Set 3 ranked,
 * Korean server, Platinum to Challenger; 399,906 boards). Same figures as
 * the project's level results. Built from HTML boxes rather than a scaled
 * SVG so labels keep their real size on phones, and the home page carries
 * no chart library.
 */
const LEVELS = [
  { level: 7, top4: 26.9 },
  { level: 8, top4: 51.3 },
  { level: 9, top4: 86.6 },
];

const TICKS = [0, 25, 50, 75, 100];

export default function LevelChart() {
  return (
    <figure className="m-0">
      <figcaption className="mb-4 space-y-1">
        <span className="block text-base font-bold text-ink">Top-4 rate by player level at the end of the game</span>
        <span className="block text-sm text-ink-3">Share of boards that finished in the top four of eight</span>
      </figcaption>

      <div
        role="img"
        aria-label="Bar chart. Level 7: 26.9 percent of boards finished top four. Level 8: 51.3 percent. Level 9: 86.6 percent. Half of all boards finish top four by definition."
        className="grid grid-cols-[4.25rem_1fr]"
      >
        {/* Reference label row */}
        <span aria-hidden />
        <div aria-hidden className="relative mr-14 h-6">
          <span className="absolute bottom-1 left-1/2 whitespace-nowrap pl-1.5 text-xs font-semibold text-ink-3">
            Half of all boards
          </span>
        </div>

        {LEVELS.map((d, i) => {
          const lead = d.level === 9;
          return (
            <React.Fragment key={d.level}>
              <span aria-hidden className={`flex h-14 items-center text-[0.9375rem] font-semibold ${lead ? 'text-ink' : 'text-ink-3'}`}>
                Level {d.level}
              </span>
              <div aria-hidden className="relative mr-14 flex h-14 items-center">
                <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-rule-strong" />
                <span
                  className={`level-bar relative h-[30px] shrink-0 ${lead ? 'bg-accent' : 'bg-chart'}`}
                  style={{ width: `${d.top4}%`, '--i': i } as React.CSSProperties}
                />
                <span
                  className={`tnum relative ml-2 whitespace-nowrap text-[1.0625rem] ${lead ? 'font-extrabold text-accent' : 'font-semibold text-ink-2'}`}
                >
                  {d.top4.toFixed(1)}%
                </span>
              </div>
            </React.Fragment>
          );
        })}

        {/* Axis ticks */}
        <span aria-hidden />
        <div aria-hidden className="relative mr-14 h-6">
          {TICKS.map((t) => (
            <span key={t} className="tnum absolute top-1.5 -translate-x-1/2 text-xs text-ink-3" style={{ left: `${t}%` }}>
              {t}%
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-ink-3">
        Source: 399,906 player boards from 49,977 Set 3 ranked matches (Korean server, Platinum to Challenger), cleaned and queried in Snowflake. Players who are already ahead level faster, so this is an association, not a cause.
      </p>
    </figure>
  );
}
