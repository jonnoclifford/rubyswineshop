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
import { AboutForm } from '@/components/admin/AboutForm';
import { WineForm } from '@/components/admin/WineForm';
import { EventForm } from '@/components/admin/EventForm';
import { FAQForm } from '@/components/admin/FAQForm';
import { FoodForm } from '@/components/admin/FoodForm';
import { FindUsForm } from '@/components/admin/FindUsForm';
import { SEOForm } from '@/components/admin/SEOForm';
import { NavigationForm } from '@/components/admin/NavigationForm';
import { FormBuilder } from '@/components/admin/FormBuilder';
import { SectionSettingsForm } from '@/components/admin/SectionSettingsForm';
import { VersionHistory } from '@/components/admin/VersionHistory';
import { ThemeSelector, getStoredTheme } from '@/components/admin/ThemeSelector';
import { SiteConfig } from '@/types/content';
import type { CustomForm } from '@/types/form-builder';
import { Eye, RefreshCw, LogOut, Building2, Sparkles, Wine, Calendar, HelpCircle, ImageIcon, LayoutDashboard, UtensilsCrossed, User, MapPin, Search, Menu as MenuIcon, FormInput, Loader2 } from 'lucide-react';
import type { GitHubUser } from '@/lib/auth';
import { EnhancedImageManager } from '@/components/admin/EnhancedImageManager';
import { ensureConfigVersion } from '@/lib/migrate-config';
import '@/styles/admin-themes.css';

interface AdminDashboardProps {
  user: GitHubUser;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('jaunt');

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setCurrentTheme(savedTheme);
  }, []);

  // Load site config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/config');
      const data = await response.json();
      // Ensure config has all required fields including sectionSettings
      const migratedConfig = ensureConfigVersion(data);
      setSiteConfig(migratedConfig);
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
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-terracotta" />
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
    <div className={`theme-${currentTheme} admin-themed min-h-screen`}>
      {/* Admin Header */}
      <header className="admin-header border-b border-terracotta/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
                <Wine className="h-7 w-7 text-cream" />
              </div>
              <div>
                <h1 className="text-2xl font-sans font-bold text-cream">Ruby&apos;s Wine Shop Admin</h1>
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

              <ThemeSelector
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />

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
        <Card className="mb-8 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-3 rounded-xl shadow-md">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-sans mb-2">Welcome to Your Admin Panel</CardTitle>
                <CardDescription className="text-base">
                  Manage your website content here. Changes are saved automatically and deployed live within minutes.
                  Use the <strong>Preview</strong> button to see your changes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="layout" className="space-y-8">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 auto-rows-auto w-full h-auto bg-transparent shadow-none border-none p-3 gap-3 mb-6">
            <TabsTrigger value="layout" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="header" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <MenuIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Header</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <Wine className="h-4 w-4" />
              <span className="hidden sm:inline">Wines</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">Food</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="findus" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Find Us</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <FormInput className="h-4 w-4" />
              <span className="hidden sm:inline">Forms</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2 px-4 py-2.5 rounded-lg border transition-all shadow-sm">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <LayoutDashboard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Layout & Style</CardTitle>
                      <CardDescription className="mt-1">
                        Control which sections appear on your site and customize their color schemes.
                        Turn sections on or off, and choose different color combinations for each section.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              {siteConfig.sectionSettings && (
                <SectionSettingsForm
                  initialData={siteConfig.sectionSettings}
                  onSave={(data) => handleSectionSave('sectionSettings', data)}
                />
              )}

              {/* Version History */}
              <VersionHistory />
            </div>
          </TabsContent>

          <TabsContent value="header">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <MenuIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Header & Navigation</CardTitle>
                      <CardDescription className="mt-1">
                        Manage your site header - logo, navigation menu, and call-to-action button.
                        Drag navigation items to reorder them.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <NavigationForm
                initialData={siteConfig.header}
                onSave={(data) => handleSectionSave('header', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="business">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Business Information</CardTitle>
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
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Hero Section</CardTitle>
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

          <TabsContent value="about">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">About Section</CardTitle>
                      <CardDescription className="mt-1">
                        Share your story with rich formatting. Add multiple paragraphs,
                        bold text, links, and more.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <AboutForm
                initialData={siteConfig.about}
                onSave={(data) => handleSectionSave('about', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="menu">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Wine className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Wine Menu</CardTitle>
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

          <TabsContent value="food">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <UtensilsCrossed className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Food Section</CardTitle>
                      <CardDescription className="mt-1">
                        Manage information about food options, partnerships, and snacks.
                        Perfect for promoting food partners or BYO policies.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <FoodForm
                initialData={siteConfig.hungry}
                onSave={(data) => handleSectionSave('hungry', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Events & Happenings</CardTitle>
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
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Frequently Asked Questions</CardTitle>
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

          <TabsContent value="findus">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Find Us</CardTitle>
                      <CardDescription className="mt-1">
                        Manage your location section - map, storefront image, and section headings.
                        Contact details and hours are edited in the Business Info tab.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <FindUsForm
                initialData={siteConfig.findUs}
                onSave={(data) => handleSectionSave('findUs', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">SEO Settings</CardTitle>
                      <CardDescription className="mt-1">
                        Optimize your site for search engines and social media.
                        These settings help your site rank better in Google and look great when shared.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <SEOForm
                initialData={siteConfig.seo}
                onSave={(data) => handleSectionSave('seo', data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="forms">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <FormInput className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Form Builder</CardTitle>
                      <CardDescription className="mt-1">
                        Create custom forms for contact, newsletter signup, reservations, and more.
                        Forms can be embedded anywhere on your site.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <FormBuilder
                initialForms={siteConfig.forms?.forms || []}
                onSave={(forms) => handleSectionSave('forms', { forms })}
              />
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta/80 p-2 rounded-lg">
                      <ImageIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-sans">Image Library</CardTitle>
                      <CardDescription className="mt-1">
                        Upload and manage images for your website. Copy image paths to use in content or share on social media.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <EnhancedImageManager />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wine className="h-4 w-4" />
              <p className="text-sm font-medium">
                Ruby&apos;s Wine Shop Admin Panel
              </p>
            </div>
            <p className="text-xs opacity-60">
              Powered by Jaunt Studio CMS · Need help? Contact your developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
