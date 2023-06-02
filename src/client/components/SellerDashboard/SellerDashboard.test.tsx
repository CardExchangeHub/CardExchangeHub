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

    // Mock the axios.get function to return mock card data
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockCardData });

    // Mock the axios.post function to return a mock sell response
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockSellResponse });

    const { getByText, getByTestId } = render(<SellerDashboard />);

    const searchInput = getByTestId('card-search-input');
    const searchButton = getByText('Search');
    const sellButton = getByText('Sell');

    // Type 'Mock Card' into the search input
    userEvent.type(searchInput, 'Mock Card');

    // Click the search button
    userEvent.click(searchButton);

    // Expect the card name to be displayed
    await waitFor(() => {
      expect(getByText('Mock Card')).toBeInTheDocument();
    });

    // Type '10' into the price input
    const priceInput = getByTestId('card-price-input');
    userEvent.type(priceInput, '10');

    // Click the sell button
    userEvent.click(sellButton);

    // Expect the axios.post function to be called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('api/sell', {
        cardId: '123',
        price: 10,
      });
    });

    // Expect the selected card and price to be reset
    await waitFor(() => {
      expect(getByTestId('card-name')).not.toBeInTheDocument();
      expect(priceInput).toHaveValue(0);
    });
  });
});
