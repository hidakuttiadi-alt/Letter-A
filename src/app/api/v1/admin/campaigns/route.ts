// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/admin/campaigns
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isContentManager } from '@/server/permissions/rbac';
import { createCampaign } from '@/server/services/campaignService';
import { createCampaignSchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isContentManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to create campaigns', 403);
    }

    const body = await req.json();
    const parsed = createCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid campaign data', 400, parsed.error.flatten());
    }

    const created = await createCampaign(parsed.data, user.id);
    return successResponse(created, undefined, 201);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
