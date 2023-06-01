// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';

// import db from '../models/cardExHub';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import db from '../models/cardModel.js';

export default {
  // currently working on. need to add cards to test this.
  getCardsForSale: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const cardsQuery =
        'SELECT * FROM public.market_postings WHERE sold = ($1)';
      const cardsForSale = await db.query(cardsQuery, [false]);
      res.locals.cards = cardsForSale;
      return next();
    } catch (err) {
      return next({
        log: `Error in cardController.getCardsForSale: ${err}`,
        status: 500,
        message: {
          err: 'Error in cardController.getCardsForSale',
        },
      });
    }
  },
  addCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardHolder = await db.query(
        'SELECT public.Users.id FROM "public.Users" WHERE public.Users.id = $1',
        [req.params.id]
      );

      // check if user isnt found
      if (cardHolder.rowCount === 0) {
        return null;
      }

      // insert card into database
      const newCard = await db.query(
        'INSERT INTO public.market_postings (price, condition,seller,cardId ) VALUES ($1,$2,$3, $4) RETURNING *',
        [
          req.body.card_price,
          req.body.card_description,
          cardHolder.rows[0].id,
          req.body.cardId,
        ]
      );

      // get all the cards
      const cardsData = await db.query('SELECT * FROM public.market_postings');
      res.locals.cards = cardsData.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in addCard middleware: ${err}`,
        status: 500,
        message: {
          e: 'An error occurred when adding a new card',
        },
      });
    }
  },

  deleteCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.query('DELETE FROM public.market_postings WHERE cardId = $1', [
        req.params.id,
      ]);
      return next();
    } catch (err) {
      return next({
        log: `Error in deleteCard middleware: ${err}`,
        status: 500,
        message: {
          e: 'An error occured when deleting a card',
        },
      });
    }
  },
  purchasedCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPurchase = await db.query(
        'UPDATE public.market_postings SET sold = $1, buyer = $2 WHERE cardId = $3',
        [true, req.body.buyer, req.params.id]
      );
      res.locals.newPurchase = newPurchase.rows;
      return next();
    } catch (err) {
      return next({});
    }
  },
  editCard: async (req: Request, res: Response, next: NextFunction) => {
    // cardID is provided in request parameters
    const { cardId } = req.params;
    try {
      // query existing card
      const cardData = await db.query(
        'SELECT * FROM public.market_postings WHERE cardId = $1',
        [cardId]
      );
      // check if card doesnt exist
      if (cardData.rowCount === 0) {
        return null;
      }
      // if card exists, update card
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardUpdateData = await db.query(
        'UPDATE cards_for_sale SET price = $2, condition = $3 WHERE id = $4',
        [req.body.card_price, req.body.card_description, cardId]
      );
      // get all cards
      const cardsData = await db.query('SELECT * FROM public.market_postings');
      res.locals.cards = cardsData.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in editCard middleware: ${err}`,
        status: 500,
        message: {
          e: 'An error occured when editing a card',
        },
      });
    }
  },
};
