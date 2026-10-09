'use client';

/*
 * Adapted from React Bits <Magnet> (github.com/DavidHDev/react-bits,
 * MIT + Commons Clause; see ./LICENSE.md). Changes for this site: GSAP
 * quickTo instead of a React state update per mousemove, a gentler pull,
 * and inert on touch screens and under prefers-reduced-motion.
 */
import React, { useRef } from 'react';
import { gsap, useGSAP, motionAllowed } from '@/lib/gsap';

interface MagnetProps {
  children: React.ReactNode;
  /** Extra reach around the element, in px, before the pull starts. */
  padding?: number;
  /** Higher is weaker: offset = distance / strength. */
  strength?: number;
  className?: string;
}

export default function Magnet({ children, padding = 60, strength = 5, className = '' }: MagnetProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionAllowed() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const x = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'expo.out' });
      const y = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'expo.out' });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const inside = Math.abs(e.clientX - cx) < r.width / 2 + padding && Math.abs(e.clientY - cy) < r.height / 2 + padding;
        x(inside ? (e.clientX - cx) / strength : 0);
        y(inside ? (e.clientY - cy) / strength : 0);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: ref, dependencies: [padding, strength] },
  );

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="inline-block will-change-transform">{children}</span>
    </span>
  );
}
