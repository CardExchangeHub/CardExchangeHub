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

// fetch cardslist - _page + _limit (in req.query) - returning limit of "next" 10 most recent cards
// depending on page number, sorted by date
export const fetchCardsList = async (
  { page, options }: FetchCardsListParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.get(
      `api/card/?_page=${page}&_limit=10`,
      options
    );
    console.log('fetchCardsData', response.data);
    return response.data;
  } catch (error) {
    console.log('fetchCardsError', error);
    return rejectWithValue(error.response.data);
  }
};

// fetch seller cards - userId(req.params) - return all cards for seller
export const fetchSellerCardsList = async (
  { userId, options }: SellerParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.get(`api/card/${userId}`, options);
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

// post newCard - userId(req.params) + card (req.body) - return entire card
export const postCardToSell = async (
  { userId, newCard }: PostNewCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.post(`api/card/${userId}`, newCard);
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return rejectWithValue(error.response.data);
  }
};

// update card - cardId(req.params) + card (req.body) - return entire card
export const updateCard = async (
  { cardId, card }: UpdateCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.put(`api/card/${cardId}`, card);
    console.log('responseupdatecards', response.data.rows);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// delete card - cardId(req.params) - return cardId
export const deleteCard = async (cardId: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`api/card/${cardId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// TEST DATA
// let cards;
// cards = await new Promise((resolve, reject) => {
//   resolve([
//     {
//       id: 1,
//       quality: 'mint',
//       marketPrice: 10,
//       sellerPrice: 20,
//       dateAdded: '5/5/2021',
//       images: {
//         small:
//           'https://product-images.tcgplayer.com/fit-in/874x874/246758.jpg',
//         large: 'Blastoise',
//       },
//     },
//     {
//       id: 2,
//       quality: 'mint',
//       marketPrice: 10,
//       sellerPrice: 20,
//       dateAdded: '5/5/2021',
//       images: {
//         small:
//           'https://product-images.tcgplayer.com/fit-in/874x874/277014.jpg',
//         large: 'Blastoise',
//       },
//     },
//   ]);
//   // reject([
//   //   {
//   //     id: 1,
//   //     images: {
//   //       small:
//   //         'https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891763-006charizard.png',
//   //       large: 'Blastoise',
//   //     },
//   //   },
//   //   {
//   //     id: 2,
//   //     images: {
//   //       small:
//   //         'https://mir-s3-cdn-cf.behance.net/project_modules/fs/41f2ae115606005.6051ca43c30bd.jpg',
//   //       large: 'Blastoise',
//   //     },
//   //   },
//   // ]);
// });
// return cards.data;
