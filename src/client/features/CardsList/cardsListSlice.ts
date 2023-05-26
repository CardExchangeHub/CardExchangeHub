import {createSlice} from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { create } from 'domain';
import { fetchCards } from './cardsListAPI';

export interface CardsState {
    cardsList: any[];
    loading: boolean;
    error: null | string;
}

const initialState: CardsState = {
    cardsList: [],
    loading: false,
    error: null,
};

export const cardsListSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCardsListStart: (state) => {
            state.loading = true;
        },
        getCardsListSuccess: (state, action) => {
            state.cardsList = action.payload;
            state.loading = false;
        },
        getCardsListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {getCardsListStart, getCardsListSuccess, getCardsListFailure} = cardsListSlice.actions;

const fetchCardsList = (currentPage: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await fetchCards(currentPage);
        dispatch(getCardsListSuccess(response));
    }
};

export const selectCards = (state: RootState) => state.cards.cardsList;

export default cardsListSlice.reducer;