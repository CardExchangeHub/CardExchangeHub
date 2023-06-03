import React from 'react';
import { screen } from '@testing-library/react';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils';

describe('Cart component', () => {
  it('should display start shopping button and empty cart header when cart is empty', async () => {
    const checkoutMock = jest.fn();
    renderWithProviders(<Cart />);

    //find the checkout button on the screen
    const startShoppingButton = await screen.findByText(/Start shopping/i);
    // //simulate button click
    // userEvent.click(startShoppingButton);
    const emptyCartHeader = await screen.findByText(
      /Your cart is currently empty/i
    );
    //expect the checkout button to be clicked on once
    // expect(checkoutMock).toHaveBeenCalledTimes(1);
    expect(startShoppingButton).toBeInTheDocument();
    expect(emptyCartHeader).toBeInTheDocument();
  });
  it('should display cart items when cart is not empty', async () => {
    const preloadedState = {
      cart: {
        cartItems: [
          {
            id: '1',
            image: 'string',
            cartQuantity: 1,
            quality: 'new',
            sellerPrice: 10,
            marketPrice: 10,
            dateAdded: '5/5/2021',
          },
        ],
        cartTotalAmount: 10,
        cartTotalQuantity: 1,
        _persist: {
          version: -1,
          rehydrated: true,
        },
      },
    };
    renderWithProviders(<Cart />, { preloadedState });

    const subtotal = await screen.findByText(/Subtotal:/i);
    screen.debug();
    expect(subtotal).toBeInTheDocument();
  });
});

//  preloadedState: {
//         cart: {
//           _persist: {
//             version: -1,
//             rehydrated: true,
//           },
//           cartItems: [
//             {
//               id: 1,
//               images: {
//                 small: 'image',
//                 large: 'image',
//               },
//               cartQuantity: 1,
//               quality: 'new',
//               sellerPrice: 10,
//               marketPrice: 10,
//               dateAdded: '5/5/2021',
//             },
//           ],
//           cartTotalAmount: 10,
//           cartTotalQuantity: 1,
//         },
