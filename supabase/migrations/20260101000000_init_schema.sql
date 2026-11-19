-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- MIGRATION: 20260101000000_init_schema.sql
-- Description: Core relational schema, enum-like check constraints, indexes,
--              and audit structures.
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. UTILITY TRIGGER: updated_at auto-timestamp
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. USER PROFILES & ROLE-BASED ACCESS CONTROL
-- ------------------------------------------------------------------------------

-- App profiles linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    full_name_ml TEXT,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- User roles table (normalized RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN (
        'super_admin',
        'admin',
        'event_manager',
        'volunteer_manager',
        'content_manager',
        'participant'
    )),
    assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_roles_user_role UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Helper functions for RBAC
CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, check_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id AND role = check_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_or_higher(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id AND role IN ('super_admin', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_staff(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id AND role IN (
            'super_admin', 'admin', 'event_manager', 'volunteer_manager', 'content_manager'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ------------------------------------------------------------------------------
-- 3. EVENT CATEGORIES & EVENTS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.event_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name_en TEXT NOT NULL,
    name_ml TEXT NOT NULL,
    description_en TEXT,
    description_ml TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_categories_display ON public.event_categories(display_order);

CREATE TRIGGER update_event_categories_modtime
    BEFORE UPDATE ON public.event_categories
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ml TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    location_name_en TEXT NOT NULL,
    location_name_ml TEXT NOT NULL,
    location_address TEXT,
    location_map_url TEXT,
    category_id UUID REFERENCES public.event_categories(id) ON DELETE SET NULL,
    banner_url TEXT,
    registration_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    registration_capacity INTEGER NOT NULL DEFAULT 0 CHECK (registration_capacity >= 0),
    registration_deadline TIMESTAMPTZ,
    publication_status TEXT NOT NULL DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
    lifecycle_status TEXT NOT NULL DEFAULT 'upcoming' CHECK (lifecycle_status IN ('upcoming', 'live', 'completed', 'cancelled')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_event_time_order CHECK (end_time >= start_time)
);

CREATE INDEX IF NOT EXISTS idx_events_publication_status ON public.events(publication_status);
CREATE INDEX IF NOT EXISTS idx_events_lifecycle_status ON public.events(lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(is_featured);

CREATE TRIGGER update_events_modtime
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- Event live updates / announcements
CREATE TABLE IF NOT EXISTS public.event_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ml TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_updates_event_id ON public.event_updates(event_id, published_at DESC);

-- ------------------------------------------------------------------------------
-- 4. CONCURRENCY-SAFE EVENT REGISTRATIONS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    registration_reference TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    institution TEXT,
    registration_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (registration_status IN ('pending', 'confirmed', 'cancelled', 'rejected')),
    notes TEXT,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_status ON public.event_registrations(event_id, registration_status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON public.event_registrations(email);
CREATE INDEX IF NOT EXISTS idx_event_registrations_ref ON public.event_registrations(registration_reference);

-- Unique index preventing duplicate active registrations for the same event by email
CREATE UNIQUE INDEX IF NOT EXISTS uq_event_active_registration_email
    ON public.event_registrations(event_id, LOWER(email))
    WHERE registration_status IN ('pending', 'confirmed');

CREATE TRIGGER update_event_registrations_modtime
    BEFORE UPDATE ON public.event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 5. VOLUNTEER MANAGEMENT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.volunteer_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ml TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    skills_needed TEXT[] NOT NULL DEFAULT '{}',
    capacity INTEGER NOT NULL DEFAULT 0 CHECK (capacity >= 0),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'paused')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_volunteer_opps_status ON public.volunteer_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_opps_category ON public.volunteer_opportunities(category);

CREATE TRIGGER update_volunteer_opps_modtime
    BEFORE UPDATE ON public.volunteer_opportunities
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE IF NOT EXISTS public.volunteer_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.volunteer_opportunities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER CHECK (age >= 13 AND age <= 120),
    occupation TEXT,
    institution TEXT,
    qualifications TEXT,
    skills TEXT[] NOT NULL DEFAULT '{}',
    availability TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
    reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_vol_app_opportunity_email UNIQUE (opportunity_id, email)
);

CREATE INDEX IF NOT EXISTS idx_vol_app_status ON public.volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_vol_app_user_id ON public.volunteer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_vol_app_opp ON public.volunteer_applications(opportunity_id);

CREATE TRIGGER update_volunteer_apps_modtime
    BEFORE UPDATE ON public.volunteer_applications
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE IF NOT EXISTS public.volunteer_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.volunteer_applications(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    role_name TEXT NOT NULL,
    shift_start TIMESTAMPTZ NOT NULL,
    shift_end TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_shift_time_order CHECK (shift_end >= shift_start)
);

CREATE INDEX IF NOT EXISTS idx_vol_assign_app ON public.volunteer_assignments(application_id);
CREATE INDEX IF NOT EXISTS idx_vol_assign_event ON public.volunteer_assignments(event_id);

CREATE TRIGGER update_volunteer_assignments_modtime
    BEFORE UPDATE ON public.volunteer_assignments
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 6. CENTENARY CAMPAIGNS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ml TEXT NOT NULL,
    banner_url TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    participation_target INTEGER NOT NULL DEFAULT 1000 CHECK (participation_target >= 0),
    publication_status TEXT NOT NULL DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
    campaign_status TEXT NOT NULL DEFAULT 'upcoming' CHECK (campaign_status IN ('upcoming', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_campaign_time_order CHECK (end_time >= start_time)
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(campaign_status);
CREATE INDEX IF NOT EXISTS idx_campaigns_pub_status ON public.campaigns(publication_status);

CREATE TRIGGER update_campaigns_modtime
    BEFORE UPDATE ON public.campaigns
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE IF NOT EXISTS public.campaign_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    district TEXT,
    pledge_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_campaign_participant_email UNIQUE (campaign_id, email)
);

CREATE INDEX IF NOT EXISTS idx_campaign_participants_campaign ON public.campaign_participants(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_participants_user ON public.campaign_participants(user_id);

-- ------------------------------------------------------------------------------
-- 7. DONATIONS ARCHITECTURE (DEMO MODE READY)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.donation_intents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    cause TEXT NOT NULL DEFAULT 'Centenary General Fund',
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'pending', 'succeeded', 'failed', 'cancelled')),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donation_intents_ref ON public.donation_intents(reference_id);
CREATE INDEX IF NOT EXISTS idx_donation_intents_status ON public.donation_intents(status);
CREATE INDEX IF NOT EXISTS idx_donation_intents_is_demo ON public.donation_intents(is_demo);

CREATE TRIGGER update_donation_intents_modtime
    BEFORE UPDATE ON public.donation_intents
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE IF NOT EXISTS public.donation_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intent_id UUID NOT NULL REFERENCES public.donation_intents(id) ON DELETE CASCADE,
    transaction_reference TEXT NOT NULL UNIQUE,
    payment_provider TEXT NOT NULL DEFAULT 'DEMO_SIMULATOR',
    payment_method TEXT NOT NULL DEFAULT 'DEMO_UPI',
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'pending', 'succeeded', 'failed', 'cancelled')),
    provider_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    verified_at TIMESTAMPTZ,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donation_tx_intent_id ON public.donation_transactions(intent_id);
CREATE INDEX IF NOT EXISTS idx_donation_tx_ref ON public.donation_transactions(transaction_reference);
CREATE INDEX IF NOT EXISTS idx_donation_tx_status ON public.donation_transactions(status);

CREATE TRIGGER update_donation_tx_modtime
    BEFORE UPDATE ON public.donation_transactions
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 8. ANNOUNCEMENTS & NEWS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ml TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    publication_status TEXT NOT NULL DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_pub_status ON public.announcements(publication_status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON public.announcements(priority);

CREATE TRIGGER update_announcements_modtime
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 9. HISTORICAL TIMELINE (1926 - 2026)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.historical_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_year TEXT NOT NULL,
    milestone_date DATE,
    title_en TEXT NOT NULL,
    title_ml TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ml TEXT NOT NULL,
    media_url TEXT,
    media_caption_en TEXT,
    media_caption_ml TEXT,
    source_references TEXT,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('unverified', 'verified', 'disputed')),
    publication_status TEXT NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived')),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_milestones_year ON public.historical_milestones(milestone_year);
CREATE INDEX IF NOT EXISTS idx_milestones_display ON public.historical_milestones(display_order);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON public.historical_milestones(publication_status, verification_status);

CREATE TRIGGER update_historical_milestones_modtime
    BEFORE UPDATE ON public.historical_milestones
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 10. SYSTEM SETTINGS & AUDIT LOGS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_role TEXT,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON public.audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 11. PRIVACY-SAFE ACTIVITY AGGREGATES CACHE
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.activity_metrics_cache (
    id TEXT PRIMARY KEY DEFAULT 'global_metrics',
    published_events_count INTEGER NOT NULL DEFAULT 0,
    live_events_count INTEGER NOT NULL DEFAULT 0,
    upcoming_events_count INTEGER NOT NULL DEFAULT 0,
    confirmed_registrations_count INTEGER NOT NULL DEFAULT 0,
    active_volunteers_count INTEGER NOT NULL DEFAULT 0,
    active_campaigns_count INTEGER NOT NULL DEFAULT 0,
    total_campaign_participants_count INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert single default record
INSERT INTO public.activity_metrics_cache (id)
VALUES ('global_metrics')
ON CONFLICT (id) DO NOTHING;
