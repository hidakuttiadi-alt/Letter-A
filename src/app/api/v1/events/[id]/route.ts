// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/events/[id] (Accepts UUID or slug)
// ==============================================================================

import { NextRequest } from 'next/server';
import { getEventBySlugOrId } from '@/server/services/eventService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await getEventBySlugOrId(params.id);

    if (!event || event.publicationStatus !== 'published') {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Event not found or not published', 404);
    }

    return successResponse(event);
  } catch (err: any) {
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      err.message || 'Failed to retrieve event details',
      500
    );
  }
}
