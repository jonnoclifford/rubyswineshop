/**
 * API Route: /api/admin/images/delete
 *
 * Protected admin endpoint for deleting images
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { deleteImage, GitHubAPIError } from '@/lib/github-api';

/**
 * DELETE /api/admin/images/delete
 *
 * Delete an image from the public/images directory (authenticated)
 *
 * @param request - Request with filename in query parameters
 * @returns JSON with success/error message
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get filename from query parameters
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Validate filename (basic security check)
    if (filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Delete image from GitHub
    await deleteImage(filename);

    return NextResponse.json({
      success: true,
      message: `Image '${filename}' deleted successfully`,
    });
  } catch (error) {
    console.error('Failed to delete image:', error);

    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
