// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/campaigns/[id]/join
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { joinCampaign } from '@/server/services/campaignService';
import { joinCampaignSchema } from '@/server/validation/schemas';
import { checkRateLimit, getClientIp } from '@/server/utils/rate-limit';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`cmp:${ip}`, 15, 60000);
    if (!rateCheck.success) {
      return errorResponse(
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        'Too many attempts. Please try again in a moment.',
        429,
        { retryAfterMs: rateCheck.resetMs }
      );
    }

    const body = await req.json();
    const parsed = joinCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid campaign join data',
        400,
        parsed.error.flatten()
      );
    }

    const user = await getCurrentUser(req);
    const participant = await joinCampaign(params.id, parsed.data, user?.id || null);

    return successResponse(participant, undefined, 201);
  } catch (err: any) {
    if (err.message === 'ALREADY_JOINED') {
      return errorResponse(
        ErrorCodes.CONFLICT,
        'This email has already joined this campaign.',
        409
      );
    }
    if (err.message === 'CAMPAIGN_NOT_FOUND') {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Campaign not found.', 404);
    }
    if (err.message === 'CAMPAIGN_INACTIVE') {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Campaign is not currently active.', 400);
    }
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
