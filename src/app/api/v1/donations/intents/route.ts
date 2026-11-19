// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/donations/intents
// Description: Initiates a donation intent (DEMO MODE enabled).
// ==============================================================================

import { NextRequest } from 'next/server';
import { createDonationIntent } from '@/server/services/donationService';
import { createDonationIntentSchema } from '@/server/validation/schemas';
import { checkRateLimit, getClientIp } from '@/server/utils/rate-limit';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`don:${ip}`, 10, 60000);
    if (!rateCheck.success) {
      return errorResponse(
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        'Too many donation requests. Please wait a moment.',
        429,
        { retryAfterMs: rateCheck.resetMs }
      );
    }

    const body = await req.json();
    const parsed = createDonationIntentSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid donation intent details',
        400,
        parsed.error.flatten()
      );
    }

    const intent = await createDonationIntent(parsed.data);
    return successResponse(intent, undefined, 201);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
