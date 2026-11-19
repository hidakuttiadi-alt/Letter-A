// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/volunteer-applications
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { applyForVolunteer } from '@/server/services/volunteerService';
import { applyVolunteerSchema } from '@/server/validation/schemas';
import { checkRateLimit, getClientIp } from '@/server/utils/rate-limit';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`vol:${ip}`, 10, 60000);
    if (!rateCheck.success) {
      return errorResponse(
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        'Too many volunteer application attempts. Please wait a moment.',
        429,
        { retryAfterMs: rateCheck.resetMs }
      );
    }

    const body = await req.json();
    const parsed = applyVolunteerSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid volunteer application data',
        400,
        parsed.error.flatten()
      );
    }

    const user = await getCurrentUser(req);
    const application = await applyForVolunteer(parsed.data, user?.id || null);

    return successResponse(application, undefined, 201);
  } catch (err: any) {
    if (err.message === 'ALREADY_APPLIED') {
      return errorResponse(
        ErrorCodes.CONFLICT,
        'You have already applied for this volunteer opportunity.',
        409
      );
    }
    if (err.message === 'VOLUNTEER_OPPORTUNITY_NOT_FOUND') {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Volunteer opportunity not found.', 404);
    }
    if (err.message === 'VOLUNTEER_OPPORTUNITY_CLOSED') {
      return errorResponse(ErrorCodes.FORBIDDEN, 'This volunteer opportunity is currently closed.', 400);
    }
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
