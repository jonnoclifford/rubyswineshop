'use client';

/**
 * Find Us Section Form
 *
 * Manage location section headings, image, and map embed
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import type { FindUsContent } from '@/types/content';
import { Save } from 'lucide-react';

interface FindUsFormProps {
  initialData: FindUsContent;
  onSave: (data: FindUsContent) => Promise<void>;
}

export function FindUsForm({ initialData, onSave }: FindUsFormProps) {
  const [formData, setFormData] = useState<FindUsContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Section Content</CardTitle>
          <CardDescription>
            Manage location section headings and visual elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Heading */}
          <div className="space-y-2">
            <Label htmlFor="heading">Section Heading</Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g., Find Us"
            />
          </div>

          {/* Contact Heading */}
          <div className="space-y-2">
            <Label htmlFor="contactHeading">Contact Info Heading</Label>
            <Input
              id="contactHeading"
              value={formData.contactHeading}
              onChange={(e) => setFormData({ ...formData, contactHeading: e.target.value })}
              placeholder="e.g., Visit Us"
            />
          </div>

          {/* Map Embed URL */}
          <div className="space-y-2">
            <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
            <Input
              id="mapEmbedUrl"
              type="url"
              value={formData.mapEmbedUrl}
              onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-sm text-muted-foreground">
              Get the embed URL from Google Maps: Share → Embed a map → Copy HTML
            </p>
          </div>

          {/* Storefront Image */}
          <div className="space-y-2">
            <Label htmlFor="imageSrc">Storefront Image Path (optional)</Label>
            <Input
              id="imageSrc"
              value={formData.image?.src || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: { src: e.target.value, alt: formData.image?.alt || '' },
                })
              }
              placeholder="/images/storefront.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Upload images in the Images tab, then copy the path here
            </p>
          </div>

          {formData.image?.src && (
            <div className="space-y-2">
              <Label htmlFor="imageAlt">Image Alt Text</Label>
              <Input
                id="imageAlt"
                value={formData.image?.alt || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: { src: formData.image?.src || '', alt: e.target.value },
                  })
                }
                placeholder="Describe the image for accessibility"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            To edit address, contact details, and opening hours, use the Business Info tab
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <LivePreviewPanel previewUrl="/#find-us" buttonText="Preview Location Section" />
        <Button
          type="submit"
          disabled={isSaving}
          size="lg"
          className="gap-2 bg-gradient-to-br from-terracotta to-terracotta/80 hover:from-terracotta/90 hover:to-terracotta/70"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
