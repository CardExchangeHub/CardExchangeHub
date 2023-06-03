// module.exports = cookieController;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CookieController {
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => void;
  createJWToken: (id: any) => string;
}

const cookieController: CookieController = {
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
    res.cookie('ssid', res.locals.id, {
      maxAge: 10 * 86400000,
      httpOnly: false,
    });
    console.log(res.cookie);
  },
  createJWToken: (id: any) => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not defined');
    }
    return jwt.sign(id, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  },
};

export default cookieController;
