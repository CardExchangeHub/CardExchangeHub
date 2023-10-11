// import LogIn, { LoginUser } from './LogIn';
import LogIn from './LogIn';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('LogIn test for rendering/navigating', () => {
  beforeEach(() => {
    render(<LogIn />, { wrapper: MemoryRouter });
  });
  it('renders LogIn component', () => {
    expect(screen.getByText('Log In With Email')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
