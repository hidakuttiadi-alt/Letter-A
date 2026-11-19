-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- MIGRATION: 20260101000002_functions_and_triggers.sql
-- Description: Concurrency-safe atomic registration, automatic metrics recalculation,
--              user profile provisioning, and admin bootstrap safeguards.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CONCURRENCY-SAFE ATOMIC EVENT REGISTRATION (Prevents Race Overbooking)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.register_for_event_atomic(
    p_event_id UUID,
    p_full_name TEXT,
    p_phone TEXT,
    p_email TEXT,
    p_institution TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_event RECORD;
    v_active_count INTEGER;
    v_ref TEXT;
    v_reg_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Acquire pessimistic lock on the event row to serialize concurrent registrations
    SELECT * INTO v_event
    FROM public.events
    WHERE id = p_event_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'EVENT_NOT_FOUND' USING ERRCODE = 'P0002';
    END IF;

    -- 2. Validate publication and lifecycle status
    IF v_event.publication_status != 'published' THEN
        RAISE EXCEPTION 'EVENT_NOT_PUBLISHED' USING ERRCODE = 'P0003';
    END IF;

    IF v_event.lifecycle_status NOT IN ('upcoming', 'live') THEN
        RAISE EXCEPTION 'EVENT_NOT_ACTIVE' USING ERRCODE = 'P0004';
    END IF;

    IF NOT v_event.registration_enabled THEN
        RAISE EXCEPTION 'REGISTRATION_DISABLED' USING ERRCODE = 'P0005';
    END IF;

    -- 3. Validate registration deadline
    IF v_event.registration_deadline IS NOT NULL AND NOW() > v_event.registration_deadline THEN
        RAISE EXCEPTION 'REGISTRATION_DEADLINE_PASSED' USING ERRCODE = 'P0006';
    END IF;

    -- 4. Check for duplicate registration by email (case-insensitive)
    IF EXISTS (
        SELECT 1 FROM public.event_registrations
        WHERE event_id = p_event_id
          AND LOWER(email) = LOWER(TRIM(p_email))
          AND registration_status IN ('confirmed', 'pending')
    ) THEN
        RAISE EXCEPTION 'ALREADY_REGISTERED' USING ERRCODE = '23505';
    END IF;

    -- 5. Strict concurrency-safe capacity check
    IF v_event.registration_capacity > 0 THEN
        SELECT COUNT(*) INTO v_active_count
        FROM public.event_registrations
        WHERE event_id = p_event_id
          AND registration_status IN ('confirmed', 'pending');

        IF v_active_count >= v_event.registration_capacity THEN
            RAISE EXCEPTION 'CAPACITY_REACHED' USING ERRCODE = 'P0007';
        END IF;
    END IF;

    -- 6. Generate collision-resistant human-readable reference ID
    v_ref := 'SAM-REG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 6));

    -- 7. Insert the confirmed registration
    INSERT INTO public.event_registrations (
        event_id,
        user_id,
        registration_reference,
        full_name,
        phone,
        email,
        institution,
        registration_status,
        notes
    ) VALUES (
        p_event_id,
        p_user_id,
        v_ref,
        TRIM(p_full_name),
        TRIM(p_phone),
        LOWER(TRIM(p_email)),
        NULLIF(TRIM(p_institution), ''),
        'confirmed',
        p_notes
    )
    RETURNING id INTO v_reg_id;

    -- 8. Build structured return object
    v_result := jsonb_build_object(
        'registration_id', v_reg_id,
        'registration_reference', v_ref,
        'event_id', p_event_id,
        'event_title_en', v_event.title_en,
        'event_title_ml', v_event.title_ml,
        'full_name', TRIM(p_full_name),
        'email', LOWER(TRIM(p_email)),
        'phone', TRIM(p_phone),
        'status', 'confirmed',
        'created_at', NOW()
    );

    RETURN v_result;
END;
$$;

-- Grant execution to authenticated and service_role (and anon if public registration allowed)
GRANT EXECUTE ON FUNCTION public.register_for_event_atomic(UUID, TEXT, TEXT, TEXT, TEXT, UUID, TEXT) TO anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 2. PROFILE & DEFAULT PARTICIPANT ROLE AUTO-CREATION ON AUTH SIGNUP
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Create profile row
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;

    -- Assign default participant role
    INSERT INTO public.user_roles (
        user_id,
        role
    ) VALUES (
        NEW.id,
        'participant'
    )
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$;

-- Create trigger on auth.users if not already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();
    END IF;
EXCEPTION
    WHEN insufficient_privilege THEN
        -- When running in restricted sandbox environments without direct auth trigger permissions,
        -- graceful bypass allows API service layer to provision profiles.
        RAISE NOTICE 'Skipping direct auth.users trigger due to restricted permissions.';
END;
$$;

-- ------------------------------------------------------------------------------
-- 3. ACTIVITY METRICS RECALCULATION
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.recalculate_activity_metrics()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_published_events INTEGER;
    v_live_events INTEGER;
    v_upcoming_events INTEGER;
    v_confirmed_regs INTEGER;
    v_active_volunteers INTEGER;
    v_active_campaigns INTEGER;
    v_total_participants INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_published_events
    FROM public.events
    WHERE publication_status = 'published';

    SELECT COUNT(*) INTO v_live_events
    FROM public.events
    WHERE publication_status = 'published' AND lifecycle_status = 'live';

    SELECT COUNT(*) INTO v_upcoming_events
    FROM public.events
    WHERE publication_status = 'published' AND lifecycle_status = 'upcoming';

    SELECT COUNT(*) INTO v_confirmed_regs
    FROM public.event_registrations
    WHERE registration_status = 'confirmed';

    SELECT COUNT(*) INTO v_active_volunteers
    FROM public.volunteer_applications
    WHERE status = 'approved';

    SELECT COUNT(*) INTO v_active_campaigns
    FROM public.campaigns
    WHERE publication_status = 'published' AND campaign_status = 'active';

    SELECT COUNT(*) INTO v_total_participants
    FROM public.campaign_participants;

    INSERT INTO public.activity_metrics_cache (
        id,
        published_events_count,
        live_events_count,
        upcoming_events_count,
        confirmed_registrations_count,
        active_volunteers_count,
        active_campaigns_count,
        total_campaign_participants_count,
        updated_at
    ) VALUES (
        'global_metrics',
        v_published_events,
        v_live_events,
        v_upcoming_events,
        v_confirmed_regs,
        v_active_volunteers,
        v_active_campaigns,
        v_total_participants,
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        published_events_count = EXCLUDED.published_events_count,
        live_events_count = EXCLUDED.live_events_count,
        upcoming_events_count = EXCLUDED.upcoming_events_count,
        confirmed_registrations_count = EXCLUDED.confirmed_registrations_count,
        active_volunteers_count = EXCLUDED.active_volunteers_count,
        active_campaigns_count = EXCLUDED.active_campaigns_count,
        total_campaign_participants_count = EXCLUDED.total_campaign_participants_count,
        updated_at = NOW();
END;
$$;

-- Trigger wrapper to automatically refresh metrics
CREATE OR REPLACE FUNCTION public.trigger_refresh_activity_metrics()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    PERFORM public.recalculate_activity_metrics();
    RETURN NULL;
END;
$$;

-- Attach triggers to relevant tables
CREATE OR REPLACE TRIGGER trg_events_metrics
    AFTER INSERT OR UPDATE OR DELETE ON public.events
    FOR EACH STATEMENT EXECUTE FUNCTION public.trigger_refresh_activity_metrics();

CREATE OR REPLACE TRIGGER trg_registrations_metrics
    AFTER INSERT OR UPDATE OR DELETE ON public.event_registrations
    FOR EACH STATEMENT EXECUTE FUNCTION public.trigger_refresh_activity_metrics();

CREATE OR REPLACE TRIGGER trg_volunteers_metrics
    AFTER INSERT OR UPDATE OR DELETE ON public.volunteer_applications
    FOR EACH STATEMENT EXECUTE FUNCTION public.trigger_refresh_activity_metrics();

CREATE OR REPLACE TRIGGER trg_campaigns_metrics
    AFTER INSERT OR UPDATE OR DELETE ON public.campaigns
    FOR EACH STATEMENT EXECUTE FUNCTION public.trigger_refresh_activity_metrics();

CREATE OR REPLACE TRIGGER trg_campaign_participants_metrics
    AFTER INSERT OR UPDATE OR DELETE ON public.campaign_participants
    FOR EACH STATEMENT EXECUTE FUNCTION public.trigger_refresh_activity_metrics();

-- ------------------------------------------------------------------------------
-- 4. BOOTSTRAP FIRST SUPER ADMIN (Secure First-Run Initializer)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.bootstrap_first_super_admin(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_existing_super_admin_count INTEGER;
BEGIN
    -- Ensure no super_admin exists yet (prevent takeover)
    SELECT COUNT(*) INTO v_existing_super_admin_count
    FROM public.user_roles
    WHERE role = 'super_admin';

    IF v_existing_super_admin_count > 0 THEN
        RAISE EXCEPTION 'SUPER_ADMIN_ALREADY_EXISTS: Cannot use bootstrap once an administrator exists.';
    END IF;

    -- Lookup user id from auth.users
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE LOWER(email) = LOWER(TRIM(p_email));

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'USER_NOT_FOUND: Target email % must sign up first.', p_email;
    END IF;

    -- Grant super_admin role
    INSERT INTO public.user_roles (user_id, role, assigned_by)
    VALUES (v_user_id, 'super_admin', v_user_id)
    ON CONFLICT (user_id, role) DO NOTHING;

    -- Log action in audit log
    INSERT INTO public.audit_logs (
        actor_id,
        actor_role,
        action,
        resource_type,
        resource_id,
        metadata
    ) VALUES (
        v_user_id,
        'super_admin',
        'BOOTSTRAP_SUPER_ADMIN',
        'user_roles',
        v_user_id::TEXT,
        jsonb_build_object('bootstrapped_email', p_email, 'timestamp', NOW())
    );

    RETURN TRUE;
END;
$$;
