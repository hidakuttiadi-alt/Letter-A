// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// HISTORY SERVICE: src/server/services/historyService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type { HistoricalMilestoneDto } from '@/types/api';
import type { PublicationStatus, MilestoneVerificationStatus } from '@/types/database';

export interface ListMilestonesOptions {
  publicationStatus?: PublicationStatus;
  verificationStatus?: MilestoneVerificationStatus;
}

export async function listMilestones(options: ListMilestonesOptions = {}): Promise<HistoricalMilestoneDto[]> {
  const admin = getAdminClient();
  let query = admin.from('historical_milestones').select('*');

  if (options.publicationStatus) {
    query = query.eq('publication_status', options.publicationStatus);
  } else {
    query = query.eq('publication_status', 'published');
  }

  if (options.verificationStatus) {
    query = query.eq('verification_status', options.verificationStatus);
  } else {
    query = query.eq('verification_status', 'verified');
  }

  const { data, error } = await query
    .order('display_order', { ascending: true })
    .order('milestone_year', { ascending: true });

  if (error) throw error;

  return (data || []).map((row) => ({
    id: row.id,
    milestoneYear: row.milestone_year,
    milestoneDate: row.milestone_date,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    descriptionEn: row.description_en,
    descriptionMl: row.description_ml,
    mediaUrl: row.media_url,
    mediaCaptionEn: row.media_caption_en,
    mediaCaptionMl: row.media_caption_ml,
    sourceReferences: row.source_references,
    verificationStatus: row.verification_status,
    displayOrder: row.display_order,
  }));
}

export async function getMilestoneById(id: string): Promise<HistoricalMilestoneDto | null> {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from('historical_milestones')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    milestoneYear: data.milestone_year,
    milestoneDate: data.milestone_date,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    descriptionEn: data.description_en,
    descriptionMl: data.description_ml,
    mediaUrl: data.media_url,
    mediaCaptionEn: data.media_caption_en,
    mediaCaptionMl: data.media_caption_ml,
    sourceReferences: data.source_references,
    verificationStatus: data.verification_status,
    displayOrder: data.display_order,
  };
}

export async function createMilestone(input: any, actorId: string): Promise<HistoricalMilestoneDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('historical_milestones')
    .insert({
      milestone_year: input.milestoneYear,
      milestone_date: input.milestoneDate || null,
      title_en: input.titleEn,
      title_ml: input.titleMl,
      description_en: input.descriptionEn,
      description_ml: input.descriptionMl,
      media_url: input.mediaUrl || null,
      media_caption_en: input.mediaCaptionEn || null,
      media_caption_ml: input.mediaCaptionMl || null,
      source_references: input.sourceReferences || null,
      verification_status: input.verificationStatus || 'verified',
      publication_status: input.publicationStatus || 'published',
      display_order: input.displayOrder || 0,
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_HISTORICAL_MILESTONE',
    resourceType: 'historical_milestones',
    resourceId: data.id,
    metadata: { year: data.milestone_year, title_en: data.title_en },
  });

  return getMilestoneById(data.id) as Promise<HistoricalMilestoneDto>;
}

export async function updateMilestone(id: string, input: any, actorId: string): Promise<HistoricalMilestoneDto> {
  const admin = getAdminClient();

  const updates: Record<string, unknown> = {};
  if (input.milestoneYear !== undefined) updates.milestone_year = input.milestoneYear;
  if (input.milestoneDate !== undefined) updates.milestone_date = input.milestoneDate;
  if (input.titleEn !== undefined) updates.title_en = input.titleEn;
  if (input.titleMl !== undefined) updates.title_ml = input.titleMl;
  if (input.descriptionEn !== undefined) updates.description_en = input.descriptionEn;
  if (input.descriptionMl !== undefined) updates.description_ml = input.descriptionMl;
  if (input.mediaUrl !== undefined) updates.media_url = input.mediaUrl;
  if (input.mediaCaptionEn !== undefined) updates.media_caption_en = input.mediaCaptionEn;
  if (input.mediaCaptionMl !== undefined) updates.media_caption_ml = input.mediaCaptionMl;
  if (input.sourceReferences !== undefined) updates.source_references = input.sourceReferences;
  if (input.verificationStatus !== undefined) updates.verification_status = input.verificationStatus;
  if (input.publicationStatus !== undefined) updates.publication_status = input.publicationStatus;
  if (input.displayOrder !== undefined) updates.display_order = input.displayOrder;

  const { data, error } = await admin
    .from('historical_milestones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'UPDATE_HISTORICAL_MILESTONE',
    resourceType: 'historical_milestones',
    resourceId: id,
    metadata: updates,
  });

  return getMilestoneById(data.id) as Promise<HistoricalMilestoneDto>;
}
