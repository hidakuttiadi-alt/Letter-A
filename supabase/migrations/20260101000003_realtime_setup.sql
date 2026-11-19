-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- MIGRATION: 20260101000003_realtime_setup.sql
-- Description: Supabase Realtime publication setup with strict data privacy.
--              Only public-safe tables and aggregates are published publicly.
-- ==============================================================================

-- 1. Ensure the supabase_realtime publication exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END;
$$;

-- 2. Add public-safe tables to Realtime publication
-- These tables contain only public broadcast data (events, updates, announcements,
-- campaigns, and privacy-safe aggregate counters).
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_metrics_cache;

-- 3. Set replica identity to FULL for proper change capture payloads
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER TABLE public.event_updates REPLICA IDENTITY FULL;
ALTER TABLE public.announcements REPLICA IDENTITY FULL;
ALTER TABLE public.campaigns REPLICA IDENTITY FULL;
ALTER TABLE public.activity_metrics_cache REPLICA IDENTITY FULL;

-- NOTE ON PRIVATE REALTIME DATA:
-- Tables containing PII (event_registrations, volunteer_applications, donation_intents,
-- donation_transactions, audit_logs) are EXCLUDED from public publication.
-- Staff subscriptions to admin-level updates are streamed via authenticated Next.js
-- server-side channels or restricted private Supabase Realtime broadcast channels with
-- claims verification.
