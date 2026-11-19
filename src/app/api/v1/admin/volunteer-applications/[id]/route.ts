// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: PATCH /api/v1/admin/volunteer-applications/[id]
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isVolunteerManager } from '@/server/permissions/rbac';
import { updateVolunteerApplicationStatus } from '@/server/services/volunteerService';
import { updateVolunteerApplicationStatusSchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isVolunteerManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to review application', 403);
    }

    const body = await req.json();
    const parsed = updateVolunteerApplicationStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid status update payload',
        400,
        parsed.error.flatten()
      );
    }

    const updated = await updateVolunteerApplicationStatus(
      params.id,
      parsed.data.status,
      parsed.data.reviewNotes,
      user.id
    );

    return successResponse(updated);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
