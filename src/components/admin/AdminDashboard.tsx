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
import { Eye, RefreshCw, LogOut, Building2, Sparkles, Wine, Calendar, HelpCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Wine className="h-16 w-16 mx-auto mb-4 text-terracotta/20" />
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-terracotta absolute top-4 left-1/2 -translate-x-1/2" />
          </div>
          <p className="text-lg font-medium text-gray-700">Loading your admin panel...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-navy via-navy to-terracotta/90 border-b border-terracotta/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
                <Wine className="h-7 w-7 text-cream" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-cream">Ruby&apos;s Wine Bar Admin</h1>
                <p className="text-xs text-cream/70">
                  Content Management System - by Jaunt Studio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user.name && (
                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-cream font-medium">
                    {user.name}
                  </span>
                </div>
              )}

              {lastSaved && (
                <span className="text-xs text-cream/60 hidden md:inline bg-white/5 px-2 py-1 rounded">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}

              {isSaving && (
                <span className="text-sm text-cream flex items-center gap-2 bg-terracotta/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              )}

              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
                className="gap-2 bg-white/10 border-white/20 text-cream hover:bg-white/20 hover:text-white transition-all"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 bg-white/10 border-white/20 text-cream hover:bg-white/20 hover:text-white transition-all"
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
        <Card className="mb-8 shadow-lg border-terracotta/10 bg-gradient-to-br from-white to-cream/30">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-3 rounded-xl shadow-md">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-serif text-navy mb-2">Welcome to Your Admin Panel</CardTitle>
                <CardDescription className="text-base">
                  Manage your website content here. Changes are saved automatically and deployed live within minutes.
                  Use the <strong>Preview</strong> button to see your changes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-white shadow-md border border-gray-100 p-1">
            <TabsTrigger value="business" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-terracotta data-[state=active]:to-terracotta/80 data-[state=active]:text-white transition-all">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Business Info</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-terracotta data-[state=active]:to-terracotta/80 data-[state=active]:text-white transition-all">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-terracotta data-[state=active]:to-terracotta/80 data-[state=active]:text-white transition-all">
              <Wine className="h-4 w-4" />
              <span className="hidden sm:inline">Wines</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-terracotta data-[state=active]:to-terracotta/80 data-[state=active]:text-white transition-all">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-terracotta data-[state=active]:to-terracotta/80 data-[state=active]:text-white transition-all">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <div className="space-y-4">
              <Card className="shadow-md border-terracotta/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-navy">Business Information</CardTitle>
                      <CardDescription className="mt-1">
                        Manage your business details, contact information, and opening hours.
                        This information appears in multiple places across your site.
                      </CardDescription>
                    </div>
                  </div>
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
              <Card className="shadow-md border-terracotta/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-navy">Hero Section</CardTitle>
                      <CardDescription className="mt-1">
                        Edit the main banner at the top of your homepage - the first thing
                        visitors see when they land on your site.
                      </CardDescription>
                    </div>
                  </div>
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
              <Card className="shadow-md border-terracotta/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Wine className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-navy">Wine Menu</CardTitle>
                      <CardDescription className="mt-1">
                        Update your wine list. Keep it fresh to encourage repeat visits!
                        Organize wines by glass and bottle, with categories for bottles.
                      </CardDescription>
                    </div>
                  </div>
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
              <Card className="shadow-md border-terracotta/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-navy">Events & Happenings</CardTitle>
                      <CardDescription className="mt-1">
                        Promote your events, tastings, and special occasions. Mark recurring
                        events to show they happen regularly.
                      </CardDescription>
                    </div>
                  </div>
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
              <Card className="shadow-md border-terracotta/10">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif text-navy">Frequently Asked Questions</CardTitle>
                      <CardDescription className="mt-1">
                        Answer common questions to help visitors find information quickly.
                        This reduces the number of repeat questions you get.
                      </CardDescription>
                    </div>
                  </div>
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
      <footer className="bg-gradient-to-r from-navy/95 to-terracotta/90 border-t border-terracotta/20 mt-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wine className="h-4 w-4 text-cream" />
              <p className="text-sm text-cream font-medium">
                Ruby&apos;s Wine Bar Admin Panel
              </p>
            </div>
            <p className="text-xs text-cream/60">
              Powered by Jaunt Studio CMS · Need help? Contact your developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
