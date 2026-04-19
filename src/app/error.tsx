'use client';

import { useEffect } from 'react';

import { ButtonLink } from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-200">
        An unexpected issue occurred
      </div>
      <h2 className="mt-6 text-3xl font-semibold text-white">We could not load this view.</h2>
      <p className="mt-4 text-sm leading-6 text-slate-400">
        The experience is safe to retry. If the issue persists, check the local setup or seeded data.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950"
        >
          Retry
        </button>
        <ButtonLink variant="secondary" href="/">
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}
