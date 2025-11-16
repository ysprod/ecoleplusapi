import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? (exception as HttpException).getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const baseMessage = isHttp
      ? (exception as HttpException).message
      : 'Internal server error';

    // Derive a machine-friendly internal code
    const path: string = request?.url || '';
    const method: string = request?.method || '';

    const code = this.deriveCode(exception, { path, method, status });

    // Attempt to capture details provided by HttpException.response
    let details: any = undefined;
    if (isHttp) {
      const resp = (exception as HttpException).getResponse?.();
      if (resp && typeof resp === 'object') {
        const { message, error, ...rest } = resp as any;
        // Keep only non-sensitive details
        details = { ...rest };
      }
    }

    const body = {
      statusCode: status,
      code,
      message: baseMessage,
      timestamp: new Date().toISOString(),
      path,
      ...(details ? { details } : {}),
    };

    // Log server-side with the code for traceability
    const logLine = `[${method} ${path}] error code=${code} status=${status} msg=${baseMessage}`;
    if (status >= 500) {
      // eslint-disable-next-line no-console
      console.error(logLine, exception);
    } else {
      // eslint-disable-next-line no-console
      console.warn(logLine);
    }

    // Also expose the code as a response header for quick debugging
    try {
      response.setHeader?.('x-error-code', code);
    } catch {}

    response.status(status).json(body);
  }

  private deriveCode(
    exception: unknown,
    ctx: { path: string; method: string; status: number },
  ): string {
    const name = (exception as any)?.name || 'Error';
    const { path, status } = ctx;

    // Specific mapping for known routes
    if (name === 'UnauthorizedException' && path.includes('/auth/login')) {
      return 'AUTH_INVALID_CREDENTIALS';
    }

    // Generic mappings by type/status
    if (name === 'UnauthorizedException') return 'UNAUTHORIZED';
    if (name === 'BadRequestException') return 'BAD_REQUEST';
    if (name === 'NotFoundException') return 'NOT_FOUND';
    if (name === 'ForbiddenException') return 'FORBIDDEN';

    if (status >= 500) return 'INTERNAL_ERROR';
    return name.toUpperCase().replace(/\W+/g, '_');
  }
}
