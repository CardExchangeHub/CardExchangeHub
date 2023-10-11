import axios, { AxiosRequestConfig } from 'axios';
import { CardForSale } from './cardsSlice';
import pokemon from 'pokemontcgsdk';

interface FetchCardsListParams {
  page: number;
  options: AxiosRequestConfig;
}

interface PostNewCardParams {
  userId: string;
  newCard: {
    cardId: string;
    image: string;
    quality: string;
    quantity: number;
    marketPrice: string | number | null;
    sellerPrice: number;
  };
}

interface UpdateCardParams {
  cardId: string;
  card: CardForSale;
}

interface SellerParams {
  userId: string;
  options: AxiosRequestConfig;
}

export const fetchCardsList = async (
  { page, options }: FetchCardsListParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.get(`/card/?_page=${page}&_limit=10`, options);
    console.log('fetchCardsData', response.data);
    return response.data;
  } catch (error) {
    console.log('fetchCardsError', error);
    return rejectWithValue(error.response.data);
  }
};

export const fetchSellerCardsList = async (
  { userId, options }: SellerParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.get(`/card/${userId}`, options);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchCardFromPokeApi = async (pokemonName: string) => {
  const response = await pokemon.card.where({
    q: `name:${pokemonName}`,
  });
  return response.data;
};

export const postCardToSell = async (
  { userId, newCard }: PostNewCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.post(`/card/${userId}`, newCard);
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return rejectWithValue(error.response.data);
  }
};

export const updateCard = async (
  { cardId, card }: UpdateCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.put(`/card/${cardId}`, card);
    console.log('responseupdatecards', response.data.rows);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteCard = async (cardId: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/card/${cardId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};
