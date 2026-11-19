// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// SUPABASE ADMIN CLIENT: src/lib/supabase/admin.ts
// Description: Privileged service-role Supabase client for backend operations,
//              atomic registration enforcement, and audit logging.
// ==============================================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

if (typeof window !== 'undefined') {
  throw new Error('CRITICAL SECURITY VIOLATION: admin.ts must NEVER be imported on client side!');
}

let adminClient: SupabaseClient<any, 'public', any> | null = null;

export function getAdminClient(): SupabaseClient<any, 'public', any> {
  if (adminClient) return adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
