'use client';

/**
 * Live Preview Panel Component
 *
 * Shows a live preview of content changes with viewport toggles
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Monitor, Tablet, Smartphone, Eye } from 'lucide-react';

type Viewport = 'desktop' | 'tablet' | 'mobile';

interface LivePreviewPanelProps {
  /** URL to preview */
  previewUrl?: string;
  /** Trigger button text */
  buttonText?: string;
  /** Additional class names */
  className?: string;
}

const VIEWPORT_SIZES: Record<Viewport, string> = {
  desktop: 'w-full h-full',
  tablet: 'w-[768px] h-full',
  mobile: 'w-[375px] h-full',
};

const VIEWPORT_LABELS: Record<Viewport, { icon: typeof Monitor; label: string }> = {
  desktop: { icon: Monitor, label: 'Desktop' },
  tablet: { icon: Tablet, label: 'Tablet' },
  mobile: { icon: Smartphone, label: 'Mobile' },
};

export function LivePreviewPanel({
  previewUrl = '/',
  buttonText = 'Preview',
  className,
}: LivePreviewPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [fullPreviewUrl, setFullPreviewUrl] = useState(previewUrl);

  // Construct full URL from relative URL on mount
  useEffect(() => {
    if (previewUrl.startsWith('/')) {
      setFullPreviewUrl(`${window.location.origin}${previewUrl}`);
    } else {
      setFullPreviewUrl(previewUrl);
    }
  }, [previewUrl]);

  // Refresh iframe when opened
  useEffect(() => {
    if (isOpen) {
      setIframeKey(prev => prev + 1);
    }
  }, [isOpen]);

  const refreshPreview = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Eye className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Live Preview</DialogTitle>
              <div className="flex items-center gap-2">
                {/* Viewport Toggles */}
                {(Object.entries(VIEWPORT_LABELS) as [Viewport, typeof VIEWPORT_LABELS[Viewport]][]).map(([key, { icon: Icon, label }]) => (
                  <Button
                    key={key}
                    type="button"
                    variant={viewport === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewport(key)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                ))}

                {/* Refresh Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={refreshPreview}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className={`mx-auto bg-white shadow-lg transition-all ${VIEWPORT_SIZES[viewport]}`}>
              <iframe
                key={iframeKey}
                src={fullPreviewUrl}
                className="w-full h-full border-0"
                title="Live Preview"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
