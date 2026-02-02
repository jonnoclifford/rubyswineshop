'use client';

/**
 * Login Form Component
 *
 * Provides a user-friendly interface for GitHub OAuth authentication.
 * Displays error messages if authentication fails.
 */

import { useEffect, useState } from 'react';
import { Github, ShieldAlert, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  error?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  invalid_callback: 'Invalid authentication callback. Please try again.',
  unauthorized: 'You are not authorized to access this admin panel.',
  server_error: 'An error occurred during authentication. Please try again.',
};

export default function LoginForm({ error }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(ERROR_MESSAGES[error] || 'Authentication failed. Please try again.');
    }
  }, [error]);

  const handleLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);
    // Redirect will happen, so loading state will persist
    window.location.href = '/api/auth/github?redirect=/admin';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
            <ShieldAlert className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Access</h1>
          <p className="mt-2 text-zinc-400">
            Ruby&apos;s Wine Bar Content Management
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-500">
                  Authentication Failed
                </h3>
                <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg p-8 shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold text-white">
                Secure Authentication
              </h2>
              <p className="text-sm text-zinc-400">
                Sign in with your authorized GitHub account to access the admin panel.
              </p>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-800 disabled:cursor-not-allowed border border-zinc-700 rounded-lg text-white font-medium transition-colors duration-200 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            <div className="pt-4 border-t border-zinc-700 space-y-2 text-xs text-zinc-500 text-center">
              <p>
                Only authorized GitHub users can access this area.
              </p>
              <p>
                Your authentication is secured with OAuth 2.0.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-zinc-600">
          <p>Protected by GitHub OAuth 2.0</p>
          <p className="mt-1">Sessions expire after 7 days</p>
        </div>
      </div>
    </div>
  );
}
