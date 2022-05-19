import React from 'react';
import { useState, useEffect } from 'react';
import { Videos } from '../App';
import VideoPlayerButton from './VideoPlayerButton';

export type VideoPlayerProps = {
  videoToPlay: Videos[];
  clickedVideo: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoToPlay,
  clickedVideo,
}) => {
  const [videoToDisplay, setVideoToDisplay] = useState('');

  useEffect(() => {
    clickedVideo !== ''
      ? setVideoToDisplay(clickedVideo)
      : setVideoToDisplay(videoToPlay[0]?.id?.videoId);
  }, [videoToPlay, clickedVideo]);

  const findCurrentIndex = (): number => {
    let currentIndex = 0;
    if (videoToDisplay) {
      videoToPlay.map((video) => {
        if (video?.id?.videoId === videoToDisplay) {
          currentIndex = videoToPlay.indexOf(video);
        }
      });
    } else {
      currentIndex = -1;
    }
    return currentIndex;
  };
  const handlePreviousButtonClick = () => {
    const currentIndex = findCurrentIndex();
    setVideoToDisplay(videoToPlay[currentIndex - 1]?.id?.videoId);
  };

  const handleNextButtonClick = () => {
    let currentIndex = findCurrentIndex();
    currentIndex < videoToPlay.length - 1
      ? (currentIndex = currentIndex + 1)
      : alert('End of list');
    setVideoToDisplay(videoToPlay[currentIndex]?.id?.videoId);
  };

  return (
    <div>
      <iframe
        width="650"
        height="450"
        data-testid="iframe-component"
        src={`https://www.youtube.com/embed/${videoToDisplay}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <br />
      <VideoPlayerButton
        handlePreviousButtonClick={handlePreviousButtonClick}
        handleNextButtonClick={handleNextButtonClick}
      />
    </div>
  );
};

export default VideoPlayer;
