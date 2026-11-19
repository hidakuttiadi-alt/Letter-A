// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/history/[id]
// ==============================================================================

import { NextRequest } from 'next/server';
import { getMilestoneById } from '@/server/services/historyService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const milestone = await getMilestoneById(params.id);
    if (!milestone || milestone.verificationStatus !== 'verified') {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Milestone not found', 404);
    }

    return successResponse(milestone);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
