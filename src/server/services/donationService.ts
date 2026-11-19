// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// DONATION SERVICE: src/server/services/donationService.ts
// Description: Secure donation architecture currently configured for DEMO MODE.
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import { recordAuditLog } from '@/server/utils/audit';
import type {
  DonationIntentDto,
  DonationReceiptDto,
  CreateDonationIntentRequest,
  CompleteDemoDonationRequest,
} from '@/types/api';
import type { DonationStatus } from '@/types/database';

export class DonationError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export async function createDonationIntent(
  input: CreateDonationIntentRequest
): Promise<DonationIntentDto> {
  const admin = getAdminClient();

  const isDemo = process.env.DEMO_PAYMENT_ENABLED !== 'false';
  const refPrefix = isDemo ? 'SAM-DEMO-DON-' : 'SAM-DON-';
  const referenceId = `${refPrefix}${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { data, error } = await admin
    .from('donation_intents')
    .insert({
      reference_id: referenceId,
      amount: input.amount,
      currency: input.currency || 'INR',
      cause: input.cause || 'Centenary General Fund',
      donor_name: input.donorName.trim(),
      donor_email: input.donorEmail.toLowerCase().trim(),
      donor_phone: input.donorPhone?.trim() || null,
      is_anonymous: input.isAnonymous ?? false,
      status: 'initiated',
      is_demo: isDemo,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    referenceId: data.reference_id,
    amount: Number(data.amount),
    currency: data.currency,
    cause: data.cause,
    donorName: data.is_anonymous ? 'Anonymous Centenary Supporter' : data.donor_name,
    donorEmail: data.donor_email,
    donorPhone: data.donor_phone,
    isAnonymous: data.is_anonymous,
    status: data.status,
    isDemo: data.is_demo,
    createdAt: data.created_at,
  };
}

export async function completeDemoDonation(
  input: CompleteDemoDonationRequest
): Promise<DonationReceiptDto> {
  const admin = getAdminClient();

  if (process.env.DEMO_PAYMENT_ENABLED === 'false') {
    throw new DonationError(
      'FORBIDDEN',
      'Demo donations are disabled. Live payment gateway keys required.'
    );
  }

  // 1. Fetch donation intent
  const { data: intent, error: intentError } = await admin
    .from('donation_intents')
    .select('*')
    .eq('reference_id', input.referenceId)
    .single();

  if (intentError || !intent) {
    throw new DonationError('NOT_FOUND', 'Donation intent reference not found.');
  }

  if (intent.status === 'succeeded') {
    throw new DonationError('ALREADY_COMPLETED', 'This donation intent has already succeeded.');
  }

  if (intent.status === 'cancelled') {
    throw new DonationError('INTENT_CANCELLED', 'This donation intent was cancelled.');
  }

  const txRef = `TX-DEMO-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const status: DonationStatus = input.simulateFailure ? 'failed' : 'succeeded';
  const verifiedAt = status === 'succeeded' ? new Date().toISOString() : null;

  // 2. Insert transaction record
  const { data: tx, error: txError } = await admin
    .from('donation_transactions')
    .insert({
      intent_id: intent.id,
      transaction_reference: txRef,
      payment_provider: 'DEMO_SIMULATOR',
      payment_method: input.paymentMethod || 'DEMO_UPI',
      amount: intent.amount,
      currency: intent.currency,
      status,
      provider_payload: {
        simulator: true,
        method: input.paymentMethod || 'DEMO_UPI',
        timestamp: new Date().toISOString(),
        simulatedFailure: Boolean(input.simulateFailure),
      },
      verified_at: verifiedAt,
      is_demo: true,
    })
    .select()
    .single();

  if (txError) throw txError;

  // 3. Update intent status
  await admin
    .from('donation_intents')
    .update({ status })
    .eq('id', intent.id);

  // 4. Audit log
  await recordAuditLog({
    action: status === 'succeeded' ? 'DEMO_DONATION_SUCCEEDED' : 'DEMO_DONATION_FAILED',
    resourceType: 'donation_transactions',
    resourceId: tx.id,
    metadata: {
      intent_id: intent.id,
      amount: intent.amount,
      currency: intent.currency,
      reference_id: intent.reference_id,
      is_demo: true,
    },
  });

  return {
    receiptId: tx.id,
    transactionReference: tx.transaction_reference,
    referenceId: intent.reference_id,
    amount: Number(intent.amount),
    currency: intent.currency,
    cause: intent.cause,
    donorName: intent.is_anonymous ? 'Anonymous Supporter' : intent.donor_name,
    status,
    isDemo: true,
    paymentMethod: tx.payment_method,
    verifiedAt: verifiedAt || new Date().toISOString(),
  };
}

export interface ListAdminDonationsOptions {
  status?: DonationStatus;
  isDemo?: boolean;
  page?: number;
  limit?: number;
}

export async function listAdminDonations(options: ListAdminDonationsOptions = {}) {
  const admin = getAdminClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  let query = admin
    .from('donation_intents')
    .select(`
      *,
      donation_transactions (*)
    `, { count: 'exact' });

  if (options.status) {
    query = query.eq('status', options.status);
  }
  if (options.isDemo !== undefined) {
    query = query.eq('is_demo', options.isDemo);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count || 0;
  return {
    donations: data || [],
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
