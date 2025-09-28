import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../supabase/server';

// Error types for better categorization
export enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  AUTHORIZATION_ERROR = 'authorization_error',
  DATABASE_ERROR = 'database_error',
  EXTERNAL_API_ERROR = 'external_api_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
  INTERNAL_ERROR = 'internal_error',
  NOT_FOUND_ERROR = 'not_found_error',
  BAD_REQUEST_ERROR = 'bad_request_error'
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Custom error class with additional context
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly severity: ErrorSeverity;
  public readonly statusCode: number;
  public readonly context?: Record<string, unknown>;
  public readonly timestamp: string;
  public readonly requestId?: string;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL_ERROR,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    statusCode: number = 500,
    context?: Record<string, unknown>,
    requestId?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.statusCode = statusCode;
    this.context = context;
    this.timestamp = new Date().toISOString();
    this.requestId = requestId;
  }
}

// Error logging interface
interface ErrorLog {
  id?: string;
  user_id?: string;
  error_type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  stack_trace?: string;
  context?: Record<string, unknown>;
  request_id?: string;
  endpoint?: string;
  method?: string;
  user_agent?: string;
  ip_address?: string;
  timestamp: string;
  resolved?: boolean;
  resolved_at?: string;
}

// Log error to database
async function logErrorToDatabase(errorLog: ErrorLog): Promise<void> {
  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await (supabase as unknown as { from: (table: string) => { insert: (data: unknown) => Promise<{ error: unknown }> } })
      .from('analytics_events')
      .insert({
        user_id: errorLog.user_id || null,
        event_type: 'error',
        event_category: errorLog.error_type,
        event_data: {
          severity: errorLog.severity,
          message: errorLog.message,
          stack_trace: errorLog.stack_trace,
          context: errorLog.context,
          request_id: errorLog.request_id,
          endpoint: errorLog.endpoint,
          method: errorLog.method,
          user_agent: errorLog.user_agent,
          ip_address: errorLog.ip_address,
          timestamp: errorLog.timestamp,
          resolved: errorLog.resolved || false
        }
      });
    
    if (error) {
      console.error('Failed to log error to database:', error);
    }
  } catch (logError) {
    console.error('Error in logErrorToDatabase:', logError);
  }
}

// Extract request information
function extractRequestInfo(request: NextRequest): Partial<ErrorLog> {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ipAddress = forwardedFor?.split(',')[0] || realIp || 'Unknown';
  
  return {
    endpoint: url.pathname,
    method: request.method,
    user_agent: userAgent,
    ip_address: ipAddress,
    request_id: request.headers.get('x-request-id') || undefined
  };
}

// Create error response
function createErrorResponse(
  error: AppError | Error,
  request: NextRequest,
  includeDetails: boolean = false
): NextResponse {
  const requestInfo = extractRequestInfo(request);
  const isAppError = error instanceof AppError;
  
  // Prepare error log
  const errorLog: ErrorLog = {
    error_type: isAppError ? error.type : ErrorType.INTERNAL_ERROR,
    severity: isAppError ? error.severity : ErrorSeverity.MEDIUM,
    message: error.message,
    stack_trace: error.stack,
    context: isAppError ? error.context : undefined,
    request_id: isAppError ? error.requestId : requestInfo.request_id,
    timestamp: new Date().toISOString(),
    ...requestInfo
  };
  
  // Log error to database (async, don't wait)
  logErrorToDatabase(errorLog).catch(console.error);
  
  // Console logging based on severity
  if (isAppError) {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        console.error(`[CRITICAL ERROR] ${error.message}`, error);
        break;
      case ErrorSeverity.HIGH:
        console.error(`[HIGH ERROR] ${error.message}`, error);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn(`[MEDIUM ERROR] ${error.message}`, error);
        break;
      case ErrorSeverity.LOW:
        console.info(`[LOW ERROR] ${error.message}`, error);
        break;
    }
  } else {
    console.error(`[UNKNOWN ERROR] ${error.message}`, error);
  }
  
  // Create response based on error type
  const statusCode = isAppError ? error.statusCode : 500;
  const responseBody: Record<string, unknown> = {
    error: true,
    message: includeDetails ? error.message : 'An error occurred',
    timestamp: errorLog.timestamp,
    request_id: errorLog.request_id
  };
  
  // Include additional details in development
  if (includeDetails && process.env.NODE_ENV === 'development') {
    responseBody.details = {
      type: errorLog.error_type,
      severity: errorLog.severity,
      stack: error.stack,
      context: errorLog.context
    };
  }
  
  return NextResponse.json(responseBody, { status: statusCode });
}

