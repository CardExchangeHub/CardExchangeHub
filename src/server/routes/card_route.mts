import { Response, Request, Router } from 'express';
import cardController from '../controllers/cardController.mjs';
import verifyUser from '../controllers/authController.mjs';
const router = Router();

// get all cards for sale
router.get(
  '/',
  cardController.getCardsForSale,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.cards);
  }
);

// add card to market
router.post('/:id', cardController.addCard, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.newCard);
});

// delete card from market
router.delete(
  '/:id',
  cardController.deleteCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedCard);
  }
);

// mark card as 'purchased' by setting value of 'sold' column to true
router.put(
  '/:id/purchase',
  cardController.purchasedCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newPurchase || 'already sold');
  }
);

// edit card
router.put('/:id', cardController.editCard, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});

export default router;
