// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/donations/demo/complete
// Description: Simulates server-verified completion of demo payment.
// ==============================================================================

import { NextRequest } from 'next/server';
import { completeDemoDonation, DonationError } from '@/server/services/donationService';
import { completeDemoDonationSchema } from '@/server/validation/schemas';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = completeDemoDonationSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid completion request',
        400,
        parsed.error.flatten()
      );
    }

    const receipt = await completeDemoDonation(parsed.data);
    return successResponse(receipt);
  } catch (err: any) {
    if (err instanceof DonationError) {
      if (err.code === 'NOT_FOUND') {
        return errorResponse(ErrorCodes.NOT_FOUND, err.message, 404);
      }
      if (err.code === 'FORBIDDEN') {
        return errorResponse(ErrorCodes.FORBIDDEN, err.message, 403);
      }
      return errorResponse(err.code, err.message, 400);
    }

    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
