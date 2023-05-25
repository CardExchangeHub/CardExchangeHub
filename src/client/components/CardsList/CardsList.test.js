import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './CardsList';

describe('CardsList', () => {
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

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCards),
      })
    );

    render(<CardsList />);

    await screen.findByText('Quality: Excellent');

    // Mock the console.log function
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Simulate button click
    fireEvent.click(screen.getByText('Add to Cart'));

    //expect the console log to equal to the correct output string
    expect(consoleSpy).toHaveBeenCalledWith('card 1 added to cart');
  });
});
