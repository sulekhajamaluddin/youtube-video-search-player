import './styles/index.css';
import React, { useContext } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import VideoPlayer from './components/VideoPlayer';
import { Outlet, useNavigate } from 'react-router-dom';
import Logout from './components/Logout';
import { LoginContext } from './helper/Context';

export interface Videos {
  etag: string;
  id: {
    kind: string;
    name: string;
    videoId: string;
  };
  kind: string;
}

function App() {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [searchedList, setSearchedList] = useState<Videos[]>([]);
  const [clickedVideo, setClickedVideo] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  // Get all the videos from DB

  const getVideos = async (page:number) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/videoplayer?pageNumber=${page}`
    );
    const data: Videos[] = await response.json();
    console.log(data);
    setVideos(data);
  };

  // Get token from the session storage

  const getToken = () => {
    const authentication = sessionStorage.getItem('authentication');
    if (authentication) {
      const token = JSON.parse(authentication);
      return token;
    }
  };

  // Logout a user (already logged in) and token has expired

  const logUserOut = () => {
    setLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  };

  // Ping the backend to check the valid current users and authenticate the user currently logged in.
  // If an authorised user, get his details

  const ping = async () => {
    const token = getToken();
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/currentuser`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token },
      }
    );
    const data = await response.json();
    response.status === 200 ? setUserEmail(data.email) : logUserOut();
    setUserEmail(data.email);
  };

  // Use Effect to get all the videos from DB

  useEffect(() => {
    const page = 1;
    getVideos(page);
  }, []);

  // useEffect(() => {
  //   const page = 1;
  //   getVideos(page);
  // }, [searchedList]);

  // Use Effect to keep pinging the backend for current user validity

  useEffect(() => {
    ping();
  }, []);

  // Function to handle search by user

  const handleSearch = async (searchWord: string) => {
    if (searchWord === '') {
      alert('Enter search word');
    } else {
      const queryWord = { searchWord };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryWord),
        }
      );
      const data = await response.json();
      setSearchedList(data);
    }
  };

  // Function to set clicked video id to be the VideoPlayer component as props

  const handleVideoNameClick = (selectedVideoId: string) => {
    setClickedVideo(selectedVideoId);
  };

  // Function to recieve the page and set pageNumber

  const handlePageNumber = (page:number) => {
    console.log(page);
    getVideos(page);
  }

  return (
    <div className="app">
      <div className="logo-container">
        <img id="logo" src="/youtube-logo.png" alt="LOGO" />
        <div className="logout">
          <p>Welcome, {userEmail}</p>
          <Logout />
        </div>
      </div>
      <div className="main">
        <div className="left-container">
          <Search onSearch={handleSearch} />
          <VideoPlayer videoToPlay={videos} clickedVideo={clickedVideo} />
        </div>
        <Sidebar
          allVideos={videos}
          searchedList={searchedList}
          onVideoNameClick={(selectedVideoId) =>
            handleVideoNameClick(selectedVideoId)
          }
          pageNumberChange={handlePageNumber}
        />
      </div>
      <button
        className="fixed"
        onClick={() => {
          window.scrollTo({top: 0, behavior:'smooth'});
        }}
      >
        {<FaArrowAltCircleUp className="arrow-up" />}
      </button>
      <Outlet />
    </div>
  );
}

export default App;
