import { createServerSupabaseClient } from '@/lib/supabase/server';

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Log context interface
export interface LogContext {
  user_id?: string;
  session_id?: string;
  request_id?: string;
  endpoint?: string;
  method?: string;
  user_agent?: string;
  ip_address?: string;
  duration_ms?: number;
  [key: string]: unknown;
}

// Logger class
export class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Log to console and database
  private async log(level: LogLevel, message: string, context?: LogContext): Promise<void> {
    const timestamp = new Date().toISOString();
    // const logEntry = {
  //   level,
  //   message,
  //   context: context || {},
  //   timestamp
  // };

    // Console logging
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[DEBUG] ${message}`, context);
        break;
      case LogLevel.INFO:
        console.info(`[INFO] ${message}`, context);
        break;
      case LogLevel.WARN:
        console.warn(`[WARN] ${message}`, context);
        break;
      case LogLevel.ERROR:
        console.error(`[ERROR] ${message}`, context);
        break;
      case LogLevel.CRITICAL:
        console.error(`[CRITICAL] ${message}`, context);
        break;
    }

    // Database logging (async, don't wait)
    this.logToDatabase(level, message, context, timestamp).catch(error => {
      console.error('Failed to log to database:', error);
    });
  }

  // Log to database
  private async logToDatabase(
    level: LogLevel,
    message: string,
    context?: LogContext,
    timestamp?: string
  ): Promise<void> {
    try {
      const supabase = await createServerSupabaseClient();
      await (supabase as unknown as { from: (table: string) => { insert: (data: unknown) => Promise<void> } })
        .from('analytics_events')
        .insert({
          user_id: context?.user_id || null,
          event_type: 'log',
          event_category: level,
          event_data: {
            message,
            context: context || {},
            timestamp: timestamp || new Date().toISOString()
          }
        });
    } catch (error) {
      console.error('Database logging failed:', error);
    }
  }

  // Public logging methods
  public async debug(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.DEBUG, message, context);
  }

  public async info(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.INFO, message, context);
  }

  public async warn(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.WARN, message, context);
  }

  public async error(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.ERROR, message, context);
  }

  public async critical(message: string, context?: LogContext): Promise<void> {
    await this.log(LogLevel.CRITICAL, message, context);
  }

  // Performance logging
  public async performance(
    operation: string,
    duration: number,
    context?: LogContext
  ): Promise<void> {
    await this.info(`Performance: ${operation} took ${duration}ms`, {
      ...context,
      operation,
      duration_ms: duration
    });
  }

  // API request logging
  public async apiRequest(
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): Promise<void> {
    const level = statusCode >= 500 ? LogLevel.ERROR : 
                  statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;
    
    await this.log(level, `API ${method} ${endpoint} - ${statusCode}`, {
      ...context,
      method,
      endpoint,
      status_code: statusCode,
      duration_ms: duration
    });
  }

  // Database operation logging
  public async databaseOperation(
    operation: string,
    table: string,
    success: boolean,
    duration?: number,
    context?: LogContext
  ): Promise<void> {
    const level = success ? LogLevel.INFO : LogLevel.ERROR;
    const message = `Database ${operation} on ${table} ${success ? 'succeeded' : 'failed'}`;
    
    await this.log(level, message, {
      ...context,
      operation,
      table,
      success,
      duration_ms: duration
    });
  }

  // User action logging
  public async userAction(
    action: string,
    userId: string,
    details?: Record<string, unknown>
  ): Promise<void> {
    await this.info(`User action: ${action}`, {
      user_id: userId,
      action,
      ...details
    });
  }

  // Security event logging
  public async securityEvent(
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    context?: LogContext
  ): Promise<void> {
    const level = severity === 'critical' ? LogLevel.CRITICAL :
                  severity === 'high' ? LogLevel.ERROR :
                  severity === 'medium' ? LogLevel.WARN : LogLevel.INFO;
    
    await this.log(level, `Security event: ${event}`, {
      ...context,
      security_event: event,
      severity
    });
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience functions
export const logDebug = (message: string, context?: LogContext) => 
  logger.debug(message, context);

export const logInfo = (message: string, context?: LogContext) => 
  logger.info(message, context);

export const logWarn = (message: string, context?: LogContext) => 
  logger.warn(message, context);

export const logError = (message: string, context?: LogContext) => 
  logger.error(message, context);

export const logCritical = (message: string, context?: LogContext) => 
  logger.critical(message, context);

export const logPerformance = (operation: string, duration: number, context?: LogContext) => 
  logger.performance(operation, duration, context);

export const logApiRequest = (method: string, endpoint: string, statusCode: number, duration: number, context?: LogContext) => 
  logger.apiRequest(method, endpoint, statusCode, duration, context);

export const logDatabaseOperation = (operation: string, table: string, success: boolean, duration?: number, context?: LogContext) => 
  logger.databaseOperation(operation, table, success, duration, context);

export const logUserAction = (action: string, userId: string, details?: Record<string, unknown>) => 
  logger.userAction(action, userId, details);

export const logSecurityEvent = (event: string, severity: 'low' | 'medium' | 'high' | 'critical', context?: LogContext) => 
  logger.securityEvent(event, severity, context);
