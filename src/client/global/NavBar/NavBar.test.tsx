import NavBar from './NavBar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar ', () => {
  it('renders NavBar component', () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    screen.debug();
    const logoElement = screen.getByText(/Card Xchange Hub/i);
    const loginLink = screen.getByText(/Log In/i);
    // const cartLink = screen.getByTitle(/Cart/i);

    expect(logoElement).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    // expect(cartLink).toBeInTheDocument();
  });
});
