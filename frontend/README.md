# Youtube player project

## Installation

Using Node.JS' npm command line utility, install the project's dependencies:

`npm install`

## Running the project

To run the project, we use the following command:

`npm start`

PS: Make sure you don't have any active ports as this project will use port 3000 and 3001 respectively to work. In most Unix-based operating systems, the command `killall node` should do the trick, otherwise restart your computer.
## Task to achieve
- Design and mockup of the project can be found here: [version-1-design](mockups/version-1-design.pdf) or open the mockups folder in this project and look at the PDF design document.
- Searching of video should be possible.
- When a video is found through search, it should be shown in the side bar of the video.
- It should be possible to "heart" a video, when this happens store the results in `localStorage`.
- It should be possible to "unheart" a video, store the results in local storage.
- It should be possible to navigate with the "next" or "previous" buttons - if the end of the list is reached, show an alert with `alert` that we have reached the end of the list.
- The design should not be perfect but close and should include all the words mentioned for the grading to work i.e. `npm test` should work locally.



