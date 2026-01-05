import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';

// Mock AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

test('renders login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
});
