// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/registrations
// Description: Concurrency-safe event registration endpoint with rate limiting.
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { registerForEvent, RegistrationError } from '@/server/services/registrationService';
import { registerForEventSchema } from '@/server/validation/schemas';
import { checkRateLimit, getClientIp } from '@/server/utils/rate-limit';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check (e.g. max 10 registration attempts per IP per minute)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`reg:${ip}`, 10, 60000);
    if (!rateCheck.success) {
      return errorResponse(
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        'Too many registration attempts. Please try again in a few moments.',
        429,
        { retryAfterMs: rateCheck.resetMs }
      );
    }

    // 2. Validate request body
    const body = await req.json();
    const parsed = registerForEventSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid registration details',
        400,
        parsed.error.flatten()
      );
    }

    // 3. Optional authenticated user identity
    const user = await getCurrentUser(req);
    const userId = user ? user.id : null;

    // 4. Atomic registration execution
    const confirmation = await registerForEvent(parsed.data, userId);

    return successResponse(confirmation, undefined, 201);
  } catch (err: any) {
    if (err instanceof RegistrationError) {
      if (err.code === 'NOT_FOUND') {
        return errorResponse(ErrorCodes.NOT_FOUND, err.message, 404);
      }
      if (err.code === 'CAPACITY_EXCEEDED') {
        return errorResponse(ErrorCodes.CAPACITY_EXCEEDED, err.message, 409);
      }
      if (err.code === 'ALREADY_REGISTERED') {
        return errorResponse(ErrorCodes.CONFLICT, err.message, 409);
      }
      if (err.code === 'DEADLINE_PASSED') {
        return errorResponse(ErrorCodes.DEADLINE_PASSED, err.message, 400);
      }
      return errorResponse(err.code, err.message, 400);
    }

    return errorResponse(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      err.message || 'An unexpected error occurred while processing registration',
      500
    );
  }
}
