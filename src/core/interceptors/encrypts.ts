import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { encryptID } from 'src/libs/hashing';

export interface Response<T> {
  data: T;
}

export function getEncripted(elemt: any) {
  if (!elemt) {
    return elemt
  }
  const keys = Object.keys(elemt);
  keys.forEach((key) => {
    if ((key.endsWith('_id') || key === 'id') && elemt[key] !== null && typeof elemt[key] !== 'object') {
      elemt[key] = encryptID(elemt[key]);
    } else if (typeof elemt[key] === 'object' && elemt[key] !== null) {
      if (Array.isArray(elemt[key]) && !!Object.values(elemt[key]).find(el => ['string', 'number'].includes(typeof el)) && (key.endsWith('_id') || key === 'id')) {
        elemt[key] = elemt[key].map(el => encryptID(el))
      } else {
        elemt[key] = getEncripted(elemt[key]);
      }
    }
  });
  return elemt;
}

@Injectable()
export class TransformIdInterceptorEncriptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => getEncripted(data)));
  }
}
