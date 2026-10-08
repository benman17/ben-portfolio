'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PROFILE_INFO } from '@/data/skills';

/**
 * The address as a mailto link plus a one-click copy. Copy matters because
 * many recruiters read on machines with no mail client configured.
 */
export default function CopyEmail({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_INFO.email);
      setState('copied');
    } catch {
      setState('failed');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2000);
  };

  const label = state === 'copied' ? 'Copied' : state === 'failed' ? 'Press Ctrl+C' : 'Copy';

  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
      <a
        href={`mailto:${PROFILE_INFO.email}`}
        className={`link font-semibold break-all ${size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base'}`}
      >
        {PROFILE_INFO.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-9 items-center gap-1.5 border border-rule-strong px-2.5 text-sm font-semibold text-ink-2 transition-[color,border-color,transform] duration-150 ease-out-expo hover:border-ink hover:text-ink active:scale-[0.97]"
        aria-label={`Copy email address ${PROFILE_INFO.email}`}
      >
        {state === 'copied' ? <Check className="pop-in h-3.5 w-3.5 text-accent" strokeWidth={2} aria-hidden /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />}
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? 'Email address copied' : state === 'failed' ? 'Copy failed. Select the address and copy it manually.' : ''}
      </span>
    </span>
  );
}
