// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: POST /api/v1/admin/bootstrap
// Description: Secure first-run super-admin provisioning. Permanently locked once an admin exists.
// ==============================================================================

import { NextRequest } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';
import { z } from 'zod';

const bootstrapSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bootstrapSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, 'Valid email required', 400);
    }

    const admin = getAdminClient();

    // Call stored procedure
    const { data, error } = await admin.rpc('bootstrap_first_super_admin', {
      p_email: parsed.data.email,
    });

    if (error) {
      if (error.message.includes('SUPER_ADMIN_ALREADY_EXISTS')) {
        return errorResponse(
          ErrorCodes.FORBIDDEN,
          'Bootstrap is permanently locked: super administrator already exists.',
          403
        );
      }
      if (error.message.includes('USER_NOT_FOUND')) {
        return errorResponse(
          ErrorCodes.NOT_FOUND,
          `User with email ${parsed.data.email} must register an account first.`,
          404
        );
      }
      return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, error.message, 500);
    }

    return successResponse({
      message: `User ${parsed.data.email} successfully designated as initial Super Administrator.`,
      bootstrapped: data,
    });
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
