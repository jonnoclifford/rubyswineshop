/**
 * API Route: /api/config/test
 *
 * Test GitHub API connection and verify configuration
 */

import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/github-api';

/**
 * GET /api/config/test
 *
 * Test the GitHub API connection and permissions
 *
 * @returns {object} Connection status and details
 */
export async function GET() {
  try {
    const result = await testConnection();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        details: result.details,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.message,
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to test connection',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
