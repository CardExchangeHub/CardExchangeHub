// add purchases

// eslint-disable-next-line import/no-import-module-exports
import { Response, Request, Router } from 'express';
// eslint-disable-next-line import/no-import-module-exports
import cardController from '../controllers/cardController.js';

const router = Router();

// get cards for sale
router.get(
  '/',
  cardController.getCardsForSale,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.cards);
  }
);

// add card
router.post('/:id', cardController.addCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

// delete card
router.delete(
  '/:id',
  cardController.deleteCard,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.cards);
  }
);

// add purchase
router.put(
  '/:id/purchase',
  cardController.purchasedCard,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.newPurchase || 'already sold');
  }
);

// edit card
router.put('/:id', cardController.editCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

export default router;
