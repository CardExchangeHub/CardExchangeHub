// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';

// import db from '../models/cardExHub';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models/cardModel');

export default {
  getCards: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const cardsQuery = 'SELECT * FROM cards_for_sale';
      const cardsData = await db.query(cardsQuery);
      res.locals.cards = cardsData.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in getCards middleware: ${err}`,
        status: 500,
        message: {
          e: 'An error occurred when querying the database for all cards',
        },
      });
    }
  },
  addCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardHolder = await db.query(
        'SELECT User.id FROM User WHERE User.id = $1',
        [req.body.id]
      );

      // check if user isnt found
      if (cardHolder.rowCount === 0) {
        return null;
      }

      // insert card into database
      const newCard = await db.query(
        'INSERT INTO cards_for_sale (name, price, condition,seller ) VALUES ($1,$2,$3, $4) RETURNING *',
        [
          req.body.card_name,
          req.body.card_price,
          req.body.card_description,
          cardHolder,
        ]
      );

      // check to see if card is already in the possible cards table
      const possibleCard = await db.query(
        'SELECT * FROM possible_cards WHERE id = $1',
        [newCard.rows[0].id]
      );

      // if card isnt in possible cards table, add it
      if (possibleCard.rowCount === 0) {
        const possibleCards = await db.query(
          'INSERT INTO possible_cards (id, name) VALUES ($1,$2) RETURNING *'
        );
      }

      // get all the cards
      const cardsData = await db.query('SELECT * FROM cards_for_sale');
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
      await db.query('DELETE FROM cards_for_sale WHERE id = $1', [
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
      const purchasedCard = await db.query(
        'SELECT * FROM cards_for_sale WHERE id = $1',
        [req.body.cardId]
      );
      const { condition, price, seller, name } = purchasedCard.rows[0];
      const newPurchase = await db.query(
        'INSERT INTO cards_purchased (buyer_id, condition, price, seller, name) VALUES ($1, $2, $3, $4, $5)',
        [req.body.buyerId, condition, price, seller, name]
      );
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
        'SELECT * FROM cards_for_sale WHERE id = $1',
        [cardId]
      );
      // check if card doesnt exist
      if (cardData.rowCount === 0) {
        return null;
      }
      // if card exists, update card
      const cardUpdateData = await db.query(
        'UPDATE cards_for_sale SET name = $1, price = $2, condition = $3 WHERE id = $4',
        [
          req.body.card_name,
          req.body.card_price,
          req.body.card_description,
          cardId,
        ]
      );
      // get all cards
      const cardsData = await db.query('SELECT * FROM cards_for_sale');
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
