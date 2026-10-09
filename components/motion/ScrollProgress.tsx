'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** A 2px vermilion reading-progress rule along the bottom of the header. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const set = gsap.quickSetter(el, 'scaleX');
      set(0);
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => set(self.progress),
      });
      set(st.progress);
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={ref} aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent" />;
}
