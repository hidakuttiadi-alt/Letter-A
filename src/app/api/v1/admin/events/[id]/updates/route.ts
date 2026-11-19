// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/admin/events/[id]/updates
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isEventManager } from '@/server/permissions/rbac';
import { createEventUpdate } from '@/server/services/eventService';
import { createEventUpdateSchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isEventManager(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to add updates', 403);
    }

    const body = await req.json();
    const parsed = createEventUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid update data',
        400,
        parsed.error.flatten()
      );
    }

    const update = await createEventUpdate(params.id, parsed.data, user.id);
    return successResponse(update, undefined, 201);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
