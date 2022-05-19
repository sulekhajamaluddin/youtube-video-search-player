import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchButton from '../components/SearchButton';

test('button click works properly', () => {
  const testFunction = jest.fn();
  const { getByTestId } = render(<SearchButton handleSubmit={testFunction} />);
  const searchButton = getByTestId('button-for-search');
  fireEvent.click(searchButton);
  expect(testFunction).toBeCalled();
});
