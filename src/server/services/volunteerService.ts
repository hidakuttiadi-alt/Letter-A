// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// VOLUNTEER SERVICE: src/server/services/volunteerService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type {
  VolunteerOpportunityDto,
  VolunteerApplicationDto,
  CreateVolunteerApplicationRequest,
} from '@/types/api';
import type { VolunteerOpportunityStatus, VolunteerApplicationStatus } from '@/types/database';

export async function listOpportunities(
  statusFilter?: VolunteerOpportunityStatus
): Promise<VolunteerOpportunityDto[]> {
  const admin = getAdminClient();
  let query = admin.from('volunteer_opportunities').select('*');

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  } else {
    query = query.in('status', ['open', 'paused']);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;

  return (data || []).map((row) => ({
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleMl: row.title_ml,
    descriptionEn: row.description_en,
    descriptionMl: row.description_ml,
    category: row.category,
    location: row.location,
    skillsNeeded: row.skills_needed,
    capacity: row.capacity,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function getOpportunityBySlugOrId(idOrSlug: string): Promise<VolunteerOpportunityDto | null> {
  const admin = getAdminClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

  let query = admin.from('volunteer_opportunities').select('*');
  if (isUuid) {
    query = query.eq('id', idOrSlug);
  } else {
    query = query.eq('slug', idOrSlug);
  }

  const { data, error } = await query.single();
  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    titleEn: data.title_en,
    titleMl: data.title_ml,
    descriptionEn: data.description_en,
    descriptionMl: data.description_ml,
    category: data.category,
    location: data.location,
    skillsNeeded: data.skills_needed,
    capacity: data.capacity,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function createOpportunity(input: any, actorId: string): Promise<VolunteerOpportunityDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('volunteer_opportunities')
    .insert({
      slug: input.slug,
      title_en: input.titleEn,
      title_ml: input.titleMl,
      description_en: input.descriptionEn,
      description_ml: input.descriptionMl,
      category: input.category,
      location: input.location,
      skills_needed: input.skillsNeeded || [],
      capacity: input.capacity || 0,
      status: input.status || 'open',
    })
    .select()
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId,
    action: 'CREATE_VOLUNTEER_OPPORTUNITY',
    resourceType: 'volunteer_opportunities',
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
    category: data.category,
    location: data.location,
    skillsNeeded: data.skills_needed,
    capacity: data.capacity,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function applyForVolunteer(
  input: CreateVolunteerApplicationRequest,
  userId?: string | null
): Promise<VolunteerApplicationDto> {
  const admin = getAdminClient();

  // 1. Verify opportunity exists and is open
  const opp = await getOpportunityBySlugOrId(input.opportunityId);
  if (!opp) {
    throw new Error('VOLUNTEER_OPPORTUNITY_NOT_FOUND');
  }
  if (opp.status !== 'open') {
    throw new Error('VOLUNTEER_OPPORTUNITY_CLOSED');
  }

  // 2. Check for duplicate application
  const { data: existing } = await admin
    .from('volunteer_applications')
    .select('id')
    .eq('opportunity_id', input.opportunityId)
    .eq('email', input.email.toLowerCase().trim())
    .single();

  if (existing) {
    throw new Error('ALREADY_APPLIED');
  }

  // 3. Insert application
  const { data, error } = await admin
    .from('volunteer_applications')
    .insert({
      opportunity_id: input.opportunityId,
      user_id: userId || null,
      full_name: input.fullName.trim(),
      email: input.email.toLowerCase().trim(),
      phone: input.phone.trim(),
      age: input.age || null,
      occupation: input.occupation || null,
      institution: input.institution || null,
      qualifications: input.qualifications || null,
      skills: input.skills || [],
      availability: input.availability.trim(),
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    opportunityId: data.opportunity_id,
    opportunityTitleEn: opp.titleEn,
    opportunityTitleMl: opp.titleMl,
    fullName: data.full_name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    occupation: data.occupation,
    institution: data.institution,
    qualifications: data.qualifications,
    skills: data.skills,
    availability: data.availability,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function getUserVolunteerApplications(userId: string): Promise<VolunteerApplicationDto[]> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('volunteer_applications')
    .select(`
      *,
      volunteer_opportunities:opportunity_id (
        title_en, title_ml
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    opportunityId: row.opportunity_id,
    opportunityTitleEn: row.volunteer_opportunities?.title_en,
    opportunityTitleMl: row.volunteer_opportunities?.title_ml,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    age: row.age,
    occupation: row.occupation,
    institution: row.institution,
    qualifications: row.qualifications,
    skills: row.skills,
    availability: row.availability,
    status: row.status,
    reviewerNotes: row.review_notes,
    reviewedAt: row.reviewed_at,
    createdAt: row.created_at,
  }));
}

export interface ListAdminVolunteerApplicationsOptions {
  opportunityId?: string;
  status?: VolunteerApplicationStatus;
  page?: number;
  limit?: number;
}

export async function listAdminVolunteerApplications(
  options: ListAdminVolunteerApplicationsOptions = {}
) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin
    .from('volunteer_applications')
    .select(`
      *,
      volunteer_opportunities:opportunity_id (
        title_en, title_ml
      )
    `, { count: 'exact' });

  if (options.opportunityId) {
    query = query.eq('opportunity_id', options.opportunityId);
  }
  if (options.status) {
    query = query.eq('status', options.status);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const applications: VolunteerApplicationDto[] = (data || []).map((row: any) => ({
    id: row.id,
    opportunityId: row.opportunity_id,
    opportunityTitleEn: row.volunteer_opportunities?.title_en,
    opportunityTitleMl: row.volunteer_opportunities?.title_ml,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    age: row.age,
    occupation: row.occupation,
    institution: row.institution,
    qualifications: row.qualifications,
    skills: row.skills,
    availability: row.availability,
    status: row.status,
    reviewerNotes: row.review_notes,
    reviewedAt: row.reviewed_at,
    createdAt: row.created_at,
  }));

  const total = count || 0;
  return {
    applications,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function updateVolunteerApplicationStatus(
  id: string,
  status: VolunteerApplicationStatus,
  reviewNotes: string | undefined,
  reviewerId: string
): Promise<VolunteerApplicationDto> {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from('volunteer_applications')
    .update({
      status,
      review_notes: reviewNotes || null,
      reviewer_id: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      volunteer_opportunities:opportunity_id (
        title_en, title_ml
      )
    `)
    .single();

  if (error) throw error;

  await recordAuditLog({
    actorId: reviewerId,
    action: 'REVIEW_VOLUNTEER_APPLICATION',
    resourceType: 'volunteer_applications',
    resourceId: id,
    metadata: { status, reviewNotes },
  });

  return {
    id: data.id,
    opportunityId: data.opportunity_id,
    opportunityTitleEn: (data as any).volunteer_opportunities?.title_en,
    opportunityTitleMl: (data as any).volunteer_opportunities?.title_ml,
    fullName: data.full_name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    occupation: data.occupation,
    institution: data.institution,
    qualifications: data.qualifications,
    skills: data.skills,
    availability: data.availability,
    status: data.status,
    reviewerNotes: data.review_notes,
    reviewedAt: data.reviewed_at,
    createdAt: data.created_at,
  };
}
