// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/admin/registrations
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isEventManager } from '@/server/permissions/rbac';
import { listAdminRegistrations } from '@/server/services/registrationService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isEventManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to view registrations', 403);
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId') || undefined;
    const status = (searchParams.get('status') as any) || undefined;
    const search = searchParams.get('search') || undefined;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await listAdminRegistrations({
      eventId,
      status,
      search,
      page,
      limit,
    });

    return successResponse(result.registrations, result.meta);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
