import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
  sub: string;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Token not provided');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, auth.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch {
    throw new Error('Invalid Token');
  }
};
