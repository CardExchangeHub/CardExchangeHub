import axios, { AxiosRequestConfig } from 'axios';
import { Card } from './cardsSlice';
import pokemon from 'pokemontcgsdk';
interface FetchCardsListParams {
  page: number;
  options: AxiosRequestConfig;
}
export const fetchCardsList = async (
  { page, options }: FetchCardsListParams,
  { rejectWithValue }
) => {
  try {
    let cards;
    cards = await new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          quality: 'mint',
          marketPrice: 10,
          sellerPrice: 20,
          dateAdded: '5/5/2021',
          images: {
            small:
              'https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891763-006charizard.png',
            large: 'Blastoise',
          },
        },
        {
          id: 2,
          quality: 'mint',
          marketPrice: 10,
          sellerPrice: 20,
          dateAdded: '5/5/2021',
          images: {
            small:
              'https://mir-s3-cdn-cf.behance.net/project_modules/fs/41f2ae115606005.6051ca43c30bd.jpg',
            large: 'Blastoise',
          },
        },
      ]);
      // reject([
      //   {
      //     id: 1,
      //     images: {
      //       small:
      //         'https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891763-006charizard.png',
      //       large: 'Blastoise',
      //     },
      //   },
      //   {
      //     id: 2,
      //     images: {
      //       small:
      //         'https://mir-s3-cdn-cf.behance.net/project_modules/fs/41f2ae115606005.6051ca43c30bd.jpg',
      //       large: 'Blastoise',
      //     },
      //   },
      // ]);
    });
    // return cards.data;
    return cards;
  } catch (error) {
    return rejectWithValue(error.response.data);
    //   return response.data;
  }
};

export const postNewCard = async (newCard: Card) => {
  const response = await axios.post('api/cards', newCard);
  return response.data;
};
