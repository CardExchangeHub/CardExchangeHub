import cardsReducer, { CardsState, pageNumberUpdated } from './cardsSlice';

describe('cards reducer', () => {
  const initialState: CardsState = {
    cardsList: [
      {
        id: 3,
        images: {
          small: 'small',
          large: 'large',
        },
        cartQuantity: 1,
        quality: 'good',
        marketPrice: 5,
        sellerPrice: 10,
        dateAdded: '5/5/2021',
      },
    ],
    page: 1,
    hasNextPage: false,
    status: 'idle',
    error: null,
  };
  it('should handle initial cards state', () => {
    expect(cardsReducer(undefined, { type: 'unknown' })).toEqual({
      cardsList: [],
      page: 1,
      hasNextPage: true,
      status: 'idle',
      error: null,
    });
  });
  it('should update page number', () => {
    const { page } = cardsReducer(initialState, pageNumberUpdated());
    expect(page).toEqual(2);
  });
});
