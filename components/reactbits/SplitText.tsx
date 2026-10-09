'use client';

/*
 * Adapted from React Bits <SplitText> (github.com/DavidHDev/react-bits,
 * MIT + Commons Clause). Changes for this site: left-aligned block text,
 * a line-mask reveal instead of per-character fades so a headline is
 * readable within ~0.7s, GSAP SplitText's built-in aria labelling, an
 * immediate (not scroll-gated) mode for above-the-fold headlines, and no
 * motion at all under prefers-reduced-motion.
 */
import React, { useRef } from 'react';
import { gsap, SplitText as GSAPSplitText, useGSAP, motionAllowed } from '@/lib/gsap';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

export interface SplitTextProps {
  text: string;
  tag?: Tag;
  id?: string;
  className?: string;
  /** Seconds between lines. */
  stagger?: number;
  duration?: number;
  /** Seconds before the first line moves. */
  delay?: number;
  /** Play on mount (above the fold) rather than when scrolled into view. */
  immediate?: boolean;
}

export default function SplitText({
  text,
  tag: Tag = 'p',
  id,
  className = '',
  stagger = 0.08,
  duration = 0.9,
  delay = 0,
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (!motionAllowed()) {
        gsap.set(el, { visibility: 'visible' });
        return;
      }

      let split: GSAPSplitText | undefined;
      let cancelled = false;
      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = GSAPSplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { visibility: 'visible' });
            return gsap.from(self.lines, {
              yPercent: 105,
              duration,
              delay,
              stagger,
              ease: 'expo.out',
              scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <Tag ref={ref as React.Ref<never>} id={id} data-split className={className}>
      {text}
    </Tag>
  );
}
