import React from 'react';


export type VideoPlayerButtonProps = {
     handlePreviousButtonClick: () => void;
     handleNextButtonClick: () => void;
  };

  const VideoPlayerButton = ({ handlePreviousButtonClick,handleNextButtonClick}:VideoPlayerButtonProps) => {
  return (
      <div className='button-container'>
    <button
      className='button'
      data-testid='previous-button'
      onClick={() => {
        handlePreviousButtonClick();
      }}
    >
      Previous
    </button>  
  <button
    className='button'
    data-testid='next-button'
    onClick={() => {
      handleNextButtonClick();
    }}
  >
    Next
  </button>
  </div>
  );
};
export default VideoPlayerButton;