'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROFILE_INFO } from '@/data/skills';
import { gsap, ScrollTrigger, useGSAP, motionAllowed } from '@/lib/gsap';
import ScrollProgress from '@/components/motion/ScrollProgress';

const LINKS = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Code', href: '/github' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const ref = useRef<HTMLElement>(null);

  // Tuck the header away while reading down; bring it back on any scroll up
  // or when focus lands inside it.
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionAllowed()) return;
      const show = () => gsap.to(el, { yPercent: 0, duration: 0.35, ease: 'expo.out', overwrite: true });
      const hide = () => gsap.to(el, { yPercent: -100, duration: 0.35, ease: 'expo.out', overwrite: true });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (el.contains(document.activeElement)) return show();
          if (self.direction === 1 && self.scroll() > 160) hide();
          else if (self.direction === -1) show();
        },
      });
      el.addEventListener('focusin', show);
      return () => el.removeEventListener('focusin', show);
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="sticky top-0 z-40 border-b border-rule bg-paper/95 supports-[backdrop-filter]:bg-paper/85 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-8">
        <Link href="/" className="whitespace-nowrap text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink sm:text-[1.0625rem]">
          Ben Manguiat
        </Link>

        <nav aria-label="Main" className="flex items-center gap-2.5 whitespace-nowrap text-[0.8125rem] font-semibold min-[360px]:gap-3 min-[360px]:text-sm min-[400px]:gap-5 sm:gap-7 sm:text-[0.9375rem]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center underline-offset-[0.45em] transition-colors duration-150 ${
                isActive(link.href)
                  ? 'text-ink underline decoration-2 decoration-accent'
                  : 'text-ink-3 hover:text-ink'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={`mailto:${PROFILE_INFO.email}`}
            className="inline-flex min-h-11 items-center text-accent underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
          >
            <span>Email<span className="max-[359px]:hidden"> me</span></span>
          </a>
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
}
