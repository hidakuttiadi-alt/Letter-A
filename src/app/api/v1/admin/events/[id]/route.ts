// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: PATCH /api/v1/admin/events/[id] & GET /api/v1/admin/events/[id]
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isEventManager } from '@/server/permissions/rbac';
import { getEventBySlugOrId, updateEvent } from '@/server/services/eventService';
import { updateEventSchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(
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
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions', 403);
    }

    const event = await getEventBySlugOrId(params.id);
    if (!event) {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Event not found', 404);
    }

    return successResponse(event);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}

export async function PATCH(
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
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to update events', 403);
    }

    const body = await req.json();
    const parsed = updateEventSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid update payload',
        400,
        parsed.error.flatten()
      );
    }

    const updated = await updateEvent(params.id, parsed.data, user.id);
    return successResponse(updated);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
