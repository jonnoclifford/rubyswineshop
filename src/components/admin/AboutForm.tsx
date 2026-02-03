'use client';

/**
 * About Section Form
 *
 * Manage about section content with rich text editing
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import type { AboutContent } from '@/types/content';
import { Save, Plus, Trash2 } from 'lucide-react';

interface AboutFormProps {
  initialData: AboutContent;
  onSave: (data: AboutContent) => Promise<void>;
}

export function AboutForm({ initialData, onSave }: AboutFormProps) {
  const [formData, setFormData] = useState<AboutContent>(initialData);
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

  const updateParagraph = (index: number, html: string) => {
    const newStory = [...formData.story];
    newStory[index] = html;
    setFormData({ ...formData, story: newStory });
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      story: [...formData.story, '<p>Start typing...</p>'],
    });
  };

  const removeParagraph = (index: number) => {
    const newStory = formData.story.filter((_, i) => i !== index);
    setFormData({ ...formData, story: newStory });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Section Content</CardTitle>
          <CardDescription>
            Tell your story. Use rich formatting to make it engaging.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <Label htmlFor="heading">Section Heading</Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g., Our Story"
            />
          </div>

          {/* Story Paragraphs with Rich Text */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Story Paragraphs</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addParagraph}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Paragraph
              </Button>
            </div>

            {formData.story.map((paragraph, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Paragraph {index + 1}</Label>
                  {formData.story.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeParagraph(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <RichTextEditor
                  value={paragraph}
                  onChange={(html) => updateParagraph(index, html)}
                  placeholder="Tell your story..."
                />
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="imageSrc">Image Path</Label>
            <Input
              id="imageSrc"
              value={formData.image.src}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: { ...formData.image, src: e.target.value },
                })
              }
              placeholder="/images/about.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Upload images in the Images tab, then copy the path here
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              value={formData.image.alt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: { ...formData.image, alt: e.target.value },
                })
              }
              placeholder="Describe the image for accessibility"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <LivePreviewPanel previewUrl="/#about" buttonText="Preview About Section" />
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
