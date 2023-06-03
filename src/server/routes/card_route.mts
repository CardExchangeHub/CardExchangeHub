import { Response, Request, Router } from 'express';
import cardController from '../controllers/cardController.mjs';
import authController from '../controllers/authController.mjs';
const router = Router();

// get all cards for sale
router.get(
  '/',
  cardController.getCardsForSale,
  (_req: Request, res: Response) => {
    console.log('returned cards', res.locals.cards);
    res.status(200).json(res.locals.cards);
  }
);

// add card to market
router.post(
  '/:id',
  // authController.verifyUser,
  cardController.addCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newCard);
  }
);

// delete card from market
router.delete(
  '/:id',
  // authController.verifyUser,
  cardController.deleteCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedCardId);
  }
);

// mark card as 'purchased' by setting value of 'sold' column to true
router.put(
  '/:id/purchase',
  // authController.verifyUser,
  cardController.purchasedCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newPurchase || 'already sold');
  }
);

// edit card
router.put(
  '/:id',
  // authController.verifyUser,
  cardController.editCard,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.cards);
  }
);

export default router;
