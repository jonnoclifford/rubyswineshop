/**
 * API Route: /api/admin/images
 *
 * Protected admin endpoint for listing images
 * Requires authentication
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { listImages, GitHubAPIError } from '@/lib/github-api';

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

    return NextResponse.json({
      success: true,
      images,
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
