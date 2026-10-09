'use client';

/*
 * Adapted from React Bits <AnimatedContent> (github.com/DavidHDev/react-bits,
 * MIT + Commons Clause; see ./LICENSE.md). Changes for this site: a short
 * 24px rise instead of 100px, content visible in server HTML (the hidden
 * start state is applied only once JS runs and motion is allowed), and the
 * disappear/scale options removed.
 */
import React, { useRef } from 'react';
import { gsap, useGSAP, motionAllowed } from '@/lib/gsap';

interface AnimatedContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: 'div' | 'ul' | 'li' | 'section' | 'article';
  distance?: number;
  duration?: number;
  delay?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
}

export default function AnimatedContent({
  children,
  as: Tag = 'div',
  distance = 24,
  duration = 0.9,
  delay = 0,
  stagger,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionAllowed()) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y: distance,
        autoAlpha: 0,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 97%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<never>} {...props}>
      {children}
    </Tag>
  );
}
