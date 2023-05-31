import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../utils/test-utils';
import CardsList from './CardsList';
import { BrowserRouter } from 'react-router-dom';

describe('CardsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('redux-persist/integration/react', () => ({
      PersistGate: ({ children }) => <div>{children}</div>,
    }));
  });

  test('renders cards on screen', async () => {
    await renderWithProviders(<CardsList />, { wrapper: BrowserRouter });
    screen.debug();
    // Example of interacting with the component and asserting the changes
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
