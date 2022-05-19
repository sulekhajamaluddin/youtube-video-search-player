import React from 'react';
import { Videos } from '../App';
export type AllFavoritesProps = {
  handleFavoritesButtonClick: (favoriteVideos: Videos[]) => void;
  favoriteVideos: Videos[];
};

// The All Favorites Button that calls the handleFavoritesButtonClick function in the Sidebar

const AllFavorites = ({
  handleFavoritesButtonClick,
  favoriteVideos,
}: AllFavoritesProps) => {
  return (
    <button
      data-testid="allfavorites-button"
      onClick={() => {
        handleFavoritesButtonClick(favoriteVideos);
      }}
    >
      My Favorites
    </button>
  );
};
export default AllFavorites;
