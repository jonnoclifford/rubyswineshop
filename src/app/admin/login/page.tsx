/**
 * Admin Login Page
 *
 * This page provides a login interface for admin users.
 * Users authenticate via GitHub OAuth.
 */

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Admin Login - Ruby\'s Wine Bar',
  description: 'Secure admin access',
};

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // If already authenticated, redirect to admin dashboard
  const user = await getCurrentUser();
  if (user) {
    redirect('/admin');
  }

  const params = await searchParams;
  const authError = params.auth_error as string | undefined;

  return <LoginForm error={authError} />;
}
