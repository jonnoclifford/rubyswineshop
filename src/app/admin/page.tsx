/**
 * Admin Dashboard Page
 *
 * This is the main admin interface. It requires authentication
 * via GitHub OAuth to access.
 */

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Shop Dashboard - Ruby\'s Wine Bar',
  description: 'Content management dashboard',
};

export default async function AdminPage() {
  // Check authentication on server side
  const user = await getCurrentUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/admin/login');
  }

  return <AdminDashboard user={user} />;
}
