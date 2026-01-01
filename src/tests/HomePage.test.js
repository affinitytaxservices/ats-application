import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../components/home/HomePage';

// Mock SEOHelmet
jest.mock('../components/common/SEOHelmet', () => {
  return function DummySEOHelmet({ title }) {
    return <title>{title}</title>;
  };
});

test('renders home page without crashing', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
});
