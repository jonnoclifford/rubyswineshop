'use client';

/**
 * Admin Dashboard Component
 *
 * Full-featured content management system for Ruby's Wine Bar
 */

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BusinessInfoForm } from '@/components/admin/BusinessInfoForm';
import { HeroForm } from '@/components/admin/HeroForm';
import { WineForm } from '@/components/admin/WineForm';
import { EventForm } from '@/components/admin/EventForm';
import { FAQForm } from '@/components/admin/FAQForm';
import { SiteConfig } from '@/types/content';
import { Eye, RefreshCw, LogOut } from 'lucide-react';
import type { GitHubUser } from '@/lib/auth';

interface AdminDashboardProps {
  user: GitHubUser;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load site config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/config');
      const data = await response.json();
      setSiteConfig(data);
    } catch (error) {
      console.error('Failed to load config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionSave = async <K extends keyof SiteConfig>(section: K, data: SiteConfig[K]) => {
    if (!siteConfig) return;

    const updatedConfig = {
      ...siteConfig,
      [section]: data
    };

    setSiteConfig(updatedConfig);

    // Auto-save
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig)
      });

      if (response.ok) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-terracotta" />
          <p className="text-lg text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!siteConfig) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Configuration</CardTitle>
            <CardDescription>
              Unable to load site configuration. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loadConfig} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-serif font-bold text-navy">Ruby&apos;s Admin</h1>
              <p className="text-sm text-gray-500">
                Content Management System
              </p>
            </div>

            <div className="flex items-center gap-3">
              {user.name && (
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.name}
                </span>
              )}

              {lastSaved && (
                <span className="text-sm text-gray-500 hidden md:inline">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}

              {isSaving && (
                <span className="text-sm text-terracotta flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              )}

              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview Site</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to the Admin Panel</CardTitle>
            <CardDescription>
              Manage your website content here. Changes are saved automatically when you
              submit each form. Use the &quot;Preview Site&quot; button to see your changes live.
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="menu">Wine Menu</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Manage your business details, contact information, and opening hours.
                    This information appears in multiple places across your site.
                  </CardDescription>
                </CardHeader>
              </Card>
              <BusinessInfoForm
                initialData={siteConfig.business}
                onSave={(data) => handleSectionSave('business', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>
                    Edit the main banner at the top of your homepage - the first thing
                    visitors see when they land on your site.
                  </CardDescription>
                </CardHeader>
              </Card>
              <HeroForm
                initialData={siteConfig.hero}
                onSave={(data) => handleSectionSave('hero', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="menu">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wine Menu</CardTitle>
                  <CardDescription>
                    Update your wine list. Keep it fresh to encourage repeat visits!
                    Organize wines by glass and bottle, with categories for bottles.
                  </CardDescription>
                </CardHeader>
              </Card>
              <WineForm
                initialData={siteConfig.menu}
                onSave={(data) => handleSectionSave('menu', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Events & Happenings</CardTitle>
                  <CardDescription>
                    Promote your events, tastings, and special occasions. Mark recurring
                    events to show they happen regularly.
                  </CardDescription>
                </CardHeader>
              </Card>
              <EventForm
                initialData={siteConfig.whatsOn}
                onSave={(data) => handleSectionSave('whatsOn', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Answer common questions to help visitors find information quickly.
                    This reduces the number of repeat questions you get.
                  </CardDescription>
                </CardHeader>
              </Card>
              <FAQForm
                initialData={siteConfig.faq}
                onSave={(data) => handleSectionSave('faq', data)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Ruby&apos;s Wine Bar Admin Panel &middot; Need help? Contact your developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
