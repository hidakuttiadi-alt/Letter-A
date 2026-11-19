// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// REALTIME SUBSCRIPTIONS SPECIFICATION: src/server/realtime/subscriptions.ts
// Description: Type-safe Realtime channel and event definitions for client consumers.
// ==============================================================================

import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { ActivitySummaryDto, EventDto, AnnouncementDto, EventUpdateDto } from '@/types/api';

export const RealtimeChannels = {
  PUBLIC_EVENTS: 'public:events',
  PUBLIC_EVENT_UPDATES: (eventId: string) => `public:event-updates:${eventId}`,
  PUBLIC_ANNOUNCEMENTS: 'public:announcements',
  PUBLIC_ACTIVITY_METRICS: 'public:activity-metrics',
  ADMIN_REGISTRATIONS: (eventId: string) => `admin:registrations:${eventId}`,
  ADMIN_VOLUNTEERS: 'admin:volunteers',
} as const;

export interface RealtimeSubscriptionHandlers {
  onEventChange?: (event: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: any; old: any }) => void;
  onEventUpdate?: (update: EventUpdateDto) => void;
  onAnnouncement?: (announcement: AnnouncementDto) => void;
  onMetricsUpdate?: (metrics: ActivitySummaryDto) => void;
  onError?: (err: Error) => void;
}

/**
 * Helper for Frontend Agent to subscribe to real-time activity metrics.
 */
export function subscribeToActivityMetrics(
  supabase: SupabaseClient<Database>,
  onUpdate: (metrics: any) => void
): RealtimeChannel {
  return supabase
    .channel(RealtimeChannels.PUBLIC_ACTIVITY_METRICS)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activity_metrics_cache',
        filter: 'id=eq.global_metrics',
      },
      (payload) => {
        onUpdate(payload.new);
      }
    )
    .subscribe();
}

/**
 * Helper for Frontend Agent to subscribe to public published announcements.
 */
export function subscribeToPublicAnnouncements(
  supabase: SupabaseClient<Database>,
  onAnnouncement: (announcement: any) => void
): RealtimeChannel {
  return supabase
    .channel(RealtimeChannels.PUBLIC_ANNOUNCEMENTS)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'announcements',
        filter: 'publication_status=eq.published',
      },
      (payload) => {
        onAnnouncement(payload.new);
      }
    )
    .subscribe();
}

/**
 * Helper for Frontend Agent to subscribe to live updates of an ongoing event.
 */
export function subscribeToEventLiveUpdates(
  supabase: SupabaseClient<Database>,
  eventId: string,
  onUpdate: (update: any) => void
): RealtimeChannel {
  return supabase
    .channel(RealtimeChannels.PUBLIC_EVENT_UPDATES(eventId))
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'event_updates',
        filter: `event_id=eq.${eventId}`,
      },
      (payload) => {
        onUpdate(payload.new);
      }
    )
    .subscribe();
}
