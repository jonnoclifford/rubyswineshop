'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const THEMES = [
  { id: 'jaunt', name: 'Jaunt Studio', color: '#C75435' },
  { id: 'midnight', name: 'Midnight', color: '#8B5CF6' },
  { id: 'brutalist', name: 'Brutalist', color: '#000000' },
  { id: 'sunset', name: 'Sunset', color: '#EA580C' },
  { id: 'forest', name: 'Forest', color: '#10B981' },
  { id: 'ocean', name: 'Ocean', color: '#06B6D4' },
  { id: 'lavender', name: 'Lavender Dreams', color: '#9333EA' },
  { id: 'cyber', name: 'Neon Cyber', color: '#00FFF0' },
  { id: 'retro', name: 'Retro Diner', color: '#DC2626' },
  { id: 'sage', name: 'Sage Garden', color: '#84A98C' },
];

const STORAGE_KEY = 'admin-theme-preference';

interface ThemeSelectorProps {
  onThemeChange: (themeId: string) => void;
  currentTheme: string;
}

export function ThemeSelector({ onThemeChange, currentTheme }: ThemeSelectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSelect = (themeId: string) => {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, themeId);
    // Notify parent component
    onThemeChange(themeId);
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-cream">
        <Palette className="h-4 w-4" />
        <span className="text-sm">Theme</span>
      </div>
    );
  }

  const currentThemeData = THEMES.find(t => t.id === currentTheme);

  return (
    <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
      <Palette className="h-4 w-4 text-cream flex-shrink-0" />
      <Select value={currentTheme} onValueChange={handleThemeSelect}>
        <SelectTrigger className="h-7 border-0 bg-transparent text-cream hover:bg-white/10 focus:ring-0 focus:ring-offset-0 w-auto min-w-[100px]">
          <SelectValue>
            <div className="flex items-center gap-2 whitespace-nowrap">
              {currentThemeData && (
                <>
                  <div
                    className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                    style={{ backgroundColor: currentThemeData.color }}
                  />
                  <span className="text-sm hidden sm:inline">{currentThemeData.name}</span>
                </>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.color }}
                />
                <span>{theme.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function getStoredTheme(): string {
  if (typeof window === 'undefined') return 'jaunt';
  return localStorage.getItem(STORAGE_KEY) || 'jaunt';
}
