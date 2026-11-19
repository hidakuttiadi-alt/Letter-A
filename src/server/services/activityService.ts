// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ACTIVITY & METRICS SERVICE: src/server/services/activityService.ts
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import type {
  ActivitySummaryDto,
  LiveActivityEventDto,
  AdminDashboardSummaryDto,
} from '@/types/api';

export async function getActivitySummary(): Promise<ActivitySummaryDto> {
  const admin = getAdminClient();

  // Try reading from cache first
  const { data: cache } = await admin
    .from('activity_metrics_cache')
    .select('*')
    .eq('id', 'global_metrics')
    .single();

  if (cache) {
    return {
      publishedEventsCount: cache.published_events_count,
      liveEventsCount: cache.live_events_count,
      upcomingEventsCount: cache.upcoming_events_count,
      confirmedRegistrationsCount: cache.confirmed_registrations_count,
      activeVolunteersCount: cache.active_volunteers_count,
      activeCampaignsCount: cache.active_campaigns_count,
      totalCampaignParticipantsCount: cache.total_campaign_participants_count,
      lastUpdatedAt: cache.updated_at,
    };
  }

  // Fallback to direct calculation if cache row is not yet initialized
  const [
    { count: pubEvents },
    { count: liveEvents },
    { count: upcomingEvents },
    { count: confirmedRegs },
    { count: activeVols },
    { count: activeCampaigns },
    { count: totalParticipants },
  ] = await Promise.all([
    admin.from('events').select('*', { count: 'exact', head: true }).eq('publication_status', 'published'),
    admin.from('events').select('*', { count: 'exact', head: true }).eq('publication_status', 'published').eq('lifecycle_status', 'live'),
    admin.from('events').select('*', { count: 'exact', head: true }).eq('publication_status', 'published').eq('lifecycle_status', 'upcoming'),
    admin.from('event_registrations').select('*', { count: 'exact', head: true }).eq('registration_status', 'confirmed'),
    admin.from('volunteer_applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    admin.from('campaigns').select('*', { count: 'exact', head: true }).eq('publication_status', 'published').eq('campaign_status', 'active'),
    admin.from('campaign_participants').select('*', { count: 'exact', head: true }),
  ]);

  return {
    publishedEventsCount: pubEvents || 0,
    liveEventsCount: liveEvents || 0,
    upcomingEventsCount: upcomingEvents || 0,
    confirmedRegistrationsCount: confirmedRegs || 0,
    activeVolunteersCount: activeVols || 0,
    activeCampaignsCount: activeCampaigns || 0,
    totalCampaignParticipantsCount: totalParticipants || 0,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export async function getLiveActivity(): Promise<LiveActivityEventDto[]> {
  const admin = getAdminClient();

  // Combine latest event updates and announcements
  const [updatesRes, announcementsRes] = await Promise.all([
    admin
      .from('event_updates')
      .select('id, title_en, title_ml, published_at')
      .order('published_at', { ascending: false })
      .limit(5),
    admin
      .from('announcements')
      .select('id, title_en, title_ml, published_at')
      .eq('publication_status', 'published')
      .order('published_at', { ascending: false })
      .limit(5),
  ]);

  const activities: LiveActivityEventDto[] = [];

  (updatesRes.data || []).forEach((u) => {
    activities.push({
      type: 'event_update',
      id: u.id,
      titleEn: u.title_en,
      titleMl: u.title_ml,
      timestamp: u.published_at,
    });
  });

  (announcementsRes.data || []).forEach((a) => {
    activities.push({
      type: 'announcement',
      id: a.id,
      titleEn: a.title_en,
      titleMl: a.title_ml,
      timestamp: a.published_at,
    });
  });

  // Sort descending by timestamp
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return activities.slice(0, 10);
}

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummaryDto> {
  const admin = getAdminClient();

  const [metrics, recentRegsRes, recentAppsRes, recentLogsRes] = await Promise.all([
    getActivitySummary(),
    admin
      .from('event_registrations')
      .select(`
        *,
        events:event_id (title_en, title_ml)
      `)
      .order('created_at', { ascending: false })
      .limit(5),
    admin
      .from('volunteer_applications')
      .select(`
        *,
        volunteer_opportunities:opportunity_id (title_en, title_ml)
      `)
      .order('created_at', { ascending: false })
      .limit(5),
    admin
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  return {
    metrics,
    recentRegistrations: (recentRegsRes.data || []).map((row: any) => ({
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
    })),
    recentVolunteerApplications: (recentAppsRes.data || []).map((row: any) => ({
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
    })),
    recentAuditLogs: (recentLogsRes.data || []).map((log: any) => ({
      id: log.id,
      actorId: log.actor_id,
      actorRole: log.actor_role,
      action: log.action,
      resourceType: log.resource_type,
      resourceId: log.resource_id,
      ipAddress: log.ip_address,
      userAgent: log.user_agent,
      metadata: log.metadata,
      createdAt: log.created_at,
    })),
  };
}
