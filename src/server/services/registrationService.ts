// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// REGISTRATION SERVICE: src/server/services/registrationService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type {
  EventRegistrationDto,
  RegistrationConfirmationDto,
  CreateRegistrationRequest,
} from '@/types/api';
import type { RegistrationStatus } from '@/types/database';

export class RegistrationError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export async function registerForEvent(
  input: CreateRegistrationRequest,
  userId?: string | null
): Promise<RegistrationConfirmationDto> {
  const admin = getAdminClient();

  // Call the atomic database RPC function to ensure race-free capacity verification
  const { data, error } = await admin.rpc('register_for_event_atomic', {
    p_event_id: input.eventId,
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_email: input.email,
    p_institution: input.institution || null,
    p_user_id: userId || null,
    p_notes: input.notes || null,
  });

  if (error) {
    const msg = error.message || '';
    if (msg.includes('EVENT_NOT_FOUND')) {
      throw new RegistrationError('NOT_FOUND', 'Event not found');
    }
    if (msg.includes('EVENT_NOT_PUBLISHED') || msg.includes('EVENT_NOT_ACTIVE')) {
      throw new RegistrationError('EVENT_INACTIVE', 'Event is not accepting registrations');
    }
    if (msg.includes('REGISTRATION_DISABLED')) {
      throw new RegistrationError('REGISTRATION_DISABLED', 'Registrations are disabled for this event');
    }
    if (msg.includes('REGISTRATION_DEADLINE_PASSED')) {
      throw new RegistrationError('DEADLINE_PASSED', 'Registration deadline has passed');
    }
    if (msg.includes('ALREADY_REGISTERED') || error.code === '23505') {
      throw new RegistrationError('ALREADY_REGISTERED', 'This email is already registered for this event');
    }
    if (msg.includes('CAPACITY_REACHED')) {
      throw new RegistrationError('CAPACITY_EXCEEDED', 'Event registration capacity has been reached');
    }
    throw new RegistrationError('INTERNAL_ERROR', error.message);
  }

  const result = data as any;

  return {
    registrationId: result.registration_id,
    registrationReference: result.registration_reference,
    eventId: result.event_id,
    eventTitleEn: result.event_title_en,
    eventTitleMl: result.event_title_ml,
    fullName: result.full_name,
    email: result.email,
    phone: result.phone,
    status: result.status,
    createdAt: result.created_at,
  };
}

export async function getUserRegistrations(userId: string): Promise<EventRegistrationDto[]> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('event_registrations')
    .select(`
      *,
      events:event_id (
        title_en, title_ml
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    eventId: row.event_id,
    eventTitleEn: row.events?.title_en,
    eventTitleMl: row.events?.title_ml,
    registrationReference: row.registration_reference,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    institution: row.institution,
    registrationStatus: row.registration_status,
    notes: row.notes,
    createdAt: row.created_at,
    cancelledAt: row.cancelled_at,
  }));
}

export interface ListAdminRegistrationsOptions {
  eventId?: string;
  status?: RegistrationStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export async function listAdminRegistrations(options: ListAdminRegistrationsOptions = {}) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin
    .from('event_registrations')
    .select(`
      *,
      events:event_id (
        title_en, title_ml
      )
    `, { count: 'exact' });

  if (options.eventId) {
    query = query.eq('event_id', options.eventId);
  }
  if (options.status) {
    query = query.eq('registration_status', options.status);
  }
  if (options.search) {
    query = query.or(`full_name.ilike.%${options.search}%,email.ilike.%${options.search}%,registration_reference.ilike.%${options.search}%`);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const registrations: EventRegistrationDto[] = (data || []).map((row: any) => ({
    id: row.id,
    eventId: row.event_id,
    eventTitleEn: row.events?.title_en,
    eventTitleMl: row.events?.title_ml,
    registrationReference: row.registration_reference,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    institution: row.institution,
    registrationStatus: row.registration_status,
    notes: row.notes,
    createdAt: row.created_at,
    cancelledAt: row.cancelled_at,
  }));

  const total = count || 0;
  return {
    registrations,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
  notes: string | undefined,
  actorId: string
): Promise<EventRegistrationDto> {
  const admin = getAdminClient();

  const updates: Record<string, unknown> = {
    registration_status: status,
  };
  if (notes !== undefined) updates.notes = notes;
  if (status === 'cancelled') updates.cancelled_at = new Date().toISOString();

  const { data, error } = await admin
    .from('event_registrations')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      events:event_id (
        title_en, title_ml
      )
    `)
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'UPDATE_REGISTRATION_STATUS',
    resourceType: 'event_registrations',
    resourceId: id,
    metadata: { status, notes },
  });

  return {
    id: data.id,
    eventId: data.event_id,
    eventTitleEn: (data as any).events?.title_en,
    eventTitleMl: (data as any).events?.title_ml,
    registrationReference: data.registration_reference,
    fullName: data.full_name,
    phone: data.phone,
    email: data.email,
    institution: data.institution,
    registrationStatus: data.registration_status,
    notes: data.notes,
    createdAt: data.created_at,
    cancelledAt: data.cancelled_at,
  };
}
