import { Request, Response, NextFunction } from 'express';
import db from '../models/cardModel.mjs';

export default {
  //get all cards currently for sale
  //sort by date
  getCardsForSale: async (req: Request, res: Response, next: NextFunction) => {
    const { _page, _limit } = req.query;
    try {
      //subtract 1 from page number so that page 1 starts at index 0. Else cardStart would be 10
      //and we wouldn't receive cards 0-10.
      let cardStart = (Number(_page) - 1) * 10;
      const cardsQuery =
        'SELECT * FROM "public.market_postings" WHERE sold = ($1) ORDER BY date DESC OFFSET $2 LIMIT $3';
      const cardsForSale = await db.query(cardsQuery, [
        false,
        cardStart,
        _limit,
      ]);

      res.locals.cards = cardsForSale.rows;
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
      console.log('req.body', req.body);
      //const user = res.locals.user;
      // @ts-ignore
      const userID = req.user.id;
      if (!userID) {
        return next({
          log: 'user not found',
          status: 401,
          message: { e: 'user not found' },
        });
        //need to verify that user is the card holder
      }

      // insert card into database
      const newCard = await db.query(
        'INSERT INTO "public.market_postings" (price, condition,seller,"cardId", "image" ) VALUES ($1,$2,$3, $4,$5) RETURNING *',
        [
          req.body.sellerPrice,
          req.body.quality,
          userID,
          req.body.cardId,
          req.body.image,
        ]
      );
      res.locals.newCard = newCard.rows[0];
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
      const userID = 10;
      if (!userID) {
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
        //check if user is card holder
        if (userID !== deletedCard.rows[0].id) {
          console.log('user not card holder');
          return next();
        }
        res.locals.deletedCardId = deletedCard.rows[0].id;
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
        //check if user is card holder
        if (user.id !== cardData.rows[0].id) {
          console.log('user not card holder');
          return next();
        }

        // if card exists, update card
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cardUpdateData = await db.query(
          'UPDATE "public.market_postings" SET price = $1, condition = $2 WHERE id = $3',
          [req.body.card_price, req.body.quality, idOfCard]
        );

        res.locals.cards = cardUpdateData.rows[0];
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
