'use client';

/**
 * SEO Settings Form
 *
 * Manage site-wide SEO metadata including title, description, keywords, and Open Graph image
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { SEOContent } from '@/types/content';
import { Save, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SEOFormProps {
  initialData: SEOContent;
  onSave: (data: SEOContent) => Promise<void>;
}

export function SEOForm({ initialData, onSave }: SEOFormProps) {
  const [formData, setFormData] = useState<SEOContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, newKeyword.trim()],
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword),
    });
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Metadata</CardTitle>
          <CardDescription>
            Optimize your site for search engines and social media sharing.
            These settings control how your site appears in Google search results and social media previews.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Page Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ruby's Wine Shop - Natural Wines in Perth"
              maxLength={60}
            />
            <p className="text-sm text-muted-foreground">
              {formData.title.length}/60 characters - This appears in browser tabs and search results
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Meta Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Discover natural wines at Ruby's Wine Shop. Located in Perth, we offer a curated selection of organic and biodynamic wines..."
              rows={4}
              maxLength={160}
            />
            <p className="text-sm text-muted-foreground">
              {formData.description.length}/160 characters - This appears below your title in search results
            </p>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">SEO Keywords</Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                placeholder="e.g., natural wine, organic wine, Perth wine bar"
              />
              <Button
                type="button"
                onClick={addKeyword}
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              Add relevant keywords that describe your business. These help search engines understand your content.
            </p>
          </div>

          {/* Open Graph Image */}
          <div className="space-y-2">
            <Label htmlFor="ogImage">Social Media Preview Image (Open Graph)</Label>
            <Input
              id="ogImage"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              placeholder="/images/og-image.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Upload an image (1200x630px recommended) in the Images tab, then copy the path here.
              This image appears when your site is shared on social media.
            </p>

            {formData.ogImage && (
              <div className="mt-3 border rounded-lg p-4 bg-gray-50">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <img
                  src={formData.ogImage}
                  alt="Social media preview"
                  className="w-full max-w-md rounded border"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 text-base">SEO Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>Keep your page title under 60 characters so it does not get cut off in search results</li>
            <li>Write a compelling meta description (120-160 characters) that encourages clicks</li>
            <li>Use specific, relevant keywords that your customers might search for</li>
            <li>Update your Open Graph image to show an appealing preview when shared on social media</li>
            <li>Include your location (e.g., "Perth", "Western Australia") if targeting local customers</li>
          </ul>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
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
