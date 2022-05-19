import React from 'react';
import Sidebar from '../components/Sidebar';
//import AllFavorites from './AllFavorites';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import exp from 'constants';

test('renders the All Favorites Button', () => {
  const { getByTestId } = render(
    <Sidebar allVideos={[]} searchedList={[]} onVideoNameClick={jest.fn()} pageNumberChange={function (page: number): void {
      throw new Error('Function not implemented.');
    } } />
  );
  const allFavoritesButton = getByTestId('allfavorites-button');
  expect(allFavoritesButton).toBeInTheDocument();
});
