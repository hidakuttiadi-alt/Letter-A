// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/activity/live
// Description: Real-time public feed of event updates and announcements.
// ==============================================================================

import { getLiveActivity } from '@/server/services/activityService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET() {
  try {
    const liveFeed = await getLiveActivity();
    return successResponse(liveFeed);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
