import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import SellerDashboard from './SellerDashboard';

jest.mock('axios');

describe('Sell', () => {
  it('should fetch card data and sell the card', async () => {
    const mockCardData = [
      {
        id: '123',
        name: 'Mock Card',
        imageUrl: 'https://example.com/card.png',
      },
    ];

    const mockSellResponse = {
      status: 'success',
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockCardData });

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockSellResponse });

    const { getByText, getByTestId } = render(<SellerDashboard />);

    const searchInput = getByTestId('card-search-input');
    const searchButton = getByText('Search');
    const sellButton = getByText('Sell');

    userEvent.type(searchInput, 'Mock Card');

    userEvent.click(searchButton);

    await waitFor(() => {
      expect(getByText('Mock Card')).toBeInTheDocument();
    });

    const priceInput = getByTestId('card-price-input');
    userEvent.type(priceInput, '10');

    userEvent.click(sellButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('api/sell', {
        cardId: '123',
        price: 10,
      });
    });

    await waitFor(() => {
      expect(getByTestId('card-name')).not.toBeInTheDocument();
      expect(priceInput).toHaveValue(0);
    });
  });
});
