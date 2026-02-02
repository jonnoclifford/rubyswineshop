'use client';

/**
 * Authentication Button Component
 *
 * A reusable button component that displays login/logout based on auth state.
 * Can be used in any client component to provide authentication controls.
 *
 * Example usage:
 * ```tsx
 * import AuthButton from '@/components/admin/AuthButton';
 *
 * export default function MyComponent() {
 *   return <AuthButton />;
 * }
 * ```
 */

import { useAuth, loginWithGitHub, logout } from '@/lib/hooks/useAuth';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface AuthButtonProps {
  className?: string;
  redirectTo?: string;
}

export default function AuthButton({ className = '', redirectTo }: AuthButtonProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  const handleLogin = () => {
    loginWithGitHub(redirectTo || '/admin');
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <button
        disabled
        className={`flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 bg-zinc-800 rounded-md cursor-not-allowed ${className}`}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading...</span>
      </button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <button
        onClick={handleLogout}
        className={`flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors ${className}`}
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center gap-2 px-4 py-2 text-sm text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors ${className}`}
    >
      <LogIn className="w-4 h-4" />
      <span>Admin Login</span>
    </button>
  );
}
