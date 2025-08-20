import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      if (exception.getStatus() !== 500) {
        const exceptionResponse = exception.getResponse();

        const messages =
          typeof exceptionResponse === 'object' &&
          'message' in exceptionResponse
            ? exceptionResponse.message
            : exceptionResponse;

        const formattedErrors = Array.isArray(messages)
          ? messages.map((message) => ({
              error: exception.name || 'ValidationError',
              message: message,
            }))
          : [
              {
                error: exception.name || 'ValidationError',
                message: messages,
              },
            ];

        return response.status(exception.getStatus()).json({
          errors: formattedErrors,
        });
      }
    }

    const request = ctx.getRequest<Request>();
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  }
}
