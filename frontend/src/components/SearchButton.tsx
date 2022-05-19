import React from 'react';


export type SearchButtonProps = {
    handleSubmit: () => void;
  };
const SearchButton = ({handleSubmit}:SearchButtonProps) => {
  return (
      <button data-testid="button-for-search" onClick={()=>handleSubmit()}>Submit</button>
  );
};
export default SearchButton;