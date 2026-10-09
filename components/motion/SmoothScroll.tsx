'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, motionAllowed } from '@/lib/gsap';

let instance: Lenis | null = null;

/** Current Lenis instance, or null when the visitor prefers reduced motion. */
export function getLenis() {
  return instance;
}

/**
 * Lenis smooth scrolling on the page's own scroll (no wrapper div, so sticky,
 * anchors and find-in-page keep working), driven by GSAP's ticker so
 * ScrollTrigger and Lenis read the same frame. Skipped entirely under
 * prefers-reduced-motion; touch input keeps native momentum (Lenis default).
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionAllowed()) return;

    const lenis = new Lenis({
      lerp: 0.11,
      anchors: { offset: -72 },
      autoRaf: false,
    });
    instance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  // New page: Lenis must forget the old target, and triggers re-measure.
  useEffect(() => {
    instance?.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
