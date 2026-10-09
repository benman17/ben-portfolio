'use client';

/*
 * Adapted from React Bits <ScrollVelocity> (github.com/DavidHDev/react-bits,
 * MIT + Commons Clause; see ./LICENSE.md). Ported from motion/react to the
 * GSAP ticker, reading scroll velocity from Lenis. Screen readers get the
 * items once as a list; the moving copies are decorative. Under
 * prefers-reduced-motion the row sits still.
 */
import React, { useRef } from 'react';
import { gsap, useGSAP, motionAllowed } from '@/lib/gsap';
import { getLenis } from '@/components/motion/SmoothScroll';

interface ScrollVelocityProps {
  items: string[];
  label: string;
  /** Base drift in px per second; negative drifts right. */
  velocity?: number;
  className?: string;
}

export default function ScrollVelocity({ items, label, velocity = 40, className = '' }: ScrollVelocityProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>('[data-track]');
      const copy = track?.firstElementChild as HTMLElement | null;
      if (!track || !copy || !motionAllowed()) return;

      let x = 0;
      let dir = Math.sign(velocity) || 1;
      const setX = gsap.quickSetter(track, 'x', 'px');
      const tick = (_t: number, deltaMs: number) => {
        const width = copy.offsetWidth;
        if (!width) return;
        const v = getLenis()?.velocity ?? 0;
        if (v !== 0) dir = v > 0 ? Math.sign(velocity) : -Math.sign(velocity);
        // Scrolling speeds the drift up; the faster, the harder.
        const boost = 1 + Math.min(Math.abs(v) * 0.25, 6);
        x -= dir * Math.abs(velocity) * boost * (deltaMs / 1000);
        x = gsap.utils.wrap(-width, 0, x);
        setX(x);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: ref, dependencies: [velocity] },
  );

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-5 sm:px-8">{item}</span>
          <span className="h-2 w-2 shrink-0 bg-accent sm:h-2.5 sm:w-2.5" />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <ul className="sr-only" aria-label={label}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden data-track className="flex w-max whitespace-nowrap will-change-transform">
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
