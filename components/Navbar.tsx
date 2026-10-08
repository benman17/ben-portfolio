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
        <Link href="/" className="text-[1.0625rem] font-extrabold tracking-[-0.01em] text-ink">
          Ben Manguiat
        </Link>

        <nav aria-label="Main" className="flex items-center gap-5 text-[0.9375rem] font-semibold sm:gap-7">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`${link.wideOnly ? 'hidden sm:inline' : ''} py-2 underline-offset-[0.45em] transition-colors duration-150 ${
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
            className="py-2 text-accent underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
          >
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
