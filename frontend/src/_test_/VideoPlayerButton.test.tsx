import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoPlayerButton from '../components/VideoPlayerButton';

test('previous-button click works properly', () => {
  const testFunctionPrevious = jest.fn();
  const { getByTestId } = render(
    <VideoPlayerButton
      handlePreviousButtonClick={testFunctionPrevious}
      handleNextButtonClick={jest.fn()}
    />
  );
  const previousButton = getByTestId('previous-button');
  fireEvent.click(previousButton);
  expect(testFunctionPrevious).toBeCalled();
});

test('next-button click works properly', () => {
  const testFunctionNext = jest.fn();
  const { getByTestId } = render(
    <VideoPlayerButton
      handlePreviousButtonClick={jest.fn()}
      handleNextButtonClick={testFunctionNext}
    />
  );
  const nextButton = getByTestId('next-button');
  fireEvent.click(nextButton);
  expect(testFunctionNext).toBeCalled();
});
