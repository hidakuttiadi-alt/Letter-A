import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-[2.25rem] font-black text-burgundy-950 mb-2">404 — Page Not Found</h2>
      <p className="text-[1rem] text-[#55474B] mb-6">The centenary section you requested does not exist or has moved.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-burgundy-800 text-gold-200 font-bold text-[0.875rem] shadow"
      >
        Return to Home
      </Link>
    </div>
  );
}
