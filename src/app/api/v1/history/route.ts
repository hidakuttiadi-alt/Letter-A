// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/history
// Description: Verified public centenary milestones (1926 - 2026).
// ==============================================================================

import { listMilestones } from '@/server/services/historyService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET() {
  try {
    const milestones = await listMilestones({
      publicationStatus: 'published',
      verificationStatus: 'verified',
    });
    return successResponse(milestones);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
