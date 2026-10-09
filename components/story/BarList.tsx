import React from 'react';

export interface BarRow {
  label: string;
  value: number;
  display: string;
  sub?: string;
  highlight?: boolean;
}

/**
 * Horizontal bars as a table so screen readers get rows and columns. One
 * highlighted row carries the accent; the rest stay grey.
 */
export default function BarList({
  rows,
  max,
  caption,
  valueHeader,
  reference,
}: {
  rows: BarRow[];
  max: number;
  caption: string;
  valueHeader: string;
  reference?: { value: number; label: string };
}) {
  return (
    <table className="w-full border-collapse text-[0.9375rem]">
      <caption className="mb-3 text-left text-base font-bold text-ink">{caption}</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">{valueHeader}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.label} style={{ '--i': i } as React.CSSProperties} className="border-t border-rule first:border-t-0">
            <th scope="row" className="w-[42%] py-2.5 pr-3 text-left align-middle font-semibold sm:w-[34%]">
              <span className={r.highlight ? 'text-ink' : 'text-ink-2'}>{r.label}</span>
              {r.sub && <span className="tnum block whitespace-nowrap text-xs font-normal text-ink-3">{r.sub}</span>}
            </th>
            <td className="py-2.5 align-middle">
              <div className="relative flex items-center gap-2.5">
                <div className="relative h-5 flex-1">
                  {reference && (
                    <span
                      aria-hidden
                      className="absolute inset-y-[-6px] w-px border-l border-dashed border-rule-strong"
                      style={{ left: `${(reference.value / max) * 100}%` }}
                    />
                  )}
                  <span
                    aria-hidden
                    className={`bar-fill absolute inset-y-0 left-0 ${r.highlight ? 'bg-accent' : 'bg-chart'}`}
                    style={{ width: `${(r.value / max) * 100}%` }}
                  />
                </div>
                <span className={`tnum w-14 shrink-0 text-right ${r.highlight ? 'font-extrabold text-accent' : 'font-semibold text-ink-2'}`}>
                  {r.display}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {reference && (
        <tfoot>
          <tr>
            <td colSpan={2} className="pt-3 text-[0.8125rem] text-ink-3">
              <span aria-hidden className="mr-1.5 inline-block h-3 w-px translate-y-0.5 border-l border-dashed border-rule-strong" />
              {reference.label}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
