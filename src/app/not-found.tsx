import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Not found</div>
      <h1 className="mt-4 text-4xl font-semibold text-white">This page is not available.</h1>
      <p className="mt-4 text-sm leading-6 text-slate-400">
        The requested destination could not be located. Use the main navigation to continue exploring.
      </p>
      <Link href="/" className="mt-8 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950">
        Return to home
      </Link>
    </div>
  );
}
