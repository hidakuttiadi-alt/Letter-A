// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// AUTH SESSION UTILITY: src/server/auth/session.ts
// Description: Secure server-side identity extraction for App Router Route Handlers.
// ==============================================================================

import { createClient } from '@/lib/supabase/server';
import { getAdminClient } from '@/lib/supabase/admin';
import type { User } from '@supabase/supabase-js';

export async function getCurrentUser(req?: Request): Promise<User | null> {
  // 1. Check Authorization Bearer header if provided (useful for mobile clients / API calls)
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      if (token) {
        try {
          const admin = getAdminClient();
          const { data: { user }, error } = await admin.auth.getUser(token);
          if (!error && user) {
            return user;
          }
        } catch {
          // Fall through to cookie inspection
        }
      }
    }
  }

  // 2. Check App Router cookie store
  try {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}
