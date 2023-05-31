import NavBar from './NavBar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar ', () => {
  it('renders NavBar component', () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    const logoElement = screen.getByText('Card Xchange Hub');
    const loginLink = screen.getByText('Log In');
    const cartLink = screen.getByTitle('Cart');

    expect(logoElement).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});
