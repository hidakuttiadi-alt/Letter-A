// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// AUDIT LOGGER: src/server/utils/audit.ts
// Description: Safe logging of administrative actions with automatic PII/secret scrubbing.
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';

export interface AuditLogParams {
  actorId?: string | null;
  actorRole?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
}

const SENSITIVE_PATTERNS = [
  'password',
  'token',
  'secret',
  'authorization',
  'service_role_key',
  'cookie',
  'jwt',
  'api_key',
  'private_key',
];

function sanitizeMetadata(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_PATTERNS.some((pattern) => lowerKey.includes(pattern));

    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeMetadata(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export async function recordAuditLog(params: AuditLogParams): Promise<void> {
  try {
    const admin = getAdminClient();
    const safeMetadata = params.metadata ? sanitizeMetadata(params.metadata) : {};

    await admin.from('audit_logs').insert({
      actor_id: params.actorId || null,
      actor_role: params.actorRole || null,
      action: params.action,
      resource_type: params.resourceType,
      resource_id: params.resourceId || null,
      ip_address: params.ipAddress || null,
      user_agent: params.userAgent || null,
      metadata: safeMetadata,
    });
  } catch (err) {
    // Avoid crashing primary transaction on logging error, but log to stderr
    console.error('[AUDIT_LOG_ERROR] Failed to record audit log:', err);
  }
}
