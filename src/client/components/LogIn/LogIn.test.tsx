import LogIn, { LoginUser } from './LogIn';
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
  // it('should submit correct form data', async () => {
  //   const mockLoginUser = jest.spyOn(LoginUser, 'LoginUser'); // Spy on the LoginUser function
  //   mockLoginUser.mockImplementation(() => Promise.resolve(true)); // Mock the LoginUser function to return a resolved Promise
  //   render(<LogIn />, { wrapper: MemoryRouter });
  //   const emailInput = screen.getByLabelText('Email');
  //   const passwordInput = screen.getByLabelText('Password');
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });
  //   await userEvent.type(emailInput, 'test@example.com');
  //   await userEvent.type(passwordInput, 'password123');
  //   await userEvent.click(submitButton);
  //   // Expectations
  //   expect(mockLoginUser).toHaveBeenCalledTimes(1);
  //   expect(mockLoginUser).toHaveBeenCalledWith(
  //     {
  //       email: 'test@example.com',
  //       password: 'password123',
  //     },
  //     expect.any(Function)
  //   );
  // });
});
