import { applyDecorators, UseGuards } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';

interface RateLimitOptions {
  /**
   * Número máximo de requisições permitidas
   */
  limit: number;
  /**
   * Tempo em segundos para resetar o contador de requisições
   */
  ttl: number;
}

export function RateLimit(options: RateLimitOptions) {
  return applyDecorators(
    Throttle({ default: { limit: options.limit, ttl: options.ttl * 1000 } }),
    UseGuards(ThrottlerGuard),
  );
}

export function SkipRateLimit() {
  return SkipThrottle();
}
