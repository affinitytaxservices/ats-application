import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../components/auth/Register';

// Mock AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn(),
  }),
}));

test('renders register page', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
});
