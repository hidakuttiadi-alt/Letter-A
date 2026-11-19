-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- MIGRATION: 20260101000001_rls_policies.sql
-- Description: Comprehensive Row Level Security (RLS) policies enforcing
--              least-privilege access across all application tables.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENABLE ROW LEVEL SECURITY ACROSS ALL APPLICATION TABLES
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historical_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_metrics_cache ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. POLICIES: PROFILES
-- ------------------------------------------------------------------------------

-- Public profile reading is denied; users see own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Staff can view all profiles
CREATE POLICY "Staff can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.is_staff(auth.uid()));

-- Users can update own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- ------------------------------------------------------------------------------
-- 3. POLICIES: USER ROLES (Privilege Escalation Prevention)
-- ------------------------------------------------------------------------------

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Staff can view all user roles
CREATE POLICY "Staff can view all user roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()));

-- Only super admins can insert/update/delete roles
CREATE POLICY "Super admins can manage roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin'))
    WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- ------------------------------------------------------------------------------
-- 4. POLICIES: EVENT CATEGORIES
-- ------------------------------------------------------------------------------

-- Public can read all categories
CREATE POLICY "Public can view event categories"
    ON public.event_categories
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Event managers and admins can manage categories
CREATE POLICY "Event staff can manage event categories"
    ON public.event_categories
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 5. POLICIES: EVENTS
-- ------------------------------------------------------------------------------

-- Public can only view published events
CREATE POLICY "Public can view published events"
    ON public.events
    FOR SELECT
    TO anon, authenticated
    USING (publication_status = 'published');

-- Staff can view all events (drafts, archived, etc.)
CREATE POLICY "Staff can view all events"
    ON public.events
    FOR SELECT
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Event staff can insert events
CREATE POLICY "Staff can insert events"
    ON public.events
    FOR INSERT
    TO authenticated
    WITH CHECK (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Event staff can update events
CREATE POLICY "Staff can update events"
    ON public.events
    FOR UPDATE
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Admins can delete events
CREATE POLICY "Admins can delete events"
    ON public.events
    FOR DELETE
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()));

-- ------------------------------------------------------------------------------
-- 6. POLICIES: EVENT UPDATES
-- ------------------------------------------------------------------------------

-- Public can view updates for published events
CREATE POLICY "Public can view published event updates"
    ON public.event_updates
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_updates.event_id
              AND events.publication_status = 'published'
        )
    );

-- Staff can manage event updates
CREATE POLICY "Staff can manage event updates"
    ON public.event_updates
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 7. POLICIES: EVENT REGISTRATIONS
-- ------------------------------------------------------------------------------

-- Authenticated users can view their own registrations
CREATE POLICY "Users can view own registrations"
    ON public.event_registrations
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Event managers and admins can view all registrations
CREATE POLICY "Staff can view all registrations"
    ON public.event_registrations
    FOR SELECT
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Authenticated users can insert their own registration
CREATE POLICY "Users can insert own registration"
    ON public.event_registrations
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = auth.uid() OR
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Users can cancel their own registration
CREATE POLICY "Users can cancel own registration"
    ON public.event_registrations
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Staff can update/manage all registrations
CREATE POLICY "Staff can manage all registrations"
    ON public.event_registrations
    FOR UPDATE
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'event_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 8. POLICIES: VOLUNTEER OPPORTUNITIES
-- ------------------------------------------------------------------------------

-- Public can view open and paused opportunities
CREATE POLICY "Public can view open volunteer opportunities"
    ON public.volunteer_opportunities
    FOR SELECT
    TO anon, authenticated
    USING (status IN ('open', 'paused'));

-- Volunteer managers and admins can view all
CREATE POLICY "Staff can view all volunteer opportunities"
    ON public.volunteer_opportunities
    FOR SELECT
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Staff can manage opportunities
CREATE POLICY "Staff can manage volunteer opportunities"
    ON public.volunteer_opportunities
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 9. POLICIES: VOLUNTEER APPLICATIONS & ASSIGNMENTS
-- ------------------------------------------------------------------------------

-- Users can view own applications
CREATE POLICY "Users can view own volunteer applications"
    ON public.volunteer_applications
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Staff can view all volunteer applications
CREATE POLICY "Staff can view all volunteer applications"
    ON public.volunteer_applications
    FOR SELECT
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Authenticated users can submit own application
CREATE POLICY "Users can submit volunteer application"
    ON public.volunteer_applications
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can withdraw own application
CREATE POLICY "Users can withdraw own volunteer application"
    ON public.volunteer_applications
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Staff can manage all volunteer applications
CREATE POLICY "Staff can manage volunteer applications"
    ON public.volunteer_applications
    FOR UPDATE
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Assignments: users can view own assignments
CREATE POLICY "Users can view own volunteer assignments"
    ON public.volunteer_assignments
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.volunteer_applications va
            WHERE va.id = volunteer_assignments.application_id
              AND va.user_id = auth.uid()
        )
    );

