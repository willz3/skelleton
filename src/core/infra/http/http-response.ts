import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export interface IHttpResponse {
  statusCode: number;
  body?: ObjectAny;
}

export function ok<T = ObjectAny>(dto: T) {
  return {
    statusCode: 200,
    body: dto,
  };
}

export function created<T = ObjectAny>(dto: T): IHttpResponse {
  return {
    statusCode: 201,
    body: dto,
  };
}

export function noContent(): IHttpResponse {
  return {
    statusCode: 204,
  };
}

export function redirect(url: string): IHttpResponse {
  return {
    statusCode: 302,
    body: {
      url,
    },
  };
}

export function badRequest(errors: Error[]): IHttpResponse {
  const data = [];
  errors.forEach((error) => {
    data.push({
      error: error.name,
      message: error.message,
    });
  });

  return {
    statusCode: 400,
    body: {
      errors: data,
    },
  };
}

export function unauthorized(error: Error): IHttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error) {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

export function notFound(error: Error) {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

export function notAcceptable(error: Error): IHttpResponse {
  return {
    statusCode: 406,
    body: {
      error: error.message,
    },
  };
}

export function fail(error: Error) {
  console.log(error);
  return {
    statusCode: 500,
    body: {
      error: 'Internal server error',
    },
  };
}

export function serviceUnavailable(error?: Error): IHttpResponse {
  return {
    statusCode: 503,
    body: {
      error: error?.message ?? 'Service unavailable.',
    },
  };
}

type ObjectAny = { [key: string]: any };
