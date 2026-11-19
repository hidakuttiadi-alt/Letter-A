// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// API RESPONSE UTILITY: src/server/utils/response.ts
// Description: Standard JSON envelopes and HTTP status helpers.
// ==============================================================================

import { NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse, ApiPaginationMeta } from '@/types/api';

export function successResponse<T>(
  data: T,
  meta?: ApiPaginationMeta,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    data,
    error: null,
  };

  if (meta) {
    payload.meta = meta;
  }

  return NextResponse.json(payload, { status });
}

export function errorResponse(
  code: string,
  message: string,
  status: number = 400,
  details?: unknown
): NextResponse<ApiErrorResponse> {
  const payload: ApiErrorResponse = {
    success: false,
    data: null,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };

  return NextResponse.json(payload, { status });
}

export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  CAPACITY_EXCEEDED: 'CAPACITY_EXCEEDED',
  DEADLINE_PASSED: 'DEADLINE_PASSED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;
