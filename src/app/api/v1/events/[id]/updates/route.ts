// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/events/[id]/updates
// ==============================================================================

import { NextRequest } from 'next/server';
import { getEventBySlugOrId, listEventUpdates } from '@/server/services/eventService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await getEventBySlugOrId(params.id);
    if (!event) {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Event not found', 404);
    }

    const updates = await listEventUpdates(event.id);
    return successResponse(updates);
  } catch (err: any) {
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      err.message || 'Failed to retrieve event updates',
      500
    );
  }
}
