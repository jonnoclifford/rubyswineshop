import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-display-lg text-navy mb-4">404</h1>
        <h2 className="font-serif text-heading-lg text-navy mb-4">
          Page Not Found
        </h2>
        <p className="text-body-lg text-navy/80 mb-8">
          Looks like you&apos;ve wandered off the wine trail. Let&apos;s get you back to the good stuff.
        </p>
        <Button
          asChild
          className="bg-terracotta hover:bg-terracotta-dark text-cream"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
