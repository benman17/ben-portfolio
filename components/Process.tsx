import React from 'react';
import { METHODOLOGY_STEPS } from '@/data/projects';

/** The working process as a readable ordered list: each step, what it uses, what it produces. */
export default function Process({ kind }: { kind: 'analytics' | 'scrum' }) {
  return (
    <ol className="border-t-2 border-ink">
      {METHODOLOGY_STEPS[kind].map((step, i) => (
        <li key={step.title} className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="tnum text-sm font-bold text-ink-3">{i + 1}</p>
            <h3 className="mt-1 text-lg font-bold leading-snug text-ink">{step.title}</h3>
          </div>
          <div className="md:col-span-8">
            <p className="prose-body text-[1.0625rem]">{step.description}</p>
            <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
              <div>
                <dt className="inline text-ink-3">Uses: </dt>
                <dd className="inline text-ink-2">{step.tools.join(', ')}</dd>
              </div>
              <div>
                <dt className="inline text-ink-3">Produces: </dt>
                <dd className="inline font-semibold text-ink">{step.deliverable}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
