// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// API CONTRACT TYPES: src/types/api.ts
// Description: Standardized request/response interfaces, pagination, and DTOs.
// ==============================================================================

import type {
  UserRole,
  PublicationStatus,
  EventLifecycleStatus,
  RegistrationStatus,
  VolunteerOpportunityStatus,
  VolunteerApplicationStatus,
  VolunteerAssignmentStatus,
  CampaignStatus,
  DonationStatus,
  AnnouncementPriority,
  MilestoneVerificationStatus
} from './database';

// ------------------------------------------------------------------------------
// Standard API Envelope
// ------------------------------------------------------------------------------

export interface ApiPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: null;
  meta?: ApiPaginationMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ------------------------------------------------------------------------------
// User & Auth DTOs
// ------------------------------------------------------------------------------

export interface UserProfileDto {
  id: string;
  fullName: string;
  fullNameMl: string | null;
  phone: string | null;
  email: string | null;
  avatarUrl: string | null;
  roles: UserRole[];
  createdAt: string;
}

// ------------------------------------------------------------------------------
// Event DTOs
// ------------------------------------------------------------------------------

export interface EventCategoryDto {
  id: string;
  slug: string;
  nameEn: string;
  nameMl: string;
  descriptionEn: string | null;
  descriptionMl: string | null;
  displayOrder: number;
}

