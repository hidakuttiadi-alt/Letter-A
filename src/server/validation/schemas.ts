// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// VALIDATION SCHEMAS: src/server/validation/schemas.ts
// Description: Zod input validation schemas for all public and administrative APIs.
// ==============================================================================

import { z } from 'zod';

// Common phone regex accepting Indian & international formats (+91..., 10 digits)
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

// ------------------------------------------------------------------------------
// 1. Events Validation
// ------------------------------------------------------------------------------

export const baseEventSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens'),
  titleEn: z.string().min(3, 'English title must be at least 3 characters').max(255),
  titleMl: z.string().min(3, 'Malayalam title must be at least 3 characters').max(255),
  descriptionEn: z.string().min(10, 'English description must be at least 10 characters'),
  descriptionMl: z.string().min(10, 'Malayalam description must be at least 10 characters'),
  startTime: z.string().datetime({ message: 'Valid ISO datetime required for startTime' }),
  endTime: z.string().datetime({ message: 'Valid ISO datetime required for endTime' }),
  locationNameEn: z.string().min(2, 'English location name required'),
  locationNameMl: z.string().min(2, 'Malayalam location name required'),
  locationAddress: z.string().optional(),
  locationMapUrl: z.string().url('Invalid map URL').optional().or(z.literal('')),
  categoryId: z.string().uuid('Invalid category ID').optional().nullable(),
  bannerUrl: z.string().url('Invalid banner URL').optional().or(z.literal('')),
  registrationEnabled: z.boolean().default(false),
  registrationCapacity: z.number().int().nonnegative('Capacity cannot be negative').default(0),
  registrationDeadline: z.string().datetime().optional().nullable(),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
  lifecycleStatus: z.enum(['upcoming', 'live', 'completed', 'cancelled']).default('upcoming'),
  isFeatured: z.boolean().default(false),
});

export const createEventSchema = baseEventSchema.refine((data) => new Date(data.endTime) >= new Date(data.startTime), {
  message: 'End time must be after or equal to start time',
  path: ['endTime'],
});

export const updateEventSchema = baseEventSchema.partial();

export const createEventUpdateSchema = z.object({
  titleEn: z.string().min(2, 'English title required').max(255),
  titleMl: z.string().min(2, 'Malayalam title required').max(255),
  contentEn: z.string().min(5, 'English content required'),
  contentMl: z.string().min(5, 'Malayalam content required'),
});

// ------------------------------------------------------------------------------
// 2. Registrations Validation
// ------------------------------------------------------------------------------

export const registerForEventSchema = z.object({
  eventId: z.string().uuid('Valid Event UUID required'),
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Name too long'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid phone number format'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Valid email address required'),
  institution: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(500).optional(),
});

export const updateRegistrationStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'rejected']),
  notes: z.string().optional(),
});

// ------------------------------------------------------------------------------
// 3. Volunteer Validation
// ------------------------------------------------------------------------------

export const createVolunteerOpportunitySchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens'),
  titleEn: z.string().min(3).max(255),
  titleMl: z.string().min(3).max(255),
  descriptionEn: z.string().min(10),
  descriptionMl: z.string().min(10),
  category: z.string().min(2),
  location: z.string().min(2),
  skillsNeeded: z.array(z.string()).default([]),
  capacity: z.number().int().nonnegative().default(0),
  status: z.enum(['open', 'closed', 'paused']).default('open'),
});

export const applyVolunteerSchema = z.object({
  opportunityId: z.string().uuid('Valid Opportunity UUID required'),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid phone number format'),
  age: z.number().int().min(13, 'Must be at least 13 years old').max(120).optional(),
  occupation: z.string().trim().max(100).optional(),
  institution: z.string().trim().max(150).optional(),
  qualifications: z.string().trim().max(200).optional(),
  skills: z.array(z.string()).default([]),
  availability: z.string().trim().min(3, 'Availability details required').max(300),
});

export const updateVolunteerApplicationStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'withdrawn']),
  reviewNotes: z.string().optional(),
});

// ------------------------------------------------------------------------------
// 4. Campaign Validation
// ------------------------------------------------------------------------------

export const baseCampaignSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  titleEn: z.string().min(3).max(255),
  titleMl: z.string().min(3).max(255),
  descriptionEn: z.string().min(10),
  descriptionMl: z.string().min(10),
  bannerUrl: z.string().url().optional().or(z.literal('')),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  participationTarget: z.number().int().positive().default(1000),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
  campaignStatus: z.enum(['upcoming', 'active', 'completed', 'cancelled']).default('upcoming'),
});

export const createCampaignSchema = baseCampaignSchema.refine((data) => new Date(data.endTime) >= new Date(data.startTime), {
  message: 'End time must be after start time',
  path: ['endTime'],
});

export const updateCampaignSchema = baseCampaignSchema.partial();

export const joinCampaignSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid phone number').optional().or(z.literal('')),
  district: z.string().trim().max(100).optional(),
  pledgeText: z.string().trim().max(500).optional(),
});

// ------------------------------------------------------------------------------
// 5. Donations Validation (DEMO MODE READY)
// ------------------------------------------------------------------------------

export const createDonationIntentSchema = z.object({
  amount: z
    .number()
    .positive('Donation amount must be greater than zero')
    .min(1, 'Minimum donation amount is ₹1')
    .max(10000000, 'Amount exceeds maximum permitted in single transaction'),
  currency: z.string().default('INR'),
  cause: z.string().trim().min(2).max(100).default('Centenary General Fund'),
  donorName: z.string().trim().min(2, 'Name required').max(120),
  donorEmail: z.string().trim().toLowerCase().email('Valid email required'),
  donorPhone: z.string().trim().regex(phoneRegex, 'Invalid phone format').optional().or(z.literal('')),
  isAnonymous: z.boolean().default(false),
  notes: z.string().trim().max(300).optional(),
});

export const completeDemoDonationSchema = z.object({
  referenceId: z.string().min(6, 'Valid reference ID required'),
  paymentMethod: z.string().default('DEMO_UPI'),
  simulateFailure: z.boolean().default(false),
});

// ------------------------------------------------------------------------------
// 6. Announcements Validation
// ------------------------------------------------------------------------------

export const createAnnouncementSchema = z.object({
  titleEn: z.string().min(3).max(255),
  titleMl: z.string().min(3).max(255),
  contentEn: z.string().min(5),
  contentMl: z.string().min(5),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('published'),
  publishedAt: z.string().datetime().optional(),
  eventId: z.string().uuid().optional().nullable(),
  campaignId: z.string().uuid().optional().nullable(),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

// ------------------------------------------------------------------------------
// 7. Historical Milestone Validation
// ------------------------------------------------------------------------------

export const createMilestoneSchema = z.object({
  milestoneYear: z.string().regex(/^[0-9]{4}$/, 'Year must be 4 digits (e.g., 1926)'),
  milestoneDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional().nullable(),
  titleEn: z.string().min(3).max(255),
  titleMl: z.string().min(3).max(255),
  descriptionEn: z.string().min(10),
  descriptionMl: z.string().min(10),
  mediaUrl: z.string().url().optional().or(z.literal('')),
  mediaCaptionEn: z.string().max(255).optional(),
  mediaCaptionMl: z.string().max(255).optional(),
  sourceReferences: z.string().max(500).optional(),
  verificationStatus: z.enum(['unverified', 'verified', 'disputed']).default('verified'),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('published'),
  displayOrder: z.number().int().default(0),
});

export const updateMilestoneSchema = createMilestoneSchema.partial();
