import { Request, Response, NextFunction } from 'express';

import db from '../models/cardModel.mjs';

export default {
  addUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const query =
        'INSERT INTO "public.Users" (username, password) VALUES ($1,$2) RETURNING *';
      const user = await db.query(query, [username, password]);
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `Error adding user in authController: ${err}`,
        status: 500,
        message: { err: 'Error adding user in authController' },
      });
    }
  },
  getUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const query = 'SELECT * FROM "public.Users"';
      const users = await db.query(query);
      res.locals.users = users;
      return next();
    } catch (err) {
      return next({
        log: `Error fetching all users in authController.getUsers: ${err}`,
        status: 500,
        message: { err: 'Error fetching all users in authController.getUsers' },
      });
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const query = 'DELETE FROM "public.Users" WHERE id = ($1) RETURNING *;';
      const deletedUser = await db.query(query, [userId]);
      res.locals.deletedUser = deletedUser;
      return next();
    } catch (err) {
      return next({
        log: `Error deleting user in authController.deleteUser: ${err}`,
        status: 500,
        message: { err: 'Error deleting user in authController.deleteUser' },
      });
    }
  },
  //verify the user
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const query =
        'SELECT * FROM "public.Users" WHERE username = ($1) AND password = ($2);';
      const user = await db.query(query, [username, password]);
      if (user.rows.length === 0) {
        console.log('user not found');
        return next();
      } else {
        res.locals.user = user.rows[0];
        return next();
      }
    } catch (err) {
      return next({
        log: `Error verifying user in authController.verifyUser: ${err}`,
        status: 500,
        message: { err: 'Error verifying user in authController.verifyUser' },
      });
    }
  },
};
