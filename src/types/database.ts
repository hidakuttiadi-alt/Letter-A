// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// DATABASE TYPES: src/types/database.ts
// Description: Strongly-typed PostgreSQL schema definitions for Supabase client.
// ==============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'event_manager'
  | 'volunteer_manager'
  | 'content_manager'
  | 'participant';

export type PublicationStatus = 'draft' | 'published' | 'archived';

export type EventLifecycleStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled' | 'rejected';

export type VolunteerOpportunityStatus = 'open' | 'closed' | 'paused';

export type VolunteerApplicationStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn';

export type VolunteerAssignmentStatus = 'assigned' | 'completed' | 'cancelled';

export type CampaignStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export type DonationStatus = 'initiated' | 'pending' | 'succeeded' | 'failed' | 'cancelled';

export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

export type MilestoneVerificationStatus = 'unverified' | 'verified' | 'disputed';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          full_name_ml: string | null;
          phone: string | null;
          email: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          full_name_ml?: string | null;
          phone?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          full_name_ml?: string | null;
          phone?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: UserRole;
          assigned_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: UserRole;
          assigned_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: UserRole;
          assigned_by?: string | null;
          created_at?: string;
        };
      };
      event_categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_ml: string;
          description_en: string | null;
          description_ml: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_ml: string;
          description_en?: string | null;
          description_ml?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          name_ml?: string;
          description_en?: string | null;
          description_ml?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          start_time: string;
          end_time: string;
          location_name_en: string;
          location_name_ml: string;
          location_address: string | null;
          location_map_url: string | null;
          category_id: string | null;
          banner_url: string | null;
          registration_enabled: boolean;
          registration_capacity: number;
          registration_deadline: string | null;
          publication_status: PublicationStatus;
          lifecycle_status: EventLifecycleStatus;
          is_featured: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          start_time: string;
          end_time: string;
          location_name_en: string;
          location_name_ml: string;
          location_address?: string | null;
          location_map_url?: string | null;
          category_id?: string | null;
          banner_url?: string | null;
          registration_enabled?: boolean;
          registration_capacity?: number;
          registration_deadline?: string | null;
          publication_status?: PublicationStatus;
          lifecycle_status?: EventLifecycleStatus;
          is_featured?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ml?: string;
          description_en?: string;
          description_ml?: string;
          start_time?: string;
          end_time?: string;
          location_name_en?: string;
          location_name_ml?: string;
          location_address?: string | null;
          location_map_url?: string | null;
          category_id?: string | null;
          banner_url?: string | null;
          registration_enabled?: boolean;
          registration_capacity?: number;
          registration_deadline?: string | null;
          publication_status?: PublicationStatus;
          lifecycle_status?: EventLifecycleStatus;
          is_featured?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_updates: {
        Row: {
          id: string;
          event_id: string;
          title_en: string;
          title_ml: string;
          content_en: string;
          content_ml: string;
          published_at: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          title_en: string;
          title_ml: string;
          content_en: string;
          content_ml: string;
          published_at?: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          title_en?: string;
          title_ml?: string;
          content_en?: string;
          content_ml?: string;
          published_at?: string;
          created_by?: string | null;
          created_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string | null;
          registration_reference: string;
          full_name: string;
          phone: string;
          email: string;
          institution: string | null;
          registration_status: RegistrationStatus;
          notes: string | null;
          cancelled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id?: string | null;
          registration_reference: string;
          full_name: string;
          phone: string;
          email: string;
          institution?: string | null;
          registration_status?: RegistrationStatus;
          notes?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string | null;
          registration_reference?: string;
          full_name?: string;
          phone?: string;
          email?: string;
          institution?: string | null;
          registration_status?: RegistrationStatus;
          notes?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_opportunities: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          category: string;
          location: string;
          skills_needed: string[];
          capacity: number;
          status: VolunteerOpportunityStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          category: string;
          location: string;
          skills_needed?: string[];
          capacity?: number;
          status?: VolunteerOpportunityStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ml?: string;
          description_en?: string;
          description_ml?: string;
          category?: string;
          location?: string;
          skills_needed?: string[];
          capacity?: number;
          status?: VolunteerOpportunityStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_applications: {
        Row: {
          id: string;
          opportunity_id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          age: number | null;
          occupation: string | null;
          institution: string | null;
          qualifications: string | null;
          skills: string[];
          availability: string;
          status: VolunteerApplicationStatus;
          reviewer_id: string | null;
          review_notes: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          opportunity_id: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone: string;
          age?: number | null;
          occupation?: string | null;
          institution?: string | null;
          qualifications?: string | null;
          skills?: string[];
          availability: string;
          status?: VolunteerApplicationStatus;
          reviewer_id?: string | null;
          review_notes?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          opportunity_id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          age?: number | null;
          occupation?: string | null;
          institution?: string | null;
          qualifications?: string | null;
          skills?: string[];
          availability?: string;
          status?: VolunteerApplicationStatus;
          reviewer_id?: string | null;
          review_notes?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_assignments: {
        Row: {
          id: string;
          application_id: string;
          event_id: string | null;
          role_name: string;
          shift_start: string;
          shift_end: string;
          status: VolunteerAssignmentStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          event_id?: string | null;
          role_name: string;
          shift_start: string;
          shift_end: string;
          status?: VolunteerAssignmentStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          application_id?: string;
          event_id?: string | null;
          role_name?: string;
          shift_start?: string;
          shift_end?: string;
          status?: VolunteerAssignmentStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      campaigns: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          banner_url: string | null;
          start_time: string;
          end_time: string;
          participation_target: number;
          publication_status: PublicationStatus;
          campaign_status: CampaignStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          banner_url?: string | null;
          start_time: string;
          end_time: string;
          participation_target?: number;
          publication_status?: PublicationStatus;
          campaign_status?: CampaignStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ml?: string;
          description_en?: string;
          description_ml?: string;
          banner_url?: string | null;
          start_time?: string;
          end_time?: string;
          participation_target?: number;
          publication_status?: PublicationStatus;
          campaign_status?: CampaignStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      campaign_participants: {
        Row: {
          id: string;
          campaign_id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          district: string | null;
          pledge_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          district?: string | null;
          pledge_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          campaign_id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string | null;
          district?: string | null;
          pledge_text?: string | null;
          created_at?: string;
        };
      };
      donation_intents: {
        Row: {
          id: string;
          reference_id: string;
          amount: number;
          currency: string;
          cause: string;
          donor_name: string;
          donor_email: string;
          donor_phone: string | null;
          is_anonymous: boolean;
          status: DonationStatus;
          is_demo: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_id: string;
          amount: number;
          currency?: string;
          cause?: string;
          donor_name: string;
          donor_email: string;
          donor_phone?: string | null;
          is_anonymous?: boolean;
          status?: DonationStatus;
          is_demo?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_id?: string;
          amount?: number;
          currency?: string;
          cause?: string;
          donor_name?: string;
          donor_email?: string;
          donor_phone?: string | null;
          is_anonymous?: boolean;
          status?: DonationStatus;
          is_demo?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      donation_transactions: {
        Row: {
          id: string;
          intent_id: string;
          transaction_reference: string;
          payment_provider: string;
          payment_method: string;
          amount: number;
          currency: string;
          status: DonationStatus;
          provider_payload: Json;
          verified_at: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          intent_id: string;
          transaction_reference: string;
          payment_provider?: string;
          payment_method?: string;
          amount: number;
          currency?: string;
          status?: DonationStatus;
          provider_payload?: Json;
          verified_at?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          intent_id?: string;
          transaction_reference?: string;
          payment_provider?: string;
          payment_method?: string;
          amount?: number;
          currency?: string;
          status?: DonationStatus;
          provider_payload?: Json;
          verified_at?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title_en: string;
          title_ml: string;
          content_en: string;
          content_ml: string;
          priority: AnnouncementPriority;
          publication_status: PublicationStatus;
          published_at: string;
          event_id: string | null;
          campaign_id: string | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_ml: string;
          content_en: string;
          content_ml: string;
          priority?: AnnouncementPriority;
          publication_status?: PublicationStatus;
          published_at?: string;
          event_id?: string | null;
          campaign_id?: string | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_ml?: string;
          content_en?: string;
          content_ml?: string;
          priority?: AnnouncementPriority;
          publication_status?: PublicationStatus;
          published_at?: string;
          event_id?: string | null;
          campaign_id?: string | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      historical_milestones: {
        Row: {
          id: string;
          milestone_year: string;
          milestone_date: string | null;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          media_url: string | null;
          media_caption_en: string | null;
          media_caption_ml: string | null;
          source_references: string | null;
          verification_status: MilestoneVerificationStatus;
          publication_status: PublicationStatus;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          milestone_year: string;
          milestone_date?: string | null;
          title_en: string;
          title_ml: string;
          description_en: string;
          description_ml: string;
          media_url?: string | null;
          media_caption_en?: string | null;
          media_caption_ml?: string | null;
          source_references?: string | null;
          verification_status?: MilestoneVerificationStatus;
          publication_status?: PublicationStatus;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          milestone_year?: string;
          milestone_date?: string | null;
          title_en?: string;
          title_ml?: string;
          description_en?: string;
          description_ml?: string;
          media_url?: string | null;
          media_caption_en?: string | null;
          media_caption_ml?: string | null;
          source_references?: string | null;
          verification_status?: MilestoneVerificationStatus;
          publication_status?: PublicationStatus;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          actor_role: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          actor_role?: string | null;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          actor_role?: string | null;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: Json;
          created_at?: string;
        };
      };
      activity_metrics_cache: {
        Row: {
          id: string;
          published_events_count: number;
          live_events_count: number;
          upcoming_events_count: number;
          confirmed_registrations_count: number;
          active_volunteers_count: number;
          active_campaigns_count: number;
          total_campaign_participants_count: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          published_events_count?: number;
          live_events_count?: number;
          upcoming_events_count?: number;
          confirmed_registrations_count?: number;
          active_volunteers_count?: number;
          active_campaigns_count?: number;
          total_campaign_participants_count?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          published_events_count?: number;
          live_events_count?: number;
          upcoming_events_count?: number;
          confirmed_registrations_count?: number;
          active_volunteers_count?: number;
          active_campaigns_count?: number;
          total_campaign_participants_count?: number;
          updated_at?: string;
        };
      };
    };
    Functions: {
      has_role: {
        Args: { check_user_id: string; check_role: string };
        Returns: boolean;
      };
      is_admin_or_higher: {
        Args: { check_user_id: string };
        Returns: boolean;
      };
      is_staff: {
        Args: { check_user_id: string };
        Returns: boolean;
      };
      register_for_event_atomic: {
        Args: {
          p_event_id: string;
          p_full_name: string;
          p_phone: string;
          p_email: string;
          p_institution?: string | null;
          p_user_id?: string | null;
          p_notes?: string | null;
        };
        Returns: Json;
      };
      recalculate_activity_metrics: {
        Args: Record<string, never>;
        Returns: void;
      };
      bootstrap_first_super_admin: {
        Args: { p_email: string };
        Returns: boolean;
      };
    };
  };
}
