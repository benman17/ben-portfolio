import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

/** A real exported image (dashboard, model diagram, plot) with its caption. */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden border border-rule bg-white">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1152px) 1088px, 100vw" className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.8125rem] leading-relaxed text-ink-3">
        <span>{caption}</span>
        <a href={src} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 font-semibold text-ink-2">
          Full size <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </a>
      </figcaption>
    </figure>
  );
}
