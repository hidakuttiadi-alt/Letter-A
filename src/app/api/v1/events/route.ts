// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/events
// ==============================================================================

import { NextRequest } from 'next/server';
import { listEvents } from '@/server/services/eventService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const isFeatured = searchParams.has('isFeatured')
      ? searchParams.get('isFeatured') === 'true'
      : undefined;
    const lifecycleStatus = (searchParams.get('lifecycleStatus') as any) || undefined;
    const search = searchParams.get('search') || undefined;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await listEvents({
      publicationStatus: 'published',
      lifecycleStatus,
      categoryId,
      isFeatured,
      search,
      page,
      limit,
    });

    return successResponse(result.events, result.meta);
  } catch (err: any) {
    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      err.message || 'Failed to retrieve events',
      500
    );
  }
}
