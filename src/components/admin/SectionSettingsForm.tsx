'use client';

/**
 * Section Settings Form
 *
 * Allows users to control visibility, order, and color schemes for each section
 * Features drag-and-drop reordering
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { SectionSettings, ColorScheme } from '@/types/content';
import { COLOR_SCHEME_LABELS } from '@/lib/color-schemes';
import { Eye, EyeOff, Save, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SectionSettingsFormProps {
  initialData: SectionSettings;
  onSave: (data: SectionSettings) => Promise<void>;
}

const SECTIONS = [
  { key: 'hero' as const, label: 'Hero Banner', description: 'Main banner at the top of the page' },
  { key: 'about' as const, label: 'About Section', description: 'Story and introduction' },
  { key: 'menu' as const, label: 'Wine Menu', description: 'Wine list by glass and bottle' },
  { key: 'hungry' as const, label: 'Food Section', description: 'Food partnership information' },
  { key: 'whatsOn' as const, label: 'What\'s On', description: 'Events and happenings' },
  { key: 'faq' as const, label: 'FAQ', description: 'Frequently asked questions' },
  { key: 'findUs' as const, label: 'Find Us', description: 'Location and contact details' },
];

interface SortableSectionProps {
  section: typeof SECTIONS[number];
  sectionConfig: SectionSettings[keyof SectionSettings];
  onToggle: () => void;
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
}

function SortableSection({ section, sectionConfig, onToggle, onColorSchemeChange }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg transition-colors"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-5 w-5 flex-shrink-0" />
      </div>

      {/* Section info and toggle */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          {sectionConfig.enabled ? (
            <Eye className="h-5 w-5 flex-shrink-0" />
          ) : (
            <EyeOff className="h-5 w-5 opacity-50 flex-shrink-0" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Label className="font-medium">{section.label}</Label>
          <p className="text-sm opacity-60">{section.description}</p>
        </div>

        <Switch
          checked={sectionConfig.enabled}
          onCheckedChange={onToggle}
        />
      </div>

      {/* Color scheme selector */}
      <div className="sm:w-64">
        <Select
          value={sectionConfig.colorScheme || 'light'}
          onValueChange={(value) => onColorSchemeChange(value as ColorScheme)}
          disabled={!sectionConfig.enabled}
        >
          <SelectTrigger className={!sectionConfig.enabled ? 'opacity-50' : ''}>
            <SelectValue placeholder="Choose color scheme" />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(COLOR_SCHEME_LABELS) as [ColorScheme, string][]).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SectionSettingsForm({ initialData, onSave }: SectionSettingsFormProps) {
  const [settings, setSettings] = useState<SectionSettings>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Sort sections by order
  const [orderedSections, setOrderedSections] = useState(() =>
    [...SECTIONS].sort((a, b) => settings[a.key].order - settings[b.key].order)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderedSections((items) => {
        const oldIndex = items.findIndex((item) => item.key === active.id);
        const newIndex = items.findIndex((item) => item.key === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Update the order in settings
        const updatedSettings = { ...settings };
        newOrder.forEach((section, index) => {
          updatedSettings[section.key] = {
            ...updatedSettings[section.key],
            order: index,
          };
        });
        setSettings(updatedSettings);

        return newOrder;
      });
    }
  };

  const handleToggle = (sectionKey: keyof SectionSettings) => {
    setSettings(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        enabled: !prev[sectionKey].enabled,
      },
    }));
  };

  const handleColorSchemeChange = (sectionKey: keyof SectionSettings, colorScheme: ColorScheme) => {
    setSettings(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        colorScheme,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-sans">Section Visibility & Order</CardTitle>
          <CardDescription>
            Control which sections appear on your site, their order, and color schemes.
            <strong className="block mt-1">Drag sections to reorder them on your page.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedSections.map((s) => s.key)}
              strategy={verticalListSortingStrategy}
            >
              {orderedSections.map((section) => (
                <SortableSection
                  key={section.key}
                  section={section}
                  sectionConfig={settings[section.key]}
                  onToggle={() => handleToggle(section.key)}
                  onColorSchemeChange={(colorScheme) =>
                    handleColorSchemeChange(section.key, colorScheme)
                  }
                />
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="gap-2 bg-terracotta hover:bg-terracotta/90"
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
    </div>
  );
}
