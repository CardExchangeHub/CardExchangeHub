import cardsReducer, { CardsState, pageNumberUpdated } from './cardsSlice';

describe('cards reducer', () => {
  const initialState: CardsState = {
    cardsList: [
      {
        cardId: '3',
        image: 'string',
        cartQuantity: 1,
        condition: 'good',
        marketPrice: 5,
        seller: 10,
        date: '5/5/2021',
      },
    ],
    sellerCardsList: [],
    cardsListBySearch: [],
    cardToSell: {
      cardId: '',
      image: '',
      marketPrice: '',
    },
    searchModalView: false,
    cardFormModalView: false,

    page: 1,
    hasNextPage: true,
    status: 'idle',
    error: null,
  };
  it('should handle initial cards state', () => {
    expect(cardsReducer(undefined, { type: 'unknown' })).toEqual({
      cardsList: [],
      sellerCardsList: [],
      searchModalView: false,
      cardFormModalView: false,
      cardsListBySearch: [],
      cardToSell: {
        id: '',
        image: '',
        marketPrice: '',
      },
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
