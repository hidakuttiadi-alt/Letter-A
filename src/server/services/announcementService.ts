// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ANNOUNCEMENT SERVICE: src/server/services/announcementService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type { AnnouncementDto } from '@/types/api';
import type { PublicationStatus, AnnouncementPriority } from '@/types/database';

export interface ListAnnouncementsOptions {
  priority?: AnnouncementPriority;
  publicationStatus?: PublicationStatus;
  page?: number;
  limit?: number;
}

export async function listAnnouncements(options: ListAnnouncementsOptions = {}) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin.from('announcements').select('*', { count: 'exact' });

  if (options.publicationStatus) {
    query = query.eq('publication_status', options.publicationStatus);
  } else {
    query = query.eq('publication_status', 'published');
  }

  if (options.priority) {
    query = query.eq('priority', options.priority);
  }

  query = query.order('published_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const announcements: AnnouncementDto[] = (data || []).map((row) => ({
    id: row.id,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    contentEn: row.content_en,
    contentMl: row.content_ml,
    priority: row.priority,
    publicationStatus: row.publication_status,
    publishedAt: row.published_at,
    eventId: row.event_id,
    campaignId: row.campaign_id,
    createdAt: row.created_at,
  }));

  const total = count || 0;
  return {
    announcements,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createAnnouncement(input: any, actorId: string): Promise<AnnouncementDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('announcements')
    .insert({
      title_en: input.titleEn,
      title_ml: input.titleMl,
      content_en: input.contentEn,
      content_ml: input.contentMl,
      priority: input.priority || 'medium',
      publication_status: input.publicationStatus || 'published',
      published_at: input.publishedAt || new Date().toISOString(),
      event_id: input.eventId || null,
      campaign_id: input.campaignId || null,
      author_id: actorId,
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_ANNOUNCEMENT',
    resourceType: 'announcements',
    resourceId: data.id,
    metadata: { title_en: data.title_en, priority: data.priority },
  });

  return {
    id: data.id,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    contentEn: data.content_en,
    contentMl: data.content_ml,
    priority: data.priority,
    publicationStatus: data.publication_status,
    publishedAt: data.published_at,
    eventId: data.event_id,
    campaignId: data.campaign_id,
    createdAt: data.created_at,
  };
}

export async function updateAnnouncement(id: string, input: any, actorId: string): Promise<AnnouncementDto> {
  const admin = getAdminClient();

  const updates: Record<string, unknown> = {};
  if (input.titleEn !== undefined) updates.title_en = input.titleEn;
  if (input.titleMl !== undefined) updates.title_ml = input.titleMl;
  if (input.contentEn !== undefined) updates.content_en = input.contentEn;
  if (input.contentMl !== undefined) updates.content_ml = input.contentMl;
  if (input.priority !== undefined) updates.priority = input.priority;
  if (input.publicationStatus !== undefined) updates.publication_status = input.publicationStatus;
  if (input.publishedAt !== undefined) updates.published_at = input.publishedAt;
  if (input.eventId !== undefined) updates.event_id = input.eventId;
  if (input.campaignId !== undefined) updates.campaign_id = input.campaignId;

  const { data, error } = await admin
    .from('announcements')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'UPDATE_ANNOUNCEMENT',
    resourceType: 'announcements',
    resourceId: id,
    metadata: updates,
  });

  return {
    id: data.id,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    contentEn: data.content_en,
    contentMl: data.content_ml,
    priority: data.priority,
    publicationStatus: data.publication_status,
    publishedAt: data.published_at,
    eventId: data.event_id,
    campaignId: data.campaign_id,
    createdAt: data.created_at,
  };
}
