import React, { useState } from 'react';
import axios from 'axios';

interface Card {
  id: string;
  name: string;
  imageUrl: string;
}

interface Price {
  cardId: string;
  price: number;
}

const SellerDashboard: React.FC = () => {
  const [cardName, setCardName] = useState('');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState('');

  const handleSearch = async () => {
    try {
      // Fetch card data from TCG API using cardName
      const response = await axios.get(`TCG api`, {
        params: {
          name: cardName,
        },
      });

      const data = response.data;

      // Assuming the API response returns an array of cards, select the first one
      if (data && data.length > 0) {
        const card = data[0];
        setSelectedCard(card);
      } else {
        setSelectedCard(null);
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  const handleSell = async () => {
    if (selectedCard) {
      const sellData = {
        cardId: selectedCard.id,
        quality: quality,
        price: price,
      };

      try {
        // Make POST request to store card to be sold in the database
        await axios.post('api/sell', sellData);

        // Reset the selected card and price after successful sell
        setSelectedCard(null);
        setPrice(0);
      } catch (error) {
        console.error('Error selling card:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {selectedCard && (
        <div>
          <h3>{selectedCard.name}</h3>
          <img src={selectedCard.imageUrl} alt={selectedCard.name} />
          <label for="quality">Quality:</label>
          <select value={quality} onChange={(e) => setQuality(e.target.value)}>
            <option value="Mint">Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Played">Played</option>
          </select>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <button onClick={handleSell}>Sell</button>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
