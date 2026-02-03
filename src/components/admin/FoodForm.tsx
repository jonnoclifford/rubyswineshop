'use client';

/**
 * Food/Hungry Section Form
 *
 * Manage food partnership information and description
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import type { HungryContent } from '@/types/content';
import { Save, Plus, Trash2 } from 'lucide-react';

interface FoodFormProps {
  initialData: HungryContent;
  onSave: (data: HungryContent) => Promise<void>;
}

export function FoodForm({ initialData, onSave }: FoodFormProps) {
  const [formData, setFormData] = useState<HungryContent>(initialData);
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

  const updateDescription = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData({ ...formData, description: newDescription });
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      description: [...formData.description, ''],
    });
  };

  const removeParagraph = (index: number) => {
    const newDescription = formData.description.filter((_, i) => i !== index);
    setFormData({ ...formData, description: newDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Section Content</CardTitle>
          <CardDescription>
            Manage information about food options and partnerships
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
              placeholder="e.g., Feeling Hungry?"
            />
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Description</Label>
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

            {formData.description.map((paragraph, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`paragraph-${index}`}>Paragraph {index + 1}</Label>
                  {formData.description.length > 1 && (
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
                  onChange={(html) => updateDescription(index, html)}
                  placeholder="Enter description text..."
                />
              </div>
            ))}
          </div>

          {/* Partner Name */}
          <div className="space-y-2">
            <Label htmlFor="partnerName">Partner or Restaurant Name</Label>
            <Input
              id="partnerName"
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              placeholder="e.g., Olive Thyme"
            />
          </div>

          {/* Partner Link */}
          <div className="space-y-2">
            <Label htmlFor="partnerLink">Partner Website (optional)</Label>
            <Input
              id="partnerLink"
              type="url"
              value={formData.partnerLink || ''}
              onChange={(e) => setFormData({ ...formData, partnerLink: e.target.value })}
              placeholder="https://www.example.com"
            />
            <p className="text-sm text-muted-foreground">
              Link to your food partner website or menu
            </p>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="imageSrc">Image Path (optional)</Label>
            <Input
              id="imageSrc"
              value={formData.image?.src || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: { src: e.target.value, alt: formData.image?.alt || '' },
                })
              }
              placeholder="/images/hungry-section.jpg"
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
