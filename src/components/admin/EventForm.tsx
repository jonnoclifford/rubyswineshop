'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LivePreviewPanel } from '@/components/admin/LivePreviewPanel';
import { WhatsOnContent, Event } from '@/types/content';
import { Plus, Trash2 } from 'lucide-react';

interface EventFormProps {
  initialData: WhatsOnContent;
  onSave: (data: WhatsOnContent) => Promise<void>;
}

export function EventForm({ initialData, onSave }: EventFormProps) {
  const [formData, setFormData] = useState<WhatsOnContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.heading.trim()) {
      newErrors.heading = 'Section heading is required';
    }

    formData.events.forEach((event, index) => {
      if (!event.title.trim()) {
        newErrors[`event-${index}-title`] = 'Event title is required';
      }
      if (!event.date.trim()) {
        newErrors[`event-${index}-date`] = 'Event date is required';
      }
      if (!event.description.trim()) {
        newErrors[`event-${index}-description`] = 'Event description is required';
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

  const addEvent = () => {
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        {
          title: '',
          date: '',
          time: '',
          description: '',
          recurring: false
        }
      ]
    });
  };

  const removeEvent = (index: number) => {
    setFormData({
      ...formData,
      events: formData.events.filter((_, i) => i !== index)
    });
  };

  const updateEvent = (index: number, field: keyof Event, value: string | boolean) => {
    const newEvents = [...formData.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setFormData({ ...formData, events: newEvents });
  };

  const updateEventImage = (index: number, field: 'src' | 'alt', value: string) => {
    const newEvents = [...formData.events];
    const currentImage = newEvents[index].image || { src: '', alt: '' };
    newEvents[index] = { ...newEvents[index], image: { ...currentImage, [field]: value } };
    setFormData({ ...formData, events: newEvents });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-md border-gray-200">
        <CardHeader>
          <CardTitle>What&apos;s On Section</CardTitle>
          <CardDescription>
            Manage your events and special happenings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heading">Section Heading *</Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g., What's On"
              className={errors.heading ? 'border-red-500' : ''}
            />
            {errors.heading && <p className="text-sm text-red-500">{errors.heading}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {formData.events.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Event #{index + 1}</CardTitle>
                {formData.events.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvent(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`event-${index}-title`}>Event Title *</Label>
                  <Input
                    id={`event-${index}-title`}
                    value={event.title}
                    onChange={(e) => updateEvent(index, 'title', e.target.value)}
                    placeholder="e.g., Sunday Sessions"
                    className={errors[`event-${index}-title`] ? 'border-red-500' : ''}
                  />
                  {errors[`event-${index}-title`] && (
                    <p className="text-sm text-red-500">{errors[`event-${index}-title`]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`event-${index}-date`}>Date/Frequency *</Label>
                  <Input
                    id={`event-${index}-date`}
                    value={event.date}
                    onChange={(e) => updateEvent(index, 'date', e.target.value)}
                    placeholder="e.g., Every Sunday or March 15, 2026"
                    className={errors[`event-${index}-date`] ? 'border-red-500' : ''}
                  />
                  {errors[`event-${index}-date`] && (
                    <p className="text-sm text-red-500">{errors[`event-${index}-date`]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`event-${index}-time`}>Time</Label>
                <Input
                  id={`event-${index}-time`}
                  value={event.time || ''}
                  onChange={(e) => updateEvent(index, 'time', e.target.value)}
                  placeholder="e.g., 2:00 PM - 9:00 PM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`event-${index}-description`}>Description *</Label>
                <Textarea
                  id={`event-${index}-description`}
                  value={event.description}
                  onChange={(e) => updateEvent(index, 'description', e.target.value)}
                  placeholder="Tell people what to expect at this event"
                  rows={3}
                  className={errors[`event-${index}-description`] ? 'border-red-500' : ''}
                />
                {errors[`event-${index}-description`] && (
                  <p className="text-sm text-red-500">{errors[`event-${index}-description`]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`event-${index}-image-src`}>Event Image Path</Label>
                  <Input
                    id={`event-${index}-image-src`}
                    value={event.image?.src || ''}
                    onChange={(e) => updateEventImage(index, 'src', e.target.value)}
                    placeholder="/images/event-flyer.webp"
                  />
                  <p className="text-sm text-muted-foreground">
                    Copy the path from the Media Library and paste it here
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`event-${index}-image-alt`}>Image Description</Label>
                  <Input
                    id={`event-${index}-image-alt`}
                    value={event.image?.alt || ''}
                    onChange={(e) => updateEventImage(index, 'alt', e.target.value)}
                    placeholder="e.g., Event flyer for Sunday Sessions"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`event-${index}-recurring`}
                  checked={event.recurring || false}
                  onChange={(e) => updateEvent(index, 'recurring', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={`event-${index}-recurring`} className="font-normal">
                  This is a recurring event
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addEvent}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Event
      </Button>

      <div className="flex justify-between items-center gap-3">
        <LivePreviewPanel previewUrl="/#whats-on" buttonText="Preview Events Section" />
        <Button type="submit" disabled={isSaving} className="min-w-[120px]">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
