import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CookieConfig,
  SET_COOKIES_KEY,
} from '../decorators/set-cookies.decorator';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cookieConfigs = this.reflector.get<CookieConfig[]>(
      SET_COOKIES_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      tap((data) => {
        if (!cookieConfigs || !data) return;

        const response = context.switchToHttp().getResponse<Response>();

        for (const config of cookieConfigs) {
          // Resolve nested properties if needed (e.g., 'accessToken' or 'data.token')
          const tokenValue = config.keyPath
            .split('.')
            .reduce((obj, key) => obj?.[key], data);

          if (tokenValue) {
            response.cookie(config.name, tokenValue, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 1000 * 60 * 60 * 24, // 1 day default
              ...config.options,
            });
          }
        }
      }),
    );
  }
}
