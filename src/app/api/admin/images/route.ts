/**
 * API Route: /api/admin/images
 *
 * Protected admin endpoint for listing images
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { listImages, GitHubAPIError, readConfig, deleteImage, updateConfig } from '@/lib/github-api';
import type { SiteConfig } from '@/types/content';

/**
 * GET /api/admin/images
 *
 * List all images in the public/images directory (authenticated)
 *
 * @returns JSON array of image metadata objects
 */
export async function GET() {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch images from GitHub
    const images = await listImages();

    // Fetch metadata from config
    let config: SiteConfig;
    try {
      config = await readConfig();
    } catch (error) {
      console.error('Failed to load config for metadata:', error);
      config = {} as SiteConfig;
    }

    const metadata = config.media?.images || [];

    // Merge file list with metadata
    const imagesWithUrls = images.map(img => {
      const imgMetadata = metadata.find(m => m.filename === img.name);

      return {
        filename: img.name,
        size: img.size,
        path: process.env.NODE_ENV === 'production'
          ? `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/${process.env.GITHUB_BRANCH}/${img.path}`
          : `/images/${img.name}`,
        alt: imgMetadata?.alt,
        caption: imgMetadata?.caption,
        folder: imgMetadata?.folder,
        uploadedAt: imgMetadata?.uploadedAt || new Date().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      images: imagesWithUrls,
    });
  } catch (error) {
    console.error('Failed to list images:', error);

    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to list images' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/images
 *
 * Delete an image and its metadata
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get filename from query parameters
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Validate filename
    if (filename.includes('..') || filename.includes('/')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Delete image from GitHub
    await deleteImage(filename);

    // Remove metadata from config
    try {
      const config: SiteConfig = await readConfig();

      if (config.media?.images) {
        config.media.images = config.media.images.filter(img => img.filename !== filename);
        await updateConfig(config, `Delete image: ${filename}`);
      }
    } catch (metadataError) {
      console.error('Failed to remove image metadata:', metadataError);
      // Continue even if metadata removal fails
    }

    return NextResponse.json({
      success: true,
      message: `Image '${filename}' deleted successfully`,
    });
  } catch (error) {
    console.error('Failed to delete image:', error);

    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