export interface EventDto {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  descriptionEn: string;
  descriptionMl: string;
  startTime: string;
  endTime: string;
  locationNameEn: string;
  locationNameMl: string;
  locationAddress: string | null;
  locationMapUrl: string | null;
  category: EventCategoryDto | null;
  bannerUrl: string | null;
  registrationEnabled: boolean;
  registrationCapacity: number;
  registeredCount?: number;
  remainingCapacity?: number | null;
  registrationDeadline: string | null;
  publicationStatus: PublicationStatus;
  lifecycleStatus: EventLifecycleStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventUpdateDto {
  id: string;
  eventId: string;
  titleEn: string;
  titleMl: string;
  contentEn: string;
  contentMl: string;
  publishedAt: string;
}

// ------------------------------------------------------------------------------
// Registration DTOs
// ------------------------------------------------------------------------------

export interface EventRegistrationDto {
  id: string;
  eventId: string;
  eventTitleEn?: string;
  eventTitleMl?: string;
  registrationReference: string;
  fullName: string;
  phone: string;
  email: string;
  institution: string | null;
  registrationStatus: RegistrationStatus;
  notes: string | null;
  createdAt: string;
  cancelledAt: string | null;
}

export interface CreateRegistrationRequest {
  eventId: string;
  fullName: string;
  phone: string;
  email: string;
  institution?: string;
  notes?: string;
}

export interface RegistrationConfirmationDto {
  registrationId: string;
  registrationReference: string;
  eventId: string;
  eventTitleEn: string;
  eventTitleMl: string;
  fullName: string;
  email: string;
  phone: string;
  status: RegistrationStatus;
  createdAt: string;
}

// ------------------------------------------------------------------------------
// Volunteer DTOs
// ------------------------------------------------------------------------------

export interface VolunteerOpportunityDto {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  descriptionEn: string;
  descriptionMl: string;
  category: string;
  location: string;
  skillsNeeded: string[];
  capacity: number;
  status: VolunteerOpportunityStatus;
  createdAt: string;
}

export interface VolunteerApplicationDto {
  id: string;
  opportunityId: string;
  opportunityTitleEn?: string;
  opportunityTitleMl?: string;
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  occupation: string | null;
  institution: string | null;
  qualifications: string | null;
  skills: string[];
  availability: string;
  status: VolunteerApplicationStatus;
  reviewerNotes?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
}

export interface CreateVolunteerApplicationRequest {
  opportunityId: string;
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  occupation?: string;
  institution?: string;
  qualifications?: string;
  skills?: string[];
  availability: string;
}

// ------------------------------------------------------------------------------
// Campaign DTOs
// ------------------------------------------------------------------------------

export interface CampaignDto {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  descriptionEn: string;
  descriptionMl: string;
  bannerUrl: string | null;
  startTime: string;
  endTime: string;
  participationTarget: number;
  currentParticipantsCount: number;
  publicationStatus: PublicationStatus;
  campaignStatus: CampaignStatus;
  createdAt: string;
}

export interface CampaignParticipantDto {
  id: string;
  campaignId: string;
  campaignTitleEn?: string;
  campaignTitleMl?: string;
  fullName: string;
  district: string | null;
  pledgeText: string | null;
  createdAt: string;
}

export interface JoinCampaignRequest {
  fullName: string;
  email: string;
  phone?: string;
  district?: string;
  pledgeText?: string;
}

// ------------------------------------------------------------------------------
// Donation DTOs (DEMO MODE READY)
// ------------------------------------------------------------------------------

export interface DonationIntentDto {
  id: string;
  referenceId: string;
  amount: number;
  currency: string;
  cause: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string | null;
  isAnonymous: boolean;
  status: DonationStatus;
  isDemo: boolean;
  createdAt: string;
}

export interface CreateDonationIntentRequest {
  amount: number;
  currency?: string;
  cause?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  isAnonymous?: boolean;
}

export interface CompleteDemoDonationRequest {
  referenceId: string;
  paymentMethod?: string;
  simulateFailure?: boolean;
}

export interface DonationReceiptDto {
  receiptId: string;
  transactionReference: string;
  referenceId: string;
  amount: number;
  currency: string;
  cause: string;
  donorName: string;
  status: DonationStatus;
  isDemo: boolean;
  paymentMethod: string;
  verifiedAt: string;
}

// ------------------------------------------------------------------------------
// Announcement DTOs
// ------------------------------------------------------------------------------

export interface AnnouncementDto {
  id: string;
  titleEn: string;
  titleMl: string;
  contentEn: string;
  contentMl: string;
  priority: AnnouncementPriority;
  publicationStatus: PublicationStatus;
  publishedAt: string;
  eventId: string | null;
  campaignId: string | null;
  createdAt: string;
}

// ------------------------------------------------------------------------------
// Historical Milestone DTOs (1926-2026)
// ------------------------------------------------------------------------------

export interface HistoricalMilestoneDto {
  id: string;
  milestoneYear: string;
  milestoneDate: string | null;
  titleEn: string;
  titleMl: string;
  descriptionEn: string;
  descriptionMl: string;
  mediaUrl: string | null;
  mediaCaptionEn: string | null;
  mediaCaptionMl: string | null;
  sourceReferences: string | null;
  verificationStatus: MilestoneVerificationStatus;
  displayOrder: number;
}

// ------------------------------------------------------------------------------
// Activity & Metrics DTOs
// ------------------------------------------------------------------------------

export interface ActivitySummaryDto {
  publishedEventsCount: number;
  liveEventsCount: number;
  upcomingEventsCount: number;
  confirmedRegistrationsCount: number;
  activeVolunteersCount: number;
  activeCampaignsCount: number;
  totalCampaignParticipantsCount: number;
  lastUpdatedAt: string;
}

export interface LiveActivityEventDto {
  type: 'event_update' | 'announcement' | 'registration_milestone' | 'campaign_milestone';
  id: string;
  titleEn: string;
  titleMl: string;
  timestamp: string;
}

// ------------------------------------------------------------------------------
// Admin DTOs
// ------------------------------------------------------------------------------

export interface AdminDashboardSummaryDto {
  metrics: ActivitySummaryDto;
  recentRegistrations: EventRegistrationDto[];
  recentVolunteerApplications: VolunteerApplicationDto[];
  recentAuditLogs: AuditLogDto[];
}

export interface AuditLogDto {
  id: string;
  actorId: string | null;
  actorRole: string | null;
  action: string;
  resourceType: string;
  resourceId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}
