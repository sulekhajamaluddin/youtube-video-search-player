import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoPlayer from '../components/VideoPlayer';

test('renders the next-button', () => {
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={[]} clickedVideo={''} />
  );
  const nextButton = getByTestId('next-button');
  expect(nextButton).toBeInTheDocument();
});

test('renders the previous-button', () => {
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={[]} clickedVideo={''} />
  );
  const previousButton = getByTestId('previous-button');
  expect(previousButton).toBeInTheDocument();
});

const videoToPlay = [
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

const clickedVideo2 = 'videoId2';
const clickedVideo1 = 'videoId1';

test('previous button click works properly', () => {
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={videoToPlay} clickedVideo={clickedVideo2} />
  );
  const previousButton = getByTestId('previous-button');
  fireEvent.click(previousButton);
  const iframe = getByTestId('iframe-component');
  const source = iframe.getAttribute('src');
  expect(source).toContain('https://www.youtube.com/embed/videoId1');
});

test('next button click works properly', () => {
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={videoToPlay} clickedVideo={clickedVideo1} />
  );
  const nextButton = getByTestId('next-button');
  fireEvent.click(nextButton);
  const iframe = getByTestId('iframe-component');
  const source = iframe.getAttribute('src');
  expect(source).toContain('https://www.youtube.com/embed/videoId2');
});

test('previous button click works properly when videoToDisplay is undefined', () => {
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={videoToPlay} clickedVideo={clickedVideo1} />
  );
  const previousButton = getByTestId('previous-button');
  fireEvent.click(previousButton);
  const iframe = getByTestId('iframe-component');
  const source = iframe.getAttribute('src');
  expect(source).toContain('https://www.youtube.com/embed/undefined');
  fireEvent.click(previousButton);
  expect(source).toContain('https://www.youtube.com/embed/undefined');
});

test('next button click works properly when end of list is shown', () => {
  window.alert = jest.fn();
  const { getByTestId } = render(
    <VideoPlayer videoToPlay={videoToPlay} clickedVideo={clickedVideo2} />
  );
  const nextButton = getByTestId('next-button');
  fireEvent.click(nextButton);
  expect(window.alert).toBeCalledWith('End of list');
});
