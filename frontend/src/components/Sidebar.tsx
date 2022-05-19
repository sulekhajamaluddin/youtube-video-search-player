import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { Videos } from '../App';
import AllFavorites from './AllFavorites';

type SidebarProps = {
  allVideos: Videos[];
  searchedList: Videos[];
  onVideoNameClick: (selectedVideoId: string) => void;
  pageNumberChange: (page: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  allVideos,
  searchedList,
  onVideoNameClick,
  pageNumberChange,
}) => {
  const [listVideos, setListVideos] = useState<Videos[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<Videos[]>([]);
  const [endOfList, setEndOfList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [page, setPage] = useState(2);
  const state = useRef(0);

  // Get token from Session Storage

  const getToken = () => {
    const authentication = sessionStorage.getItem('authentication');
    if (authentication) {
      const token = JSON.parse(authentication);
      return token;
    }
  };

  // Get the Specific User's Favorite Videos from the Database

  const getFavoriteVideos = async () => {
    const token = getToken();
    if (token) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/favorites`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: token },
        }
      );
      const data = await response.json();
      setFavoriteVideos(data);
    }
  };

  useEffect(() => {
    getFavoriteVideos();
  }, []);

  useEffect(() => {
    if (searchedList.length !== 0) {
      state.current = 3;
      setListVideos(searchedList);
    } else if (searchedList.length === 0) {
      setListVideos(allVideos);
    } else {
      setListVideos(allVideos);
    }
  }, [allVideos, searchedList]);

  // UseEffect to set List title

  useEffect(() => {
    if (state.current === 0) {
      setListTitle('All Saved Videos');
    } else if (state.current === 1) {
      setListTitle('All Favorite Videos');
    } else if (state.current === 2){
      setListTitle('All Saved Videos');
    }else {
      setListTitle('Searched Videos');
    }
  }, [state.current]);

  // Function that handles the All Favorites (Tab) on the Sidebar

  const handleFavoritesButtonClick = (favoriteVideos: Videos[]) => {
    state.current = 1;
    console.log(state.current);
    if (favoriteVideos.length > 0) {
      setListVideos(favoriteVideos);
    } else {
      setListVideos([]);
    }
  };

  // Function that handles the All Videos (Tab) on the Sidebar

  const handleAllVideosButtonClick = () => {
    state.current = 2;
    setListVideos(allVideos);
  };

  // Function that selects the video that the user clicked on and pass it to the App.js

  const handleVideoNameButtonClick = (video: Videos) => {
    const selectedVideoId = video?.id?.videoId;
    onVideoNameClick(selectedVideoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function that handles the liking and disliking of videos

  const handleFavoriteButtonClick = async (video: Videos) => {
    const token = getToken();
    const length = favoriteVideos.length;
    const query = { video };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/favorites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(query),
      }
    );
    const data = await response.json();
    setFavoriteVideos(data);
    if (length > data.length && state.current === 1) {
      setListVideos(data);
    }
  };

  // Function that sets the heart to full heart or empty heart based on if it is like or dislike

  const setHeart = (video: Videos) => {
    let isFound = 0;
    if (favoriteVideos.length > 0) {
      favoriteVideos.forEach((element: Videos) => {
        if (element.id.videoId === video.id.videoId) {
          isFound = 1;
        }
      });
    }

    if (isFound === 1) {
      return <FaHeart className="heart fullHeart" />;
    } else {
      return <FaRegHeart className="heart" />;
    }
  };

  // Function to handle load more button click

  const handleLoadMore = () => {
    if (state.current === 1) {
      setListVideos(favoriteVideos);
    } else {
      setPage(page + 1);
      pageNumberChange(page);
    }
  };

  return (
    <div>
      <div className="anchor-tab">
        <AllFavorites
          handleFavoritesButtonClick={handleFavoritesButtonClick}
          favoriteVideos={favoriteVideos}
        />
        <button
          onClick={() => {
            handleAllVideosButtonClick();
          }}
        >
          All Videos
        </button>
      </div>
      <div className="sidebar">
        <div className='list-title'>{listTitle}</div>
        <ul>
          {(listVideos as Videos[])?.map((video) => (
            <li key={video.id.videoId}>
              <div className="video-item">
                <div className="thumbnail">
                  <img
                    onClick={() => {
                      handleVideoNameButtonClick(video);
                    }}
                    src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`}
                  ></img>
                </div>
                <div className="video-title">
                  <button
                    onClick={() => {
                      handleVideoNameButtonClick(video);
                    }}
                    className="videoname-button"
                  >
                    {video?.id?.name}
                  </button>
                  <button
                    className="favorite-button"
                    onClick={() => handleFavoriteButtonClick(video)}
                  >
                    {setHeart(video)}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="end-of-list">
          {endOfList ? (
            <span style={{ color: 'red', fontSize: 25 }}>END OF LIST!!</span>
          ) : (
            <span></span>
          )}
        </div>
        <button className="load-more" onClick={() => handleLoadMore()}>
          Load More
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
