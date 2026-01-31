'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-display-lg text-navy mb-4">Oops!</h1>
        <h2 className="font-serif text-heading-lg text-navy mb-4">
          Something went wrong
        </h2>
        <p className="text-body-lg text-navy/80 mb-8">
          We spilled the wine. Don&apos;t worry, let&apos;s try that again.
        </p>
        <Button
          onClick={reset}
          className="bg-terracotta hover:bg-terracotta-dark text-cream"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
