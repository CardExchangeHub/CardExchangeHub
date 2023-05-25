// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';

// import db from '../models/cardExHub';

const db = require('../models/cardExHub');

module.exports = {
  getCards: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardsQuery = 'SELECT * FROM cards_for_sale';
      const cardsData = await db.query(cardsQuery);
      res.locals.cards = cardsData.rows;
      next();
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
};
