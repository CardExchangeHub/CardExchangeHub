import React from 'React';
import { render } from '@testing-library/react';

import App from './App';

describe('App test', () => {
  let app;
  beforeEach(() => {
    app = render(<App />);
  });

  it('should render App component', () => {
    expect(app.getByText(/Hello World/i)).toBeInTheDocument();
  })
});