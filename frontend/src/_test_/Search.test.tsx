import React from 'react';
import Search from '../components/Search';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('renders the input field for search', () => {
  const component = render(<Search onSearch={jest.fn()} />);
  const searchInput = component.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveAttribute('type', 'text');
});

test('accepts input value', () => {
  const { getByTestId } = render(<Search onSearch={jest.fn()} />);
  const searchInput = getByTestId('search-input');
  userEvent.type(searchInput, 'testsearch');
  expect(screen.getByTestId('search-input')).toHaveValue('testsearch');
});

test('renders the button for search', () => {
  const { getByTestId } = render(<Search onSearch={jest.fn()} />);
  const searchButton = getByTestId('button-for-search');
  expect(searchButton).toBeInTheDocument();
});
