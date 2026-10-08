'use client';

import React, { useId, useRef, useState } from 'react';

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * WAI-ARIA tabs: arrow keys move between tabs, Home/End jump, the panel is
 * labelled by its tab. Styled as a row of underlined labels, newsroom style.
 */
export default function Tabs({ tabs, label }: { tabs: TabDef[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  // After the first switch, chart draw-ins stop replaying when a panel is shown again.
  const [touched, setTouched] = useState(false);
  const select = (id: string) => {
    setActive(id);
    setTouched(true);
  };
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    select(tabs[n].id);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); focusTab(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); focusTab(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusTab(0); }
    else if (e.key === 'End') { e.preventDefault(); focusTab(tabs.length - 1); }
  };

  return (
    <div data-touched={touched || undefined}>
      <div role="tablist" aria-label={label} className="flex gap-6 overflow-x-auto border-b border-rule">
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              type="button"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`-mb-px min-h-11 shrink-0 border-b-2 text-[0.9375rem] font-semibold transition-colors duration-150 ${
                selected ? 'border-accent text-ink' : 'border-transparent text-ink-3 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="pt-6 focus-visible:outline-offset-8"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
