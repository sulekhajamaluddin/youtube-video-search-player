import React from 'react';
import SearchButton from './SearchButton';

export type SearchProps = {
  onSearch: (searchWord: string) => void;
};

// Function to extract the search word from the browser and pass it to onSearch function in the App.js

const Search = ({ onSearch }: SearchProps) => {
  const handleSubmit = () => {
    const searchWord = (document.getElementById('search') as HTMLInputElement)
      .value;
    onSearch(searchWord);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        id="search"
        data-testid="search-input"
      />
      <SearchButton handleSubmit={handleSubmit} />
    </div>
  );
};
export default Search;
