import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardsList from './CardsList';
import 'whatwg-fetch';

describe('CardsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handle click functionality', async () => {
    const mockCards = [
      {
        id: 1,
        image: 'card1.jpg',
        quality: 'Excellent',
        marketPrice: 100,
        sellerPrice: 80,
      },
    ];

    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCards),
      })
    );

    render(<CardsList />);

    const qualitySummary = await screen.findByText('Quality: Excellent');

    // Mock the console.log function
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Simulate button click
    await userEvent.click(screen.getByText('Add to Cart'));

    //expect the console log to equal to the correct output string
    expect(consoleSpy).toHaveBeenCalledWith('card 1 added to cart');
    expect(qualitySummary).toBeInTheDocument();
  });
});
