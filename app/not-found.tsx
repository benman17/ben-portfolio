import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-8 sm:pt-20">
      <h1 className="text-4xl font-extrabold tracking-[-0.025em] text-ink sm:text-5xl">Page not found</h1>
      <p className="prose-body mt-4 max-w-[48ch] text-xl">
        This address doesn&apos;t match anything on the site. The work is all one click away.
      </p>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
        <Link href="/projects" className="link">All work</Link>
        <Link href="/" className="link">Home</Link>
      </p>
    </div>
  );
}
