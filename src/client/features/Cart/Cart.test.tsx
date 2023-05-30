import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cart } from './Cart';
import userEvent from '@testing-library/user-event';

describe('Cart component', () => {
  it('should call checkout function when checkout button is clicked', () => {
    const checkoutMock = jest.fn();
    render(<Cart />);

    //find the checkout button on the screen
    const checkoutButton = screen.getByText('Checkout');

    //simulate button click
    userEvent.click(checkoutButton);

    //expect the checkout button to be clicked on once
    expect(checkoutMock).toHaveBeenCalledTimes(1);
  });
});
