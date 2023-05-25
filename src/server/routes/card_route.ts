// get cards
// add card
// delete cards
// edit card

//add purchases
import cardController from '../controllers/cardController';

import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', cardController.getCards, (req: Request, res: Response) => {});

// add card

router.post('/', cardController.addCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.cards);
});
