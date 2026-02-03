/**
 * API Route: /api/admin/images/metadata
 *
 * Update image metadata (alt text, caption, folder)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readConfig, updateConfig } from '@/lib/github-api';
import type { SiteConfig, ImageMetadata } from '@/types/content';

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { filename, alt, caption, folder } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    // Read current config
    const config: SiteConfig = await readConfig();

    // Initialize media library if it doesn't exist
    if (!config.media) {
      config.media = { images: [] };
    }

    // Find or create image metadata
    const imageIndex = config.media.images.findIndex(img => img.filename === filename);

    if (imageIndex >= 0) {
      // Update existing metadata
      config.media.images[imageIndex] = {
        ...config.media.images[imageIndex],
        alt,
        caption,
        folder,
      };
    } else {
      // Create new metadata entry
      config.media.images.push({
        filename,
        path: `/images/${filename}`,
        alt,
        caption,
        folder,
        uploadedAt: new Date().toISOString(),
        size: 0, // Will be updated when we have actual file info
      });
    }

    // Save updated config
    await updateConfig(config, `Update metadata for ${filename}`);

    return NextResponse.json({
      success: true,
      message: 'Metadata updated successfully',
    });
  } catch (error) {
    console.error('Failed to update metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update metadata' },
      { status: 500 }
    );
  }
}
