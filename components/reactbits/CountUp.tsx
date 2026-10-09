'use client';

/*
 * Adapted from React Bits <CountUp> (github.com/DavidHDev/react-bits,
 * MIT + Commons Clause; see ./LICENSE.md). Ported from motion/react springs
 * to a GSAP tween so the site carries one animation library. The final,
 * real value is what the server renders and what screen readers get; the
 * count only plays once, on scroll into view, when motion is allowed.
 */
import React, { useRef } from 'react';
import { gsap, useGSAP, motionAllowed } from '@/lib/gsap';

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, decimals = 0, suffix = '', duration = 1.6, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const final = format(to);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionAllowed()) return;
      const state = { v: 0 };
      el.textContent = format(0);
      gsap.to(state, {
        v: to,
        duration,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 97%', once: true },
        onUpdate: () => {
          el.textContent = format(state.v);
        },
        onComplete: () => {
          el.textContent = final;
        },
      });
      return () => {
        el.textContent = final;
      };
    },
    { scope: ref, dependencies: [to] },
  );

  return (
    <span className={className}>
      <span aria-hidden ref={ref}>{final}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
