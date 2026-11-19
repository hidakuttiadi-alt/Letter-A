// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// CAMPAIGN SERVICE: src/server/services/campaignService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type {
  CampaignDto,
  CampaignParticipantDto,
  JoinCampaignRequest,
} from '@/types/api';
import type { PublicationStatus, CampaignStatus } from '@/types/database';

export interface ListCampaignsOptions {
  publicationStatus?: PublicationStatus;
  campaignStatus?: CampaignStatus;
  page?: number;
  limit?: number;
}

export async function listCampaigns(options: ListCampaignsOptions = {}) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin.from('campaigns').select('*', { count: 'exact' });

  if (options.publicationStatus) {
    query = query.eq('publication_status', options.publicationStatus);
  } else {
    query = query.eq('publication_status', 'published');
  }

  if (options.campaignStatus) {
    query = query.eq('campaign_status', options.campaignStatus);
  }

  query = query.order('start_time', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  // Get participation counts for these campaigns
  const campaignIds = (data || []).map((c) => c.id);
  const countsMap = new Map<string, number>();

  if (campaignIds.length > 0) {
    for (const cId of campaignIds) {
      const { count: pCount } = await admin
        .from('campaign_participants')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', cId);
      countsMap.set(cId, pCount || 0);
    }
  }

  const campaigns: CampaignDto[] = (data || []).map((row) => ({
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    descriptionEn: row.description_en,
    descriptionMl: row.description_ml,
    bannerUrl: row.banner_url,
    startTime: row.start_time,
    endTime: row.end_time,
    participationTarget: row.participation_target,
    currentParticipantsCount: countsMap.get(row.id) || 0,
    publicationStatus: row.publication_status,
    campaignStatus: row.campaign_status,
    createdAt: row.created_at,
  }));

  const total = count || 0;
  return {
    campaigns,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCampaignBySlugOrId(idOrSlug: string): Promise<CampaignDto | null> {
  const admin = getAdminClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  let query = admin.from('campaigns').select('*');
  if (isUuid) {
    query = query.eq('id', idOrSlug);
  } else {
    query = query.eq('slug', idOrSlug);
  }

  const { data, error } = await query.single();
  if (error || !data) return null;

  const { count: pCount } = await admin
    .from('campaign_participants')
    .select('*', { count: 'exact', head: true })
    .eq('campaign_id', data.id);

  return {
    id: data.id,
    slug: data.slug,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    descriptionEn: data.description_en,
    descriptionMl: data.description_ml,
    bannerUrl: data.banner_url,
    startTime: data.start_time,
    endTime: data.end_time,
    participationTarget: data.participation_target,
    currentParticipantsCount: pCount || 0,
    publicationStatus: data.publication_status,
    campaignStatus: data.campaign_status,
    createdAt: data.created_at,
  };
}

export async function joinCampaign(
  campaignId: string,
  input: JoinCampaignRequest,
  userId?: string | null
): Promise<CampaignParticipantDto> {
  const admin = getAdminClient();

  // 1. Verify campaign exists and is active
  const campaign = await getCampaignBySlugOrId(campaignId);
  if (!campaign) {
    throw new Error('CAMPAIGN_NOT_FOUND');
  }
  if (campaign.publicationStatus !== 'published' || campaign.campaignStatus !== 'active') {
    throw new Error('CAMPAIGN_INACTIVE');
  }

  // 2. Check for duplicate participant email
  const { data: existing } = await admin
    .from('campaign_participants')
    .select('id')
    .eq('campaign_id', campaign.id)
    .eq('email', input.email.toLowerCase().trim())
    .single();

  if (existing) {
    throw new Error('ALREADY_JOINED');
  }

  // 3. Insert participant
  const { data, error } = await admin
    .from('campaign_participants')
    .insert({
      campaign_id: campaign.id,
      user_id: userId || null,
      full_name: input.fullName.trim(),
      email: input.email.toLowerCase().trim(),
      phone: input.phone?.trim() || null,
      district: input.district?.trim() || null,
      pledge_text: input.pledgeText?.trim() || null,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    campaignId: data.campaign_id,
    campaignTitleEn: campaign.titleEn,
    campaignTitleMl: campaign.titleMl,
    fullName: data.full_name,
    district: data.district,
    pledgeText: data.pledge_text,
    createdAt: data.created_at,
  };
}

export async function getUserCampaigns(userId: string): Promise<CampaignParticipantDto[]> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('campaign_participants')
    .select(`
      *,
      campaigns:campaign_id (
        title_en, title_ml
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    campaignId: row.campaign_id,
    campaignTitleEn: row.campaigns?.title_en,
    campaignTitleMl: row.campaigns?.title_ml,
    fullName: row.full_name,
    district: row.district,
    pledgeText: row.pledge_text,
    createdAt: row.created_at,
  }));
}

export async function createCampaign(input: any, actorId: string): Promise<CampaignDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('campaigns')
    .insert({
      slug: input.slug,
      title_en: input.titleEn,
      title_ml: input.titleMl,
      description_en: input.descriptionEn,
      description_ml: input.descriptionMl,
      banner_url: input.bannerUrl || null,
      start_time: input.startTime,
      end_time: input.endTime,
      participation_target: input.participationTarget || 1000,
      publication_status: input.publicationStatus || 'draft',
      campaign_status: input.campaignStatus || 'upcoming',
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_CAMPAIGN',
    resourceType: 'campaigns',
    resourceId: data.id,
    metadata: { title_en: data.title_en, slug: data.slug },
  });

  return {
    id: data.id,
    slug: data.slug,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    descriptionEn: data.description_en,
    descriptionMl: data.description_ml,
    bannerUrl: data.banner_url,
    startTime: data.start_time,
    endTime: data.end_time,
    participationTarget: data.participation_target,
    currentParticipantsCount: 0,
    publicationStatus: data.publication_status,
    campaignStatus: data.campaign_status,
    createdAt: data.created_at,
  };
}
