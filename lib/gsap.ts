'use client';

/**
 * One place to register GSAP plugins so every component shares the same
 * ScrollTrigger instance (and Lenis drives it through SmoothScroll).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Expo ease-out, matching --ease-out-expo in globals.css. */
export const EASE_OUT = 'expo.out';

/** Motion is on unless the visitor asked for less. Checked at call time. */
export function motionAllowed() {
  return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
