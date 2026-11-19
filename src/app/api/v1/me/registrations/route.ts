// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/me/registrations
// Description: Secure endpoint for authenticated participants to view own registrations.
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { getUserRegistrations } from '@/server/services/registrationService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required to view your registrations', 401);
    }

    const registrations = await getUserRegistrations(user.id);
    return successResponse(registrations);
  } catch (err: any) {
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      err.message || 'Failed to retrieve registrations',
      500
    );
  }
}
