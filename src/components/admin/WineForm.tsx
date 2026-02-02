'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MenuContent, WineItem } from '@/types/content';
import { Plus, Trash2 } from 'lucide-react';

interface WineFormProps {
  initialData: MenuContent;
  onSave: (data: MenuContent) => Promise<void>;
}

export function WineForm({ initialData, onSave }: WineFormProps) {
  const [formData, setFormData] = useState<MenuContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.heading.trim()) {
      newErrors.heading = 'Menu heading is required';
    }

    // Validate by the glass items
    formData.byTheGlass.items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`glass-${index}-name`] = 'Wine name is required';
      }
      if (!item.price.trim()) {
        newErrors[`glass-${index}-price`] = 'Price is required';
      }
    });

    // Validate by the bottle categories and items
    formData.byTheBottle.categories.forEach((category, catIndex) => {
      if (!category.name.trim()) {
        newErrors[`category-${catIndex}-name`] = 'Category name is required';
      }
      category.items.forEach((item, itemIndex) => {
        if (!item.name.trim()) {
          newErrors[`bottle-${catIndex}-${itemIndex}-name`] = 'Wine name is required';
        }
        if (!item.price.trim()) {
          newErrors[`bottle-${catIndex}-${itemIndex}-price`] = 'Price is required';
        }
      });
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

  // By the glass functions
  const addGlassItem = () => {
    setFormData({
      ...formData,
      byTheGlass: {
        ...formData.byTheGlass,
        items: [
          ...formData.byTheGlass.items,
          { name: '', producer: '', region: '', price: '', description: '' }
        ]
      }
    });
  };

  const removeGlassItem = (index: number) => {
    setFormData({
      ...formData,
      byTheGlass: {
        ...formData.byTheGlass,
        items: formData.byTheGlass.items.filter((_, i) => i !== index)
      }
    });
  };

  const updateGlassItem = (index: number, field: keyof WineItem, value: string) => {
    const newItems = [...formData.byTheGlass.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({
      ...formData,
      byTheGlass: { ...formData.byTheGlass, items: newItems }
    });
  };

  // By the bottle functions
  const addCategory = () => {
    setFormData({
      ...formData,
      byTheBottle: {
        ...formData.byTheBottle,
        categories: [
          ...formData.byTheBottle.categories,
          { name: '', items: [] }
        ]
      }
    });
  };

  const removeCategory = (index: number) => {
    setFormData({
      ...formData,
      byTheBottle: {
        ...formData.byTheBottle,
        categories: formData.byTheBottle.categories.filter((_, i) => i !== index)
      }
    });
  };

  const updateCategoryName = (index: number, name: string) => {
    const newCategories = [...formData.byTheBottle.categories];
    newCategories[index] = { ...newCategories[index], name };
    setFormData({
      ...formData,
      byTheBottle: { ...formData.byTheBottle, categories: newCategories }
    });
  };

  const addBottleItem = (categoryIndex: number) => {
    const newCategories = [...formData.byTheBottle.categories];
    newCategories[categoryIndex].items.push({
      name: '',
      producer: '',
      region: '',
      price: '',
      description: ''
    });
    setFormData({
      ...formData,
      byTheBottle: { ...formData.byTheBottle, categories: newCategories }
    });
  };

  const removeBottleItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...formData.byTheBottle.categories];
    newCategories[categoryIndex].items = newCategories[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setFormData({
      ...formData,
      byTheBottle: { ...formData.byTheBottle, categories: newCategories }
    });
  };

  const updateBottleItem = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof WineItem,
    value: string
  ) => {
    const newCategories = [...formData.byTheBottle.categories];
    newCategories[categoryIndex].items[itemIndex] = {
      ...newCategories[categoryIndex].items[itemIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      byTheBottle: { ...formData.byTheBottle, categories: newCategories }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Menu Settings</CardTitle>
          <CardDescription>General menu configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menu-heading">Menu Heading *</Label>
            <Input
              id="menu-heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g., What We're Pouring"
              className={errors.heading ? 'border-red-500' : ''}
            />
            {errors.heading && <p className="text-sm text-red-500">{errors.heading}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="glass-heading">By the Glass Section Heading</Label>
            <Input
              id="glass-heading"
              value={formData.byTheGlass.heading}
              onChange={(e) => setFormData({
                ...formData,
                byTheGlass: { ...formData.byTheGlass, heading: e.target.value }
              })}
              placeholder="e.g., By the Glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bottle-heading">By the Bottle Section Heading</Label>
            <Input
              id="bottle-heading"
              value={formData.byTheBottle.heading}
              onChange={(e) => setFormData({
                ...formData,
                byTheBottle: { ...formData.byTheBottle, heading: e.target.value }
              })}
              placeholder="e.g., By the Bottle"
            />
          </div>
        </CardContent>
      </Card>

      {/* By the Glass Section */}
      <Card>
        <CardHeader>
          <CardTitle>By the Glass</CardTitle>
          <CardDescription>Wines available by the glass</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.byTheGlass.items.map((item, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Wine #{index + 1}</CardTitle>
                  {formData.byTheGlass.items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGlassItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`glass-${index}-name`}>Wine Name *</Label>
                    <Input
                      id={`glass-${index}-name`}
                      value={item.name}
                      onChange={(e) => updateGlassItem(index, 'name', e.target.value)}
                      placeholder="e.g., Skin Contact Pinot Gris"
                      className={errors[`glass-${index}-name`] ? 'border-red-500' : ''}
                    />
                    {errors[`glass-${index}-name`] && (
                      <p className="text-sm text-red-500">{errors[`glass-${index}-name`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`glass-${index}-price`}>Price *</Label>
                    <Input
                      id={`glass-${index}-price`}
                      value={item.price}
                      onChange={(e) => updateGlassItem(index, 'price', e.target.value)}
                      placeholder="e.g., $16"
                      className={errors[`glass-${index}-price`] ? 'border-red-500' : ''}
                    />
                    {errors[`glass-${index}-price`] && (
                      <p className="text-sm text-red-500">{errors[`glass-${index}-price`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`glass-${index}-producer`}>Producer</Label>
                    <Input
                      id={`glass-${index}-producer`}
                      value={item.producer || ''}
                      onChange={(e) => updateGlassItem(index, 'producer', e.target.value)}
                      placeholder="e.g., Lucy Margaux"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`glass-${index}-region`}>Region</Label>
                    <Input
                      id={`glass-${index}-region`}
                      value={item.region || ''}
                      onChange={(e) => updateGlassItem(index, 'region', e.target.value)}
                      placeholder="e.g., Adelaide Hills, SA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`glass-${index}-description`}>Tasting Notes</Label>
                  <Textarea
                    id={`glass-${index}-description`}
                    value={item.description || ''}
                    onChange={(e) => updateGlassItem(index, 'description', e.target.value)}
                    placeholder="Brief description of flavors and characteristics"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addGlassItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Glass Wine
          </Button>
        </CardContent>
      </Card>

      {/* By the Bottle Section */}
      <Card>
        <CardHeader>
          <CardTitle>By the Bottle</CardTitle>
          <CardDescription>Wines available by the bottle, organized by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.byTheBottle.categories.map((category, catIndex) => (
            <Card key={catIndex} className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`category-${catIndex}-name`}>Category Name *</Label>
                    <Input
                      id={`category-${catIndex}-name`}
                      value={category.name}
                      onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                      placeholder="e.g., Sparkling & Pét-Nat"
                      className={errors[`category-${catIndex}-name`] ? 'border-red-500' : ''}
                    />
                    {errors[`category-${catIndex}-name`] && (
                      <p className="text-sm text-red-500">{errors[`category-${catIndex}-name`]}</p>
                    )}
                  </div>
                  {formData.byTheBottle.categories.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategory(catIndex)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="bg-background">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Wine #{itemIndex + 1}</CardTitle>
                        {category.items.length > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBottleItem(catIndex, itemIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`bottle-${catIndex}-${itemIndex}-name`}>Wine Name *</Label>
                          <Input
                            id={`bottle-${catIndex}-${itemIndex}-name`}
                            value={item.name}
                            onChange={(e) => updateBottleItem(catIndex, itemIndex, 'name', e.target.value)}
                            placeholder="e.g., Pét-Nat Rosé"
                            className={errors[`bottle-${catIndex}-${itemIndex}-name`] ? 'border-red-500' : ''}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`bottle-${catIndex}-${itemIndex}-price`}>Price *</Label>
                          <Input
                            id={`bottle-${catIndex}-${itemIndex}-price`}
                            value={item.price}
                            onChange={(e) => updateBottleItem(catIndex, itemIndex, 'price', e.target.value)}
                            placeholder="e.g., $65"
                            className={errors[`bottle-${catIndex}-${itemIndex}-price`] ? 'border-red-500' : ''}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`bottle-${catIndex}-${itemIndex}-producer`}>Producer</Label>
                          <Input
                            id={`bottle-${catIndex}-${itemIndex}-producer`}
                            value={item.producer || ''}
                            onChange={(e) => updateBottleItem(catIndex, itemIndex, 'producer', e.target.value)}
                            placeholder="e.g., BK Wines"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`bottle-${catIndex}-${itemIndex}-region`}>Region</Label>
                          <Input
                            id={`bottle-${catIndex}-${itemIndex}-region`}
                            value={item.region || ''}
                            onChange={(e) => updateBottleItem(catIndex, itemIndex, 'region', e.target.value)}
                            placeholder="e.g., Adelaide Hills, SA"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`bottle-${catIndex}-${itemIndex}-description`}>Tasting Notes</Label>
                        <Textarea
                          id={`bottle-${catIndex}-${itemIndex}-description`}
                          value={item.description || ''}
                          onChange={(e) => updateBottleItem(catIndex, itemIndex, 'description', e.target.value)}
                          placeholder="Brief description of flavors and characteristics"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addBottleItem(catIndex)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Wine to {category.name || 'Category'}
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addCategory} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSaving} className="min-w-[120px]">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
