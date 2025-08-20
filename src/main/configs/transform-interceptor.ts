import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.getArgByIndex(1);
    return next.handle().pipe(
      map((data) => {
        if (data?.statusCode) {
          response.status(data.statusCode);
          return data.body;
        }
        return data;
      }),
    );
  }
}
