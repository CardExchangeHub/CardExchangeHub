import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App test', () => {
  let app;
  beforeEach(() => {
    app = render(<App />, { wrapper: BrowserRouter });
  });

  it('should render App component', () => {
    expect(app.getByText(/Hi! This is homepage/i)).toBeInTheDocument();
  });
});
