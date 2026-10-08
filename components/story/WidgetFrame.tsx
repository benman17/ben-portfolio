import React from 'react';

/** Heading block shared by the case-study widgets. */
export default function WidgetFrame({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="border-t-2 border-ink pt-3">
      <h2 className="text-xl font-extrabold tracking-[-0.01em] text-ink">{title}</h2>
      {note && <p className="mt-1 text-sm text-ink-3">{note}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}
