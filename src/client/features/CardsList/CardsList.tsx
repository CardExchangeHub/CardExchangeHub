import React, { useEffect, useState } from 'react';
import {
  getCardsListStart,
  getCardsListSuccess,
  getCardsListFailure,
  selectCards,
} from './cardsListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

interface Card {
  id: number;
  image: string;
  quality: string;
  marketPrice: number;
  sellerPrice: number;
}

const CardsList: React.FC = () => {
  //mockCards for development only, will delete once api is setup
  const mockCards = [
    {
      id: 1,
      image: 'https://product-images.tcgplayer.com/fit-in/874x874/84918.jpg',
      quality: 'Excellent',
      marketPrice: 100,
      sellerPrice: 80,
    },
    {
      id: 2,
      image: 'https://product-images.tcgplayer.com/fit-in/874x874/84918.jpg',
      quality: 'Excellent',
      marketPrice: 100,
      sellerPrice: 80,
    },
    {
      id: 3,
      image: 'https://product-images.tcgplayer.com/fit-in/874x874/84918.jpg',
      quality: 'Excellent',
      marketPrice: 100,
      sellerPrice: 80,
    },
  ];
  const [cards, setCards] = useState<Card[]>(mockCards);
  // const cards = useAppSelector(selectCards);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('api/cards');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  const handleAddToCart = (cardId: number) => {
    // Add item to cart logic
    console.log(`card ${cardId} added to cart`);
  };

  return (
    <div className="flex justify-evenly flex-wrap max-w-screen-3xl mx-16 rounded-[50px] border-dotted border-white border-2">
      {cards.map((card) => (
        <div className="cards-container" key={card.id}>
          <img className="w-60 rounded-xl" src={card.image} alt="cards" />
          <p className="m-1 font-light">Quality: {card.quality}</p>
          <p className="m-1 font-light">Market Price: ${card.marketPrice}</p>
          <p className="m-1 font-light">Seller Price: ${card.sellerPrice}</p>
          <button
            className="add-cart-btn"
            onClick={() => handleAddToCart(card.id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardsList;
