import { SetMetadata } from '@nestjs/common';
import { CookieOptions } from 'express';

export interface CookieConfig {
  name: string;
  keyPath: string;
  options?: CookieOptions;
}

export const SET_COOKIES_KEY = 'set_cookies';
export const SetCookies = (...cookies: CookieConfig[]) =>
  SetMetadata(SET_COOKIES_KEY, cookies);
