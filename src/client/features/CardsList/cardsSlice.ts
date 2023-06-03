import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  fetchCardsList,
  postCardToSell,
  fetchCardFromPokeApi,
  updateCard,
  deleteCard,
  fetchSellerCardsList,
} from './cardsApi';

export interface CardFromSearch {
  cardId: string;
  image: string;
  quality?: string;
  marketPrice: string | number | null;
  sellerPrice?: number;
  dateAdded?: string;
  cartQuantity?: number;
}

export interface CardForSale {
  cardId: string;
  image: string;
  quality: string;
  marketPrice: string | number | null;
  sellerPrice: number;
  dateAdded: string;
  cartQuantity: number;
}

export interface CardsState {
  cardsList: CardForSale[];
  sellerCardsList: CardForSale[];
  cardsListBySearch: CardFromSearch[];
  cardToSell: CardFromSearch;
  searchModalView: boolean;
  cardFormModalView: boolean;
  page: number;
  hasNextPage: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
}

const initialState: CardsState = {
  cardsList: [],
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

export const fetchCards = createAsyncThunk('cards/fetchCards', fetchCardsList);

export const fetchSellerCards = createAsyncThunk(
  'cards/fetchSellerCards',
  fetchSellerCardsList
);

export const fetchCardBySearch = createAsyncThunk(
  'cards/fetchCardBySearch',
  fetchCardFromPokeApi
);

export const sellCard = createAsyncThunk('cards/addNewCard', postCardToSell);

export const updateSellerCard = createAsyncThunk(
  'cards/updateSellerCard',
  updateCard
);

export const deleteSellerCard = createAsyncThunk(
  'cards/deleteSellerCard',
  deleteCard
);

export const cardsListSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    pageNumberUpdated: (state) => {
      state.page += 1;
    },
    toggleSearchModalView: (state) => {
      if (state.searchModalView) {
        state.status = 'idle';
        state.error = null;
      }
      state.searchModalView = !state.searchModalView;
    },
    clearCardsListBySearch: (state) => {
      state.cardsListBySearch = [];
    },
    setCardToSell: (state, action) => {
      state.cardToSell = {
        cardId: action.payload.id,
        image: action.payload.image,
        marketPrice: action.payload.marketPrice,
      };
      state.cardFormModalView = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.length) {
          const data = action.payload.map((card) => {
            const num = Math.random() * 500;
            return {
              cardId: card.cardId,
              image: card.image,
              quality: card.condition,
              sellerPrice: card.price,
              marketPrice: parseInt(num.toString()),
              dateAdded: card.date,
            };
          });
          // state.cardsList = state.cardsList.concat(action.payload);
          state.cardsList = state.cardsList.concat(data);
        }
        state.hasNextPage = Boolean(action.payload.length);
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSellerCards.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerCardsList = action.payload;
      })
      .addCase(fetchSellerCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCardBySearch.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCardBySearch.fulfilled, (state, action) => {
        if (!action.payload.length) {
          state.status = 'failed';
          state.error = 'No cards found';
          return;
        }
        state.status = 'succeeded';
        state.cardsListBySearch = action.payload.map((card: any) => {
          return {
            id: card.id,
            marketPrice: card?.cardmarket?.prices?.averageSellPrice || null,
            image: card.images.small,
          };
        });
      })
      .addCase(fetchCardBySearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sellCard.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(sellCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerCardsList = state.sellerCardsList.concat(action.payload);
        state.cardFormModalView = false;
        state.cardToSell = initialState.cardToSell;
      })
      .addCase(sellCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSellerCard.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateSellerCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerCardsList = state.sellerCardsList.map((card) => {
          if (card.cardId === action.payload.id) {
            return action.payload;
          }
          return card;
        });
      })
      .addCase(updateSellerCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSellerCard.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteSellerCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerCardsList = state.sellerCardsList.filter(
          (card) => card.cardId !== action.payload.id
        );
      })
      .addCase(deleteSellerCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllCards = (state: RootState) => state.cards.cardsList;
export const selectStatus = (state: RootState) => state.cards.status;
export const selectCurrentPage = (state: RootState) => state.cards.page;
export const selectError = (state: RootState) => state.cards.error;
export const selectHasNextPage = (state: RootState) => state.cards.hasNextPage;
export const selectSellerCards = (state: RootState) =>
  state.cards.sellerCardsList;
export const selectCardsBySearch = (state: RootState) =>
  state.cards.cardsListBySearch;
export const selectSearchModalView = (state: RootState) =>
  state.cards.searchModalView;
export const selectCardFormModalView = (state: RootState) =>
  state.cards.cardFormModalView;
export const selectCardToSell = (state: RootState) => state.cards.cardToSell;

export const {
  pageNumberUpdated,
  toggleSearchModalView,
  clearCardsListBySearch,
  setCardToSell,
} = cardsListSlice.actions;

export default cardsListSlice.reducer;
