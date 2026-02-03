'use client';

/**
 * Navigation Builder Form
 *
 * Manage header navigation links - add, remove, reorder menu items
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { HeaderContent } from '@/types/content';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NavigationFormProps {
  initialData: HeaderContent;
  onSave: (data: HeaderContent) => Promise<void>;
}

interface SortableNavItemProps {
  id: string;
  name: string;
  href: string;
  onUpdate: (name: string, href: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function SortableNavItem({ id, name, href, onUpdate, onRemove, canRemove }: SortableNavItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 border rounded-lg bg-white"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Link Name */}
      <div className="flex-1">
        <Label htmlFor={`name-${id}`} className="text-xs text-gray-500">
          Link Text
        </Label>
        <Input
          id={`name-${id}`}
          value={name}
          onChange={(e) => onUpdate(e.target.value, href)}
          placeholder="e.g., About Us"
          className="mt-1"
        />
      </div>

      {/* Link URL */}
      <div className="flex-1">
        <Label htmlFor={`href-${id}`} className="text-xs text-gray-500">
          Link URL
        </Label>
        <Input
          id={`href-${id}`}
          value={href}
          onChange={(e) => onUpdate(name, e.target.value)}
          placeholder="e.g., #about or /about"
          className="mt-1"
        />
      </div>

      {/* Remove Button */}
      {canRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 self-end"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export function NavigationForm({ initialData, onSave }: NavigationFormProps) {
  const [formData, setFormData] = useState<HeaderContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formData.navigation.findIndex((_, index) => `nav-${index}` === active.id);
      const newIndex = formData.navigation.findIndex((_, index) => `nav-${index}` === over.id);

      setFormData({
        ...formData,
        navigation: arrayMove(formData.navigation, oldIndex, newIndex),
      });
    }
  };

  const updateNavItem = (index: number, name: string, href: string) => {
    const newNavigation = [...formData.navigation];
    newNavigation[index] = { name, href };
    setFormData({ ...formData, navigation: newNavigation });
  };

  const addNavItem = () => {
    setFormData({
      ...formData,
      navigation: [...formData.navigation, { name: '', href: '' }],
    });
  };

  const removeNavItem = (index: number) => {
    const newNavigation = formData.navigation.filter((_, i) => i !== index);
    setFormData({ ...formData, navigation: newNavigation });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Header Settings</CardTitle>
          <CardDescription>
            Manage your site logo and call-to-action button text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Path */}
          <div className="space-y-2">
            <Label htmlFor="logo">Logo Image Path</Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="/images/logo.png"
            />
            <p className="text-sm text-muted-foreground">
              Upload your logo in the Images tab, then copy the path here
            </p>
          </div>

          {/* CTA Button Text */}
          <div className="space-y-2">
            <Label htmlFor="ctaText">Call-to-Action Button Text</Label>
            <Input
              id="ctaText"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              placeholder="e.g., Visit Us"
            />
            <p className="text-sm text-muted-foreground">
              The text shown on the primary button in the header
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Navigation Links</CardTitle>
              <CardDescription>
                Drag to reorder, edit text and URLs, or add new links
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addNavItem}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.navigation.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No navigation links yet. Click &quot;Add Link&quot; to get started.</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formData.navigation.map((_, index) => `nav-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {formData.navigation.map((link, index) => (
                    <SortableNavItem
                      key={`nav-${index}`}
                      id={`nav-${index}`}
                      name={link.name}
                      href={link.href}
                      onUpdate={(name, href) => updateNavItem(index, name, href)}
                      onRemove={() => removeNavItem(index)}
                      canRemove={formData.navigation.length > 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">Link URL Tips:</p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Use <code className="bg-blue-100 px-1 rounded">#section-id</code> for smooth scrolling to page sections (e.g., #about, #menu)</li>
              <li>Use <code className="bg-blue-100 px-1 rounded">/page-name</code> for links to other pages (e.g., /contact, /events)</li>
              <li>Use full URLs for external links (e.g., https://example.com)</li>
            </ul>
          </div>
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
