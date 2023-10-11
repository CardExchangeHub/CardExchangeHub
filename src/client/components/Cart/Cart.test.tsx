import React from 'react';
import { screen } from '@testing-library/react';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils';

describe('Cart component', () => {
  it('should display start shopping button and empty cart header when cart is empty', async () => {
    const checkoutMock = jest.fn();
    renderWithProviders(<Cart />);

    const startShoppingButton = await screen.findByText(/Start shopping/i);
    const emptyCartHeader = await screen.findByText(
      /Your cart is currently empty/i
    );
    expect(startShoppingButton).toBeInTheDocument();
    expect(emptyCartHeader).toBeInTheDocument();
  });
});
