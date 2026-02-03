'use client';

/**
 * Form Builder Component
 *
 * Create and manage custom forms (contact forms, newsletter signups, etc.)
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, GripVertical, Save, Eye, Mail } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CustomForm, FormField, FormFieldType } from '@/types/form-builder';

interface FormBuilderProps {
  initialForms: CustomForm[];
  onSave: (forms: CustomForm[]) => Promise<void>;
}

interface SortableFieldProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
}

function SortableField({ field, onUpdate, onRemove }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [showOptions, setShowOptions] = useState(field.options && field.options.length > 0);

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg p-4 bg-white space-y-3">
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-2"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Field Type</Label>
              <Select value={field.type} onValueChange={(value: FormFieldType) => onUpdate({ type: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Input</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="select">Dropdown</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio Buttons</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Label</Label>
              <Input
                value={field.label}
                onChange={(e) => onUpdate({ label: e.target.value })}
                placeholder="Field Label"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Placeholder (optional)</Label>
            <Input
              value={field.placeholder || ''}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              placeholder="Placeholder text..."
              className="mt-1"
            />
          </div>

          {(field.type === 'select' || field.type === 'radio') && (
            <div>
              <Label className="text-xs">Options (one per line)</Label>
              <Textarea
                value={field.options?.join('\n') || ''}
                onChange={(e) => onUpdate({ options: e.target.value.split('\n').filter(o => o.trim()) })}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows={4}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => onUpdate({ required: checked })}
              />
              <Label className="text-xs">Required</Label>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function FormBuilder({ initialForms, onSave }: FormBuilderProps) {
  const [forms, setForms] = useState<CustomForm[]>(initialForms);
  const [activeFormId, setActiveFormId] = useState<string | null>(initialForms[0]?.id || null);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const activeForm = forms.find(f => f.id === activeFormId);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(forms);
    } finally {
      setIsSaving(false);
    }
  };

  const updateForm = (updates: Partial<CustomForm>) => {
    if (!activeFormId) return;

    setForms(forms.map(f =>
      f.id === activeFormId ? { ...f, ...updates } : f
    ));
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!activeForm) return;

    const updatedFields = activeForm.fields.map(f =>
      f.id === fieldId ? { ...f, ...updates } : f
    );

    updateForm({ fields: updatedFields });
  };

  const addField = () => {
    if (!activeForm) return;

    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
    };

    updateForm({ fields: [...activeForm.fields, newField] });
  };

  const removeField = (fieldId: string) => {
    if (!activeForm) return;

    updateForm({ fields: activeForm.fields.filter(f => f.id !== fieldId) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!activeForm) return;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = activeForm.fields.findIndex(f => f.id === active.id);
      const newIndex = activeForm.fields.findIndex(f => f.id === over.id);

      updateForm({ fields: arrayMove(activeForm.fields, oldIndex, newIndex) });
    }
  };

  const createNewForm = () => {
    const newForm: CustomForm = {
      id: `form-${Date.now()}`,
      name: 'New Form',
      heading: 'Contact Us',
      description: 'Fill out the form below and we will get back to you.',
      fields: [],
      submitButtonText: 'Submit',
      successMessage: 'Thank you! We will be in touch soon.',
      emailRecipient: 'your-email@example.com',
      enabled: true,
    };

    setForms([...forms, newForm]);
    setActiveFormId(newForm.id);
  };

  const deleteForm = (formId: string) => {
    if (forms.length === 1) return; // Keep at least one form

    setForms(forms.filter(f => f.id !== formId));

    if (activeFormId === formId) {
      setActiveFormId(forms[0]?.id || null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Forms</CardTitle>
              <CardDescription>
                Create custom forms for contact, newsletter signup, reservations, and more
              </CardDescription>
            </div>
            <Button onClick={createNewForm} className="gap-2">
              <Plus className="h-4 w-4" />
              New Form
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forms.map(form => (
              <Card
                key={form.id}
                className={`cursor-pointer transition-all ${
                  activeFormId === form.id
                    ? 'ring-2 ring-terracotta'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveFormId(form.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{form.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {form.fields.length} field{form.fields.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                    <Badge variant={form.enabled ? 'default' : 'secondary'}>
                      {form.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Editor */}
      {activeForm && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Form: {activeForm.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Form Name (Internal)</Label>
                <Input
                  value={activeForm.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  placeholder="Contact Form"
                />
              </div>

              <div>
                <Label>Email Recipient</Label>
                <div className="flex gap-2">
                  <Mail className="h-10 w-10 text-gray-400" />
                  <Input
                    type="email"
                    value={activeForm.emailRecipient}
                    onChange={(e) => updateForm({ emailRecipient: e.target.value })}
                    placeholder="your-email@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Heading</Label>
              <Input
                value={activeForm.heading}
                onChange={(e) => updateForm({ heading: e.target.value })}
                placeholder="Contact Us"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={activeForm.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                placeholder="Fill out the form below..."
                rows={3}
              />
            </div>

            {/* Form Fields */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold">Form Fields</Label>
                <Button onClick={addField} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </div>

              {activeForm.fields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <p>No fields yet. Click "Add Field" to get started.</p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={activeForm.fields.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {activeForm.fields.map(field => (
                        <SortableField
                          key={field.id}
                          field={field}
                          onUpdate={(updates) => updateField(field.id, updates)}
                          onRemove={() => removeField(field.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>

            {/* Submit Button & Success Message */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Submit Button Text</Label>
                <Input
                  value={activeForm.submitButtonText}
                  onChange={(e) => updateForm({ submitButtonText: e.target.value })}
                  placeholder="Submit"
                />
              </div>

              <div>
                <Label>Success Message</Label>
                <Input
                  value={activeForm.successMessage}
                  onChange={(e) => updateForm({ successMessage: e.target.value })}
                  placeholder="Thank you! We'll be in touch soon."
                />
              </div>
            </div>

            {/* Form Status */}
            <div className="flex items-center gap-2">
              <Switch
                checked={activeForm.enabled}
                onCheckedChange={(checked) => updateForm({ enabled: checked })}
              />
              <Label>Form Enabled</Label>
              <p className="text-sm text-muted-foreground">
                {activeForm.enabled ? 'This form is active and can receive submissions' : 'This form is disabled'}
              </p>
            </div>

            {/* Delete Form */}
            {forms.length > 1 && (
              <Button
                variant="destructive"
                onClick={() => deleteForm(activeForm.id)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete This Form
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="gap-2 bg-gradient-to-br from-terracotta to-terracotta/80 hover:from-terracotta/90 hover:to-terracotta/70"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save All Forms
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
