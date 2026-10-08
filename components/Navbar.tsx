'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROFILE_INFO } from '@/data/skills';

const LINKS = [
  { name: 'Work', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Code', href: '/github', wideOnly: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 supports-[backdrop-filter]:bg-paper/85 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-8">
        <Link href="/" className="whitespace-nowrap text-base font-extrabold tracking-[-0.01em] text-ink sm:text-[1.0625rem]">
          Ben Manguiat
        </Link>

        <nav aria-label="Main" className="flex items-center gap-3.5 whitespace-nowrap text-sm font-semibold min-[375px]:gap-5 sm:gap-7 sm:text-[0.9375rem]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`${link.wideOnly ? 'hidden sm:inline-flex' : 'inline-flex'} min-h-11 items-center underline-offset-[0.45em] transition-colors duration-150 ${
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
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
