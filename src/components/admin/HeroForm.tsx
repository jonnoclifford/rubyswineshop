'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import { HeroContent } from '@/types/content';

interface HeroFormProps {
  initialData: HeroContent;
  onSave: (data: HeroContent) => Promise<void>;
}

export function HeroForm({ initialData, onSave }: HeroFormProps) {
  const [formData, setFormData] = useState<HeroContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.headline.trim()) {
      newErrors.headline = 'Headline is required';
    }

    if (!formData.subheadline.trim()) {
      newErrors.subheadline = 'Subheadline is required';
    }

    if (!formData.ctas.primary.text.trim()) {
      newErrors.primaryCta = 'Primary button text is required';
    }

    if (!formData.ctas.secondary.text.trim()) {
      newErrors.secondaryCta = 'Secondary button text is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
      setErrors({});
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>
            The first thing visitors see - make it count!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Main Headline *</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="e.g., Natural wines meet neighbourhood charm"
              className={errors.headline ? 'border-red-500' : ''}
            />
            {errors.headline && <p className="text-sm text-red-500">{errors.headline}</p>}
            <p className="text-xs text-muted-foreground">
              Keep it short and memorable (under 60 characters works best)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheadline">Subheadline *</Label>
            <Textarea
              id="subheadline"
              value={formData.subheadline}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              placeholder="A brief description of what makes your business special"
              rows={3}
              className={errors.subheadline ? 'border-red-500' : ''}
            />
            {errors.subheadline && <p className="text-sm text-red-500">{errors.subheadline}</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>Call-to-Action Buttons</CardTitle>
          <CardDescription>The main actions you want visitors to take</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Primary Button</h4>
            <div className="space-y-2">
              <Label htmlFor="primaryText">Button Text *</Label>
              <Input
                id="primaryText"
                value={formData.ctas.primary.text}
                onChange={(e) => setFormData({
                  ...formData,
                  ctas: {
                    ...formData.ctas,
                    primary: { ...formData.ctas.primary, text: e.target.value }
                  }
                })}
                placeholder="e.g., Visit Us"
                className={errors.primaryCta ? 'border-red-500' : ''}
              />
              {errors.primaryCta && <p className="text-sm text-red-500">{errors.primaryCta}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Secondary Button</h4>
            <div className="space-y-2">
              <Label htmlFor="secondaryText">Button Text *</Label>
              <Input
                id="secondaryText"
                value={formData.ctas.secondary.text}
                onChange={(e) => setFormData({
                  ...formData,
                  ctas: {
                    ...formData.ctas,
                    secondary: { ...formData.ctas.secondary, text: e.target.value }
                  }
                })}
                placeholder="e.g., Explore Menu"
                className={errors.secondaryCta ? 'border-red-500' : ''}
              />
              {errors.secondaryCta && <p className="text-sm text-red-500">{errors.secondaryCta}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryTarget">Scroll Target</Label>
              <Input
                id="secondaryTarget"
                value={formData.ctas.secondary.target || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  ctas: {
                    ...formData.ctas,
                    secondary: { ...formData.ctas.secondary, target: e.target.value }
                  }
                })}
                placeholder="e.g., #menu"
              />
              <p className="text-xs text-muted-foreground">
                The section ID to scroll to when clicked (include the #)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Hero images for desktop and mobile views
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="desktopImage">Desktop Image Path</Label>
            <Input
              id="desktopImage"
              value={formData.images.desktop}
              onChange={(e) => setFormData({
                ...formData,
                images: { ...formData.images, desktop: e.target.value }
              })}
              placeholder="/images/hero-desktop.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Path to the image in your public folder
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileImage">Mobile Image Path</Label>
            <Input
              id="mobileImage"
              value={formData.images.mobile}
              onChange={(e) => setFormData({
                ...formData,
                images: { ...formData.images, mobile: e.target.value }
              })}
              placeholder="/images/hero-mobile.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              value={formData.images.alt}
              onChange={(e) => setFormData({
                ...formData,
                images: { ...formData.images, alt: e.target.value }
              })}
              placeholder="Descriptive text for accessibility"
            />
            <p className="text-xs text-muted-foreground">
              Describe the image for screen readers and SEO
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center gap-3">
        <LivePreviewPanel previewUrl="/" buttonText="Preview Hero Section" />
        <Button type="submit" disabled={isSaving} className="min-w-[120px]">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
