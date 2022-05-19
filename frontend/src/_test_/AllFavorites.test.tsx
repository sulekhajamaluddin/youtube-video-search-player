import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllFavoritesButton from '../components/AllFavorites';

test('button click works properly', () => {
  const favoriteVideos = [
    {
      etag: 'etag1',
      id: {
        kind: 'kind1',
        name: 'hello',
        videoId: 'videoId1',
      },
      kind: 'kind1a',
    },
    {
      etag: 'etag2',
      id: {
        kind: 'kind2',
        name: 'hai',
        videoId: 'videoId2',
      },
      kind: 'kind2a',
    },
  ];

  const testFunction = jest.fn();
  const { getByTestId } = render(
    <AllFavoritesButton
      handleFavoritesButtonClick={testFunction}
      favoriteVideos={favoriteVideos}
    />
  );
  const allFavoritesButton = getByTestId('allfavorites-button');
  fireEvent.click(allFavoritesButton);
  expect(testFunction).toBeCalledWith(favoriteVideos);
  const testElement = screen.getByText(/hello/i);
  expect(testElement).toBeInTheDocument;
});
