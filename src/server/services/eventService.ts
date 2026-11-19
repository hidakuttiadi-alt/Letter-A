// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// EVENT SERVICE: src/server/services/eventService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type { EventDto, EventCategoryDto, EventUpdateDto } from '@/types/api';
import type { PublicationStatus, EventLifecycleStatus } from '@/types/database';

export interface ListEventsOptions {
  publicationStatus?: PublicationStatus;
  lifecycleStatus?: EventLifecycleStatus;
  categoryId?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

export async function listEvents(options: ListEventsOptions = {}) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin
    .from('events')
    .select(`
      *,
      event_categories:category_id (
        id, slug, name_en, name_ml, description_en, description_ml, display_order
      )
    `, { count: 'exact' });

  if (options.publicationStatus) {
    query = query.eq('publication_status', options.publicationStatus);
  }
  if (options.lifecycleStatus) {
    query = query.eq('lifecycle_status', options.lifecycleStatus);
  }
  if (options.categoryId) {
    query = query.eq('category_id', options.categoryId);
  }
  if (options.isFeatured !== undefined) {
    query = query.eq('is_featured', options.isFeatured);
  }
  if (options.search) {
    query = query.or(`title_en.ilike.%${options.search}%,title_ml.ilike.%${options.search}%`);
  }

  query = query.order('start_time', { ascending: true }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const events: EventDto[] = (data || []).map((row: any) => ({
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    descriptionEn: row.description_en,
    descriptionMl: row.description_ml,
    startTime: row.start_time,
    endTime: row.end_time,
    locationNameEn: row.location_name_en,
    locationNameMl: row.location_name_ml,
    locationAddress: row.location_address,
    locationMapUrl: row.location_map_url,
    category: row.event_categories
      ? {
          id: row.event_categories.id,
          slug: row.event_categories.slug,
          nameEn: row.event_categories.name_en,
          nameMl: row.event_categories.name_ml,
          descriptionEn: row.event_categories.description_en,
          descriptionMl: row.event_categories.description_ml,
          displayOrder: row.event_categories.display_order,
        }
      : null,
    bannerUrl: row.banner_url,
    registrationEnabled: row.registration_enabled,
    registrationCapacity: row.registration_capacity,
    registrationDeadline: row.registration_deadline,
    publicationStatus: row.publication_status,
    lifecycleStatus: row.lifecycle_status,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  const total = count || 0;
  return {
    events,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getEventBySlugOrId(idOrSlug: string): Promise<EventDto | null> {
  const admin = getAdminClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  let query = admin
    .from('events')
    .select(`
      *,
      event_categories:category_id (
        id, slug, name_en, name_ml, description_en, description_ml, display_order
      )
    `);

  if (isUuid) {
    query = query.eq('id', idOrSlug);
  } else {
    query = query.eq('slug', idOrSlug);
  }

  const { data, error } = await query.single();
  if (error || !data) return null;

  // Fetch confirmed registration count for this event
  const { count: regCount } = await admin
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', data.id)
    .in('registration_status', ['confirmed', 'pending']);

  const registeredCount = regCount || 0;
  const remainingCapacity =
    data.registration_capacity > 0
      ? Math.max(0, data.registration_capacity - registeredCount)
      : null;

  return {
    id: data.id,
    slug: data.slug,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    descriptionEn: data.description_en,
    descriptionMl: data.description_ml,
    startTime: data.start_time,
    endTime: data.end_time,
    locationNameEn: data.location_name_en,
    locationNameMl: data.location_name_ml,
    locationAddress: data.location_address,
    locationMapUrl: data.location_map_url,
    category: data.event_categories
      ? {
          id: data.event_categories.id,
          slug: data.event_categories.slug,
          nameEn: data.event_categories.name_en,
          nameMl: data.event_categories.name_ml,
          descriptionEn: data.event_categories.description_en,
          descriptionMl: data.event_categories.description_ml,
          displayOrder: data.event_categories.display_order,
        }
      : null,
    bannerUrl: data.banner_url,
    registrationEnabled: data.registration_enabled,
    registrationCapacity: data.registration_capacity,
    registeredCount,
    remainingCapacity,
    registrationDeadline: data.registration_deadline,
    publicationStatus: data.publication_status,
    lifecycleStatus: data.lifecycle_status,
    isFeatured: data.is_featured,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function createEvent(input: any, actorId: string): Promise<EventDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('events')
    .insert({
      slug: input.slug,
      title_en: input.titleEn,
      title_ml: input.titleMl,
      description_en: input.descriptionEn,
      description_ml: input.descriptionMl,
      start_time: input.startTime,
      end_time: input.endTime,
      location_name_en: input.locationNameEn,
      location_name_ml: input.locationNameMl,
      location_address: input.locationAddress || null,
      location_map_url: input.locationMapUrl || null,
      category_id: input.categoryId || null,
      banner_url: input.bannerUrl || null,
      registration_enabled: input.registrationEnabled ?? false,
      registration_capacity: input.registrationCapacity ?? 0,
      registration_deadline: input.registrationDeadline || null,
      publication_status: input.publicationStatus || 'draft',
      lifecycle_status: input.lifecycleStatus || 'upcoming',
      is_featured: input.isFeatured ?? false,
      created_by: actorId,
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_EVENT',
    resourceType: 'events',
    resourceId: data.id,
    metadata: { title_en: data.title_en, slug: data.slug },
  });

  const full = await getEventBySlugOrId(data.id);
  return full!;
}

export async function updateEvent(id: string, input: any, actorId: string): Promise<EventDto> {
  const admin = getAdminClient();

  const updates: Record<string, unknown> = {};
  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.titleEn !== undefined) updates.title_en = input.titleEn;
  if (input.titleMl !== undefined) updates.title_ml = input.titleMl;
  if (input.descriptionEn !== undefined) updates.description_en = input.descriptionEn;
  if (input.descriptionMl !== undefined) updates.description_ml = input.descriptionMl;
  if (input.startTime !== undefined) updates.start_time = input.startTime;
  if (input.endTime !== undefined) updates.end_time = input.endTime;
  if (input.locationNameEn !== undefined) updates.location_name_en = input.locationNameEn;
  if (input.locationNameMl !== undefined) updates.location_name_ml = input.locationNameMl;
  if (input.locationAddress !== undefined) updates.location_address = input.locationAddress;
  if (input.locationMapUrl !== undefined) updates.location_map_url = input.locationMapUrl;
  if (input.categoryId !== undefined) updates.category_id = input.categoryId;
  if (input.bannerUrl !== undefined) updates.banner_url = input.bannerUrl;
  if (input.registrationEnabled !== undefined) updates.registration_enabled = input.registrationEnabled;
  if (input.registrationCapacity !== undefined) updates.registration_capacity = input.registrationCapacity;
  if (input.registrationDeadline !== undefined) updates.registration_deadline = input.registrationDeadline;
  if (input.publicationStatus !== undefined) updates.publication_status = input.publicationStatus;
  if (input.lifecycleStatus !== undefined) updates.lifecycle_status = input.lifecycleStatus;
  if (input.isFeatured !== undefined) updates.is_featured = input.isFeatured;

  const { data, error } = await admin
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'UPDATE_EVENT',
    resourceType: 'events',
    resourceId: id,
    metadata: updates,
  });

  const full = await getEventBySlugOrId(id);
  return full!;
}

export async function publishEvent(id: string, actorId: string): Promise<EventDto> {
  return updateEvent(id, { publicationStatus: 'published' }, actorId);
}

export async function createEventUpdate(eventId: string, input: any, actorId: string): Promise<EventUpdateDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('event_updates')
    .insert({
      event_id: eventId,
      title_en: input.titleEn,
      title_ml: input.titleMl,
      content_en: input.contentEn,
      content_ml: input.contentMl,
      created_by: actorId,
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_EVENT_UPDATE',
    resourceType: 'event_updates',
    resourceId: data.id,
    metadata: { event_id: eventId, title_en: data.title_en },
  });

  return {
    id: data.id,
    eventId: data.event_id,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    contentEn: data.content_en,
    contentMl: data.content_ml,
    publishedAt: data.published_at,
  };
}

export async function listEventUpdates(eventId: string): Promise<EventUpdateDto[]> {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from('event_updates')
    .select('*')
    .eq('event_id', eventId)
    .order('published_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((row) => ({
    id: row.id,
    eventId: row.event_id,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    contentEn: row.content_en,
    contentMl: row.content_ml,
    publishedAt: row.published_at,
  }));
}
