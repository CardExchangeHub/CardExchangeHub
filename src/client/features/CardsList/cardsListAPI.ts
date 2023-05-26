import axios from 'axios';

export const fetchCards = async (currentPage: number) => {
    // const response = await axios.get(`https://api.pokemontcg.io/v1/cards?page=${currentPage}&pageSize=10`);
    // return response.json();
    const response = await axios.get(
      `api/cards?_page=${currentPage}&_limit=10`
    );
    return response.data;
}
