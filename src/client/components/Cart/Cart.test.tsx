import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from './Cart';

describe('Cart component', () => {
  it('should call checkout function when checkout button is clicked', () => {
    const checkoutMock = jest.fn();
    render(<Cart onCheckout={checkoutMock} />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(checkoutMock).toHaveBeenCalledTimes(1);
  });
});
