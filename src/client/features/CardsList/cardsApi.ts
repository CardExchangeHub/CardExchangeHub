import axios, { AxiosRequestConfig } from 'axios';
import { Card } from './cardsSlice';
import pokemon from 'pokemontcgsdk';

interface FetchCardsListParams {
  page: number;
  options: AxiosRequestConfig;
}

interface PostNewCardParams {
  userId: string;
  newCard: Card;
}

interface UpdateCardParams {
  cardId: string;
  card: Card;
}

// fetch cardslist - _page + _limit (in req.query) - returning limit of "next" 10 most recent cards
// depending on page number, sorted by date
export const fetchCardsList = async (
  { page, options }: FetchCardsListParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.get(`/card/?_page=${page}&_limit=10`, options);

    response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// UPDATE THIS TO REFLECT THE TCG API - https://pokemontcg.io/
// We will get data back, display it as we do in cards list, then on click it will populate the
// form within the seller dashboard - BACKEND TEAM DO NOT WORRY ABOUT THIS API CALL - Jeff
export const fetchCardFromPokeApi = async (pokemonName: string) => {
  const response = await pokemon.card.find(pokemonName);
  return response;
};

// post newCard - userId(req.params) + card (req.body) - return entire card
export const postNewCard = async (
  { userId, newCard }: PostNewCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.post(`/card/${userId}`, newCard);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// update card - cardId(req.params) + card (req.body) - return entire card
export const updateCard = async (
  { cardId, card }: UpdateCardParams,
  { rejectWithValue }
) => {
  try {
    const response = await axios.put(`/card/${cardId}`, card);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

// delete card - cardId(req.params) - return cardId
export const deleteCard = async (cardId: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/card/${cardId}`);
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
