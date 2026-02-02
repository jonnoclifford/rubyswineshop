/**
 * Logout Route
 *
 * This endpoint clears the user's session and logs them out.
 *
 * Method: POST
 * Returns: JSON response with success status
 */

import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/auth';

export async function POST() {
  try {
    await clearSession();

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
