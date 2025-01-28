import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { decryptID } from 'src/libs/hashing';

export interface Response<T> {
  data: T;
}

function getDecrypted(elemt: any) {
  const keys = Object.keys(elemt);
  keys.forEach((key) => {
    if ((key.endsWith('_id') || key === 'id') && elemt[key] !== null && typeof elemt[key] === 'string') {
      elemt[key] = decryptID(elemt[key]);
    } else if (typeof elemt[key] === 'object' && elemt[key] !== null) {
      if (Array.isArray(elemt[key]) && !!Object.values(elemt[key]).find(el => ['string', 'number'].includes(typeof el)) && (key.endsWith('_id') || key === 'id')) {
        elemt[key] = elemt[key].map(el => decryptID(el))
      } else {
        elemt[key] = getDecrypted(elemt[key]);
      }
    }
  });
  return elemt;
}

@Injectable()
export class TransformIdInterceptorDecryptor<T>
  implements NestInterceptor<T, Response<T>>
{

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    try {
      if (request.params && Object.keys(request.params).length > 0) {
        request.params = getDecrypted(request.params)  
      }
      if (request.body && Object.keys(request.body).length > 0) {
        request.body = getDecrypted(request.body)  
      }
      if (request.query && Object.keys(request.query).length > 0) {
        request.query = getDecrypted(request.query)  
      }
    } catch (error) {
      if (error.message.startsWith("No se puede desencriptar el valor:") && context.getHandler().name === "verify") {
        request.params.id = -1
        return next.handle()
      }
      throw new ForbiddenException(error.message)
    }    
    return next.handle()
  }
}
