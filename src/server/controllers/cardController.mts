import { Request, Response, NextFunction } from 'express';
import db from '../models/cardModel.mjs';

export default {
  //get all cards currently for sale
  //sort by date
  //only get [req.params.page *10, req.params.page + 10]
  getCardsForSale: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let cardStart = Number(req.params.page) * 10;
      let cardEnd = cardStart + 10;
      const cardsQuery =
        'SELECT * FROM "public.market_postings" WHERE sold = ($1) ORDER BY date DESC OFFSET $2 LIMIT $3';
      const cardsForSale = await db.query(cardsQuery, [
        false,
        cardStart,
        cardEnd,
      ]);

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
      const user = res.locals.user;
      if (!user) {
        return next({
          log: 'user not found',
          status: 500,
          message: { e: 'user not found' },
        });
      } else {
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

        res.locals.newCard = newCard.rows[0];
        return next();
      }
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
      const user = res.locals.user;
      if (!user) {
        return next({
          log: 'user not found',
          status: 500,
          message: { e: 'user not found' },
        });
      } else {
        const deletedCard = await db.query(
          'DELETE FROM "public.market_postings" WHERE id = $1 RETURNING *',
          [req.params.id]
        );
        res.locals.deletedCard = deletedCard.rows[0];
        return next();
      }
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
      const user = res.locals.user;
      if (!user) {
        return next({
          log: 'user not found',
          status: 500,
          message: { e: 'user not found' },
        });
      } else {
        const card = await db.query(
          'SELECT * FROM "public.market_postings" WHERE sold = $1 AND id = $2',
          [true, req.params.id]
        );

        if (card.rows.length === 0) {
          console.log('card already sold');
          return next();
        }
        const newPurchase = await db.query(
          'UPDATE "public.market_postings" SET sold = $1, buyer = $2 WHERE id = $3 RETURNING *',
          [true, req.body.buyer, req.params.id]
        );
        res.locals.newPurchase = newPurchase.rows[0];
        return next();
      }
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
      const user = res.locals.user;
      if (!user) {
        return next({
          log: 'user not found',
          status: 500,
          message: { e: 'user not found' },
        });
      } else {
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
      }
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
