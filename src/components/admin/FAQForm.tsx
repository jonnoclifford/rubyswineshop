'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import { FAQContent, FAQItem } from '@/types/content';
import { Plus, Trash2 } from 'lucide-react';

interface FAQFormProps {
  initialData: FAQContent;
  onSave: (data: FAQContent) => Promise<void>;
}

export function FAQForm({ initialData, onSave }: FAQFormProps) {
  const [formData, setFormData] = useState<FAQContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.heading.trim()) {
      newErrors.heading = 'Section heading is required';
    }

    formData.items.forEach((item, index) => {
      if (!item.question.trim()) {
        newErrors[`faq-${index}-question`] = 'Question is required';
      }
      if (!item.answer.trim()) {
        newErrors[`faq-${index}-answer`] = 'Answer is required';
      }
    });

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

  const addFAQ = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { question: '', answer: '' }
      ]
    });
  };

  const removeFAQ = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateFAQ = (index: number, field: keyof FAQItem, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>FAQ Section</CardTitle>
          <CardDescription>
            Answer common questions to help your visitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heading">Section Heading *</Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g., Good to Know"
              className={errors.heading ? 'border-red-500' : ''}
            />
            {errors.heading && <p className="text-sm text-red-500">{errors.heading}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {formData.items.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">FAQ #{index + 1}</CardTitle>
                {formData.items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFAQ(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`faq-${index}-question`}>Question *</Label>
                <Input
                  id={`faq-${index}-question`}
                  value={item.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  placeholder="e.g., Do you take bookings?"
                  className={errors[`faq-${index}-question`] ? 'border-red-500' : ''}
                />
                {errors[`faq-${index}-question`] && (
                  <p className="text-sm text-red-500">{errors[`faq-${index}-question`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`faq-${index}-answer`}>Answer *</Label>
                <Textarea
                  id={`faq-${index}-answer`}
                  value={item.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  placeholder="Provide a clear, helpful answer"
                  rows={4}
                  className={errors[`faq-${index}-answer`] ? 'border-red-500' : ''}
                />
                {errors[`faq-${index}-answer`] && (
                  <p className="text-sm text-red-500">{errors[`faq-${index}-answer`]}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addFAQ}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add FAQ
      </Button>

      <div className="flex justify-between items-center gap-3">
        <LivePreviewPanel previewUrl="/#faq" buttonText="Preview FAQ Section" />
        <Button type="submit" disabled={isSaving} className="min-w-[120px]">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
