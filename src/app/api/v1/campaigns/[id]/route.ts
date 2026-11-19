// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/campaigns/[id]
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCampaignBySlugOrId } from '@/server/services/campaignService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = await getCampaignBySlugOrId(params.id);
    if (!campaign || campaign.publicationStatus !== 'published') {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Campaign not found', 404);
    }

    return successResponse(campaign);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
