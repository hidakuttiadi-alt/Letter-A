// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/campaigns
// ==============================================================================

import { NextRequest } from 'next/server';
import { listCampaigns } from '@/server/services/campaignService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignStatus = (searchParams.get('campaignStatus') as any) || undefined;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await listCampaigns({
      publicationStatus: 'published',
      campaignStatus,
      page,
      limit,
    });

    return successResponse(result.campaigns, result.meta);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
