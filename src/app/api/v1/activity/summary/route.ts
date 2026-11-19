// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/activity/summary
// Description: Privacy-safe public activity metrics aggregated across all modules.
// ==============================================================================

import { getActivitySummary } from '@/server/services/activityService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET() {
  try {
    const summary = await getActivitySummary();
    return successResponse(summary);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
