import { type Request } from 'express';

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export interface UserPayload {
  email: string;
  role: string;
}
