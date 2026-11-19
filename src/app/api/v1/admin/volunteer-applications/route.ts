// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/admin/volunteer-applications
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isVolunteerManager } from '@/server/permissions/rbac';
import { listAdminVolunteerApplications } from '@/server/services/volunteerService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isVolunteerManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions', 403);
    }

    const { searchParams } = new URL(req.url);
    const opportunityId = searchParams.get('opportunityId') || undefined;
    const status = (searchParams.get('status') as any) || undefined;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await listAdminVolunteerApplications({
      opportunityId,
      status,
      page,
      limit,
    });

    return successResponse(result.applications, result.meta);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
