import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCardsList, postNewCard, fetchCardFromPokeApi } from './cardsApi';

export interface Card {
  id: number;
  image: string;
  quality: string;
  marketPrice: number;
  sellerPrice: number;
  dateAdded: string;
  cartQuantity: number;
}

export interface CardsState {
  cardsList: Card[];
  sellerCardsList: Card[];
  cardsListBySearch: Card[];
  page: number;
  hasNextPage: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
}

const initialState: CardsState = {
  cardsList: [],
  sellerCardsList: [],
  cardsListBySearch: [],
  page: 1,
  hasNextPage: true,
  status: 'idle',
  error: null,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', fetchCardsList);
export const fetchCardBySearch = createAsyncThunk(
  'cards/fetchCardBySearch',
  fetchCardFromPokeApi
);
export const addNewCard = createAsyncThunk('cards/addNewCard', postNewCard);

export const cardsListSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    pageNumberUpdated: (state) => {
      state.page += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cardsList = state.cardsList.concat(action.payload);
        state.hasNextPage = Boolean(action.payload.length);
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCardBySearch.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCardBySearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cardsListBySearch = action.payload;
      })
      .addCase(fetchCardBySearch.rejected, (state, action) => {
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

export const { pageNumberUpdated } = cardsListSlice.actions;

export default cardsListSlice.reducer;
