import { Request } from 'express';

export class RequestToken extends Request {
  token?: string;
}
