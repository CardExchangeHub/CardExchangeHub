import LogOut from './LogOut';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('test for log out page', () => {
  it('renders LogOut component', () => {
    render(<LogOut />, { wrapper: MemoryRouter });
    expect(screen.getByText('Logged out!')).toBeInTheDocument();
  });
});
