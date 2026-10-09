'use client';

import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, useGSAP, motionAllowed } from '@/lib/gsap';

/**
 * The house chart's one authored moment: bars draw in from the left the
 * first time they scroll into view. Values and labels never move, so the
 * numbers read at t=0. Bars mounted later (a tab switch) are not picked up,
 * so switching tabs never replays the draw.
 */
export default function BarDraw() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!motionAllowed()) return;
      const bars = gsap.utils.toArray<HTMLElement>('.level-bar, .bar-fill');
      if (!bars.length) return;

      gsap.set(bars, { scaleX: 0.04, transformOrigin: 'left center' });
      ScrollTrigger.batch(bars, {
        start: 'top 97%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { scaleX: 1, duration: 0.8, ease: 'expo.out', stagger: 0.07, overwrite: true }),
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
