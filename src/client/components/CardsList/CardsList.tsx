import React, { useEffect, useState } from 'react';

interface Card {
  id: number;
  image: string;
  quality: string;
  marketPrice: number;
  sellerPrice: number;
}

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

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
    <>
      {cards.map((card) => (
        <div key={card.id}>
          <img src={card.image} alt="cards" />
          <p>Quality: {card.quality}</p>
          <p>Market Price: ${card.marketPrice}</p>
          <p>Seller Price: ${card.sellerPrice}</p>
          <button onClick={() => handleAddToCart(card.id)}>Add to Cart</button>
        </div>
      ))}
    </>
  );
};

export default CardsList;