// Main error handler function
export function handleError(
  error: unknown,
  request: NextRequest,
  includeDetails: boolean = false
): NextResponse {
  // Convert unknown errors to AppError
  if (error instanceof AppError) {
    return createErrorResponse(error, request, includeDetails);
  }
  
  if (error instanceof Error) {
    // Try to categorize common errors
    let appError: AppError;
    
    if (error.message.includes('validation') || error.message.includes('required')) {
      appError = new AppError(
        error.message,
        ErrorType.VALIDATION_ERROR,
        ErrorSeverity.LOW,
        400
      );
    } else if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
      appError = new AppError(
        error.message,
        ErrorType.AUTHENTICATION_ERROR,
        ErrorSeverity.MEDIUM,
        401
      );
    } else if (error.message.includes('forbidden') || error.message.includes('permission')) {
      appError = new AppError(
        error.message,
        ErrorType.AUTHORIZATION_ERROR,
        ErrorSeverity.MEDIUM,
        403
      );
    } else if (error.message.includes('not found')) {
      appError = new AppError(
        error.message,
        ErrorType.NOT_FOUND_ERROR,
        ErrorSeverity.LOW,
        404
      );
    } else if (error.message.includes('database') || error.message.includes('supabase')) {
      appError = new AppError(
        error.message,
        ErrorType.DATABASE_ERROR,
        ErrorSeverity.HIGH,
        500
      );
    } else {
      appError = new AppError(
        error.message,
        ErrorType.INTERNAL_ERROR,
        ErrorSeverity.MEDIUM,
        500
      );
    }
    
    return createErrorResponse(appError, request, includeDetails);
  }
  
  // Handle non-Error objects
  const unknownError = new AppError(
    'An unknown error occurred',
    ErrorType.INTERNAL_ERROR,
    ErrorSeverity.HIGH,
    500,
    { originalError: String(error) }
  );
  
  return createErrorResponse(unknownError, request, includeDetails);
}

// Wrapper for API routes with error handling
export function withErrorHandling<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
  includeDetails: boolean = false
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      // Extract request from args (assuming it's the first argument)
      const request = args[0] as NextRequest;
      return handleError(error, request, includeDetails);
    }
  };
}

// Convenience error creators
export function createRateLimitError(message: string = 'Rate limit exceeded'): AppError {
  return new AppError(
    message,
    ErrorType.RATE_LIMIT_ERROR,
    ErrorSeverity.MEDIUM,
    429,
    { retry_after: 60 }
  );
}

export function createValidationError(message: string, context?: Record<string, unknown>): AppError {
  return new AppError(
    message,
    ErrorType.VALIDATION_ERROR,
    ErrorSeverity.LOW,
    400,
    context
  );
}

export function createDatabaseError(message: string, context?: Record<string, unknown>): AppError {
  return new AppError(
    message,
    ErrorType.DATABASE_ERROR,
    ErrorSeverity.HIGH,
    500,
    context
  );
}

export function createAuthError(message: string = 'Authentication required'): AppError {
  return new AppError(
    message,
    ErrorType.AUTHENTICATION_ERROR,
    ErrorSeverity.MEDIUM,
    401
  );
}

export function createAuthorizationError(message: string = 'Insufficient permissions'): AppError {
  return new AppError(
    message,
    ErrorType.AUTHORIZATION_ERROR,
    ErrorSeverity.MEDIUM,
    403
  );
}
