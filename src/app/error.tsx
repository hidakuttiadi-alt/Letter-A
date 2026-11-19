'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Centenary application error:', error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-[2.25rem] font-black text-burgundy-950 mb-2">Something went wrong</h2>
      <p className="text-[1rem] text-[#55474B] mb-6">An unexpected error occurred while loading this centenary section.</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-burgundy-800 text-gold-200 font-bold text-[0.875rem] shadow"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-white border border-burgundy-200 text-burgundy-900 font-bold text-[0.875rem]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
