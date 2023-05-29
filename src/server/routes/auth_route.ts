// add seller
// add buyer

import { Request, Response, Router } from 'express';
import authController from '../controllers/authController.js';

// import controllers specific to this router

const router = Router();

router.get('/', authController.getUsers, (_req: Request, res: Response) => {
  res.json(res.locals.users);
});

router.post('/', authController.addUser, (_req: Request, res: Response) => {
  res.json(res.locals.user);
});
router.delete(
  '/',
  authController.deleteUser,
  (_req: Request, res: Response) => {
    res.json(res.locals.deletedUser);
  }
);
// add routes
// Google Auth Routes

export default router;
