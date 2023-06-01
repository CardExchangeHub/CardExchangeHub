// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';

// import db from '../models/cardExHub';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import db from '../models/cardModel.mjs';

export default {
  // currently working on. need to add cards to test this.
  getCardsForSale: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const cardsQuery =
        'SELECT * FROM "public.market_postings" WHERE sold = ($1)';
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
        'SELECT id FROM "public.Users" WHERE id = $1',
        [req.params.id]
      );
      console.log('cardHolder', cardHolder.rows[0].id);
      // check if user isnt found
      if (cardHolder.rowCount === 0) {
        console.log('user not found');
        return null;
      }
      console.log('pass check if user');
      // insert card into database
      const newCard = await db.query(
        'INSERT INTO "public.market_postings" (price, condition,seller,"cardId" ) VALUES ($1,$2,$3, $4) RETURNING *',
        [
          req.body.card_price,
          req.body.card_description,
          cardHolder.rows[0].id,
          req.body.cardId,
        ]
      );

      // get all the cards
      const cardsData = await db.query(
        'SELECT * FROM "public.market_postings"'
      );
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
      await db.query('DELETE FROM "public.market_postings" WHERE id = $1', [
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
    console.log(req.params.id);
    try {
      if (
        (await (
          await db.query(
            'SELECT * FROM "public.market_postings" WHERE sold = $1 AND id = $2',
            [true, req.params.id]
          )
        ).rowCount) !== 0
      ) {
        console.log('sold');
        return next();
      }
      const newPurchase = await db.query(
        'UPDATE "public.market_postings" SET sold = $1, buyer = $2 WHERE id = $3 RETURNING *',
        [true, req.body.buyer, req.params.id]
      );
      res.locals.newPurchase = newPurchase.rows[0];
      return next();
    } catch (err) {
      return next({
        log: `Error in purchase middleware: ${err}`,
        status: 500,
        message: {
          e: 'An error occured when purchase a card',
        },
      });
    }
  },
  editCard: async (req: Request, res: Response, next: NextFunction) => {
    // cardID is provided in request parameters
    const idOfCard = req.params.id;
    try {
      // query existing card
      const cardData = await db.query(
        'SELECT * FROM "public.market_postings" WHERE id = $1',
        [idOfCard]
      );
      // check if card doesnt exist
      if (cardData.rowCount === 0) {
        return null;
      }
      // if card exists, update card
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cardUpdateData = await db.query(
        'UPDATE "public.market_postings" SET price = $1, condition = $2 WHERE id = $3',
        [req.body.card_price, req.body.card_description, idOfCard]
      );
      // get all cards
      const cardsData = await db.query(
        'SELECT * FROM "public.market_postings"'
      );
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
