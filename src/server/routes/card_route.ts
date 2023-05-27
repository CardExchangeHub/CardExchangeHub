// add purchases

// eslint-disable-next-line import/no-import-module-exports
import { Response, Request, Router } from 'express';
// eslint-disable-next-line import/no-import-module-exports
import cardController from '../controllers/cardController';

const router = Router();

// get all cards
router.get('/', cardController.getCards, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

// add card
router.post('/', cardController.addCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

// router.post('/', addCard, (req: Request, res: Response) => {
//   res.status(200).json(res.locals.cards);
// });

// edit card
router.put('/:id', cardController.editCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

export default router;