-- Staff can manage assignments
CREATE POLICY "Staff can manage volunteer assignments"
    ON public.volunteer_assignments
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'volunteer_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 10. POLICIES: CAMPAIGNS & PARTICIPATION
-- ------------------------------------------------------------------------------

-- Public can view published campaigns
CREATE POLICY "Public can view published campaigns"
    ON public.campaigns
    FOR SELECT
    TO anon, authenticated
    USING (publication_status = 'published');

-- Staff can view all campaigns
CREATE POLICY "Staff can view all campaigns"
    ON public.campaigns
    FOR SELECT
    TO authenticated
    USING (public.is_staff(auth.uid()));

-- Staff can manage campaigns
CREATE POLICY "Staff can manage campaigns"
    ON public.campaigns
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- Campaign participants: users can view own participation
CREATE POLICY "Users can view own campaign participation"
    ON public.campaign_participants
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Staff can view all campaign participants
CREATE POLICY "Staff can view all campaign participants"
    ON public.campaign_participants
    FOR SELECT
    TO authenticated
    USING (public.is_staff(auth.uid()));

-- Users can join campaign
CREATE POLICY "Users can join campaign"
    ON public.campaign_participants
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 11. POLICIES: DONATIONS (STRICT PRIVACY - NO PUBLIC ACCESS)
-- ------------------------------------------------------------------------------

-- Donors cannot publicly read table directly (prevent harvesting)
-- Financial staff can read intents
CREATE POLICY "Staff can view donation intents"
    ON public.donation_intents
    FOR SELECT
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()));

-- Financial staff can view transactions
CREATE POLICY "Staff can view donation transactions"
    ON public.donation_transactions
    FOR SELECT
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()));

-- Only admins can manage donations
CREATE POLICY "Admins can manage donation intents"
    ON public.donation_intents
    FOR ALL
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()))
    WITH CHECK (public.is_admin_or_higher(auth.uid()));

CREATE POLICY "Admins can manage donation transactions"
    ON public.donation_transactions
    FOR ALL
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()))
    WITH CHECK (public.is_admin_or_higher(auth.uid()));

-- ------------------------------------------------------------------------------
-- 12. POLICIES: ANNOUNCEMENTS
-- ------------------------------------------------------------------------------

-- Public can view published announcements
CREATE POLICY "Public can view published announcements"
    ON public.announcements
    FOR SELECT
    TO anon, authenticated
    USING (publication_status = 'published');

-- Staff can view all announcements
CREATE POLICY "Staff can view all announcements"
    ON public.announcements
    FOR SELECT
    TO authenticated
    USING (public.is_staff(auth.uid()));

-- Content staff can manage announcements
CREATE POLICY "Staff can manage announcements"
    ON public.announcements
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 13. POLICIES: HISTORICAL MILESTONES (1926 - 2026)
-- ------------------------------------------------------------------------------

-- Public can view verified published milestones
CREATE POLICY "Public can view verified published milestones"
    ON public.historical_milestones
    FOR SELECT
    TO anon, authenticated
    USING (publication_status = 'published' AND verification_status = 'verified');

-- Staff can view all milestones
CREATE POLICY "Staff can view all historical milestones"
    ON public.historical_milestones
    FOR SELECT
    TO authenticated
    USING (public.is_staff(auth.uid()));

-- Content staff can manage milestones
CREATE POLICY "Staff can manage historical milestones"
    ON public.historical_milestones
    FOR ALL
    TO authenticated
    USING (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    )
    WITH CHECK (
        public.has_role(auth.uid(), 'content_manager') OR
        public.is_admin_or_higher(auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 14. POLICIES: SITE SETTINGS & AUDIT LOGS
-- ------------------------------------------------------------------------------

-- Public can view non-sensitive site settings
CREATE POLICY "Public can view site settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Admins can update site settings
CREATE POLICY "Admins can update site settings"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()))
    WITH CHECK (public.is_admin_or_higher(auth.uid()));

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (public.is_admin_or_higher(auth.uid()));

-- System/service role logs entries (immutable: no update or delete policies created)

-- ------------------------------------------------------------------------------
-- 15. POLICIES: ACTIVITY METRICS CACHE (Public Projection)
-- ------------------------------------------------------------------------------

-- Public can view aggregate activity metrics
CREATE POLICY "Public can view activity metrics cache"
    ON public.activity_metrics_cache
    FOR SELECT
    TO anon, authenticated
    USING (true);
