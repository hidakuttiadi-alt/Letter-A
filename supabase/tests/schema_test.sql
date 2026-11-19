-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- DATABASE TESTS: supabase/tests/schema_test.sql
-- Description: pgTAP / SQL assertion test suite validating relational schema,
--              concurrency controls, capacity enforcement, and RLS integrity.
-- ==============================================================================

BEGIN;

-- 1. Test Tables Existence
DO $$
DECLARE
    v_table TEXT;
    v_expected_tables TEXT[] := ARRAY[
        'profiles', 'user_roles', 'event_categories', 'events',
        'event_updates', 'event_registrations', 'volunteer_opportunities',
        'volunteer_applications', 'volunteer_assignments', 'campaigns',
        'campaign_participants', 'donation_intents', 'donation_transactions',
        'announcements', 'historical_milestones', 'site_settings',
        'audit_logs', 'activity_metrics_cache'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_expected_tables LOOP
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = v_table
        ) THEN
            RAISE EXCEPTION 'TEST FAILED: Missing table public.%', v_table;
        END IF;
    END LOOP;
    RAISE NOTICE 'SUCCESS: All 18 required schema tables exist.';
END;
$$;

-- 2. Test Event Creation and Atomic Registration with Capacity
DO $$
DECLARE
    v_test_event_id UUID;
    v_reg_res JSONB;
    v_active_count INTEGER;
BEGIN
    -- Create test event with capacity of 1
    INSERT INTO public.events (
        slug, title_en, title_ml, description_en, description_ml,
        start_time, end_time, location_name_en, location_name_ml,
        registration_enabled, registration_capacity, publication_status, lifecycle_status
    ) VALUES (
        'test-capacity-event', 'Capacity Test Event', 'ടെസ്റ്റ് ഇവന്റ്', 'Desc EN', 'Desc ML',
        NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours', 'Test Hall', 'ടെസ്റ്റ് ഹാൾ',
        TRUE, 1, 'published', 'upcoming'
    ) RETURNING id INTO v_test_event_id;

    -- Register 1st participant (Should SUCCEED)
    v_reg_res := public.register_for_event_atomic(
        v_test_event_id,
        'Test User One',
        '+919876543210',
        'user1@example.com',
        'Samastha Academy'
    );

    IF v_reg_res->>'status' != 'confirmed' THEN
        RAISE EXCEPTION 'TEST FAILED: 1st registration was not confirmed. Got: %', v_reg_res;
    END IF;

    -- Register duplicate participant with same email (Should FAIL with ALREADY_REGISTERED)
    BEGIN
        PERFORM public.register_for_event_atomic(
            v_test_event_id,
            'Test User Duplicate',
            '+919876543210',
            'user1@example.com'
        );
        RAISE EXCEPTION 'TEST FAILED: Duplicate registration did not throw an error.';
    EXCEPTION
        WHEN OTHERS THEN
            IF SQLSTATE != '23505' AND SQLERRM NOT LIKE '%ALREADY_REGISTERED%' THEN
                RAISE EXCEPTION 'TEST FAILED: Unexpected error on duplicate registration: % %', SQLSTATE, SQLERRM;
            END IF;
            RAISE NOTICE 'SUCCESS: Duplicate registration properly blocked.';
    END;

    -- Register 2nd participant (Should FAIL with CAPACITY_REACHED because capacity = 1)
    BEGIN
        PERFORM public.register_for_event_atomic(
            v_test_event_id,
            'Test User Two',
            '+919876543211',
            'user2@example.com'
        );
        RAISE EXCEPTION 'TEST FAILED: Overbooking permitted beyond capacity 1.';
    EXCEPTION
        WHEN OTHERS THEN
            IF SQLSTATE != 'P0007' AND SQLERRM NOT LIKE '%CAPACITY_REACHED%' THEN
                RAISE EXCEPTION 'TEST FAILED: Unexpected error on capacity overflow: % %', SQLSTATE, SQLERRM;
            END IF;
            RAISE NOTICE 'SUCCESS: Overbooking blocked when event capacity reached.';
    END;

END;
$$;

-- 3. Test Activity Metrics Cache Recalculation
DO $$
DECLARE
    v_cache RECORD;
BEGIN
    SELECT * INTO v_cache FROM public.activity_metrics_cache WHERE id = 'global_metrics';
    IF v_cache IS NULL THEN
        RAISE EXCEPTION 'TEST FAILED: activity_metrics_cache is empty.';
    END IF;

    IF v_cache.confirmed_registrations_count < 1 THEN
        RAISE EXCEPTION 'TEST FAILED: confirmed_registrations_count did not refresh properly: %', v_cache.confirmed_registrations_count;
    END IF;

    RAISE NOTICE 'SUCCESS: activity_metrics_cache reflects confirmed registrations.';
END;
$$;

-- 4. Test RLS Activation Verification
DO $$
DECLARE
    v_table TEXT;
    v_rls_enabled BOOLEAN;
    v_tables_to_check TEXT[] := ARRAY[
        'profiles', 'user_roles', 'events', 'event_registrations',
        'volunteer_applications', 'donation_intents', 'donation_transactions'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_tables_to_check LOOP
        SELECT rowsecurity INTO v_rls_enabled
        FROM pg_tables
        WHERE schemaname = 'public' AND tablename = v_table;

        IF NOT v_rls_enabled THEN
            RAISE EXCEPTION 'TEST FAILED: RLS not enabled on public.%', v_table;
        END IF;
    END LOOP;
    RAISE NOTICE 'SUCCESS: RLS is active on all tested core tables.';
END;
$$;

ROLLBACK; -- Rollback test transaction so database remains clean
