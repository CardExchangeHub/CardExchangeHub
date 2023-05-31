import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils';
import CardsList from './CardsList';

describe('CardsList', () => {
  // handle intersection observer mock
  const observerMap = new Map();
  const instanceMap = new Map();

  beforeEach(() => {
    // @ts-ignore
    global.IntersectionObserver = jest.fn((cb, options = {}) => {
      const instance = {
        thresholds: Array.isArray(options.threshold)
          ? options.threshold
          : [options.threshold],
        root: options.root,
        rootMargin: options.rootMargin,
        observe: jest.fn((element: Element) => {
          instanceMap.set(element, instance);
          observerMap.set(element, cb);
        }),
        unobserve: jest.fn((element: Element) => {
          instanceMap.delete(element);
          observerMap.delete(element);
        }),
        disconnect: jest.fn(),
      };
      return instance;
    });
  });

  afterEach(() => {
    // @ts-ignore
    global.IntersectionObserver.mockReset();
    instanceMap.clear();
    observerMap.clear();
  });

  test('renders cards on screen', async () => {
    renderWithProviders(<CardsList />);

    const quality = await screen.findAllByText(/Quality:/i);
    const marketPrice = await screen.findAllByText(/Market Price:/i);
    const sellerPrice = await screen.findAllByText(/Seller Price:/i);
    const button = await screen.findAllByRole('button', {
      name: /Add to Cart/,
    });

    expect(quality[0]).toBeInTheDocument();
    expect(marketPrice[0]).toBeInTheDocument();
    expect(sellerPrice[0]).toBeInTheDocument();
    expect(button[0]).toBeInTheDocument();
  });
});
