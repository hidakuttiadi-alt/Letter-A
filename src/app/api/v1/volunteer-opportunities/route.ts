// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET & POST /api/v1/volunteer-opportunities
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isVolunteerManager } from '@/server/permissions/rbac';
import { listOpportunities, createOpportunity } from '@/server/services/volunteerService';
import { createVolunteerOpportunitySchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET() {
  try {
    const opportunities = await listOpportunities('open');
    return successResponse(opportunities);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isVolunteerManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to create opportunities', 403);
    }

    const body = await req.json();
    const parsed = createVolunteerOpportunitySchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Invalid opportunity data', 400, parsed.error.flatten());
    }

    const created = await createOpportunity(parsed.data, user.id);
    return successResponse(created, undefined, 201);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
