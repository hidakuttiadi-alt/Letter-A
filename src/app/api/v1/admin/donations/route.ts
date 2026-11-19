// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/admin/donations
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isAdmin } from '@/server/permissions/rbac';
import { listAdminDonations } from '@/server/services/donationService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isAdmin(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to view financial data', 403);
    }

    const { searchParams } = new URL(req.url);
    const status = (searchParams.get('status') as any) || undefined;
    const isDemo = searchParams.has('isDemo') ? searchParams.get('isDemo') === 'true' : undefined;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await listAdminDonations({ status, isDemo, page, limit });
    return successResponse(result.donations, result.meta);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
