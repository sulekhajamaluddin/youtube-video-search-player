# Youtube Video Search Player

## ABOUT THE PROJECT

This is a React web application that can be used to search YouTube videos and save favorite videos to watch later.

Technologies Used: `React, React Router, JWT, Bcrypt, TypeScript, Node js, Express js, Knex, Objection.`
Database Used: `PostgreSQL.`

## THE DIFFERENT PAGES AND SECTIONS

## Login/Register

The landing page of the project is a `Login Page`. This page also has the link for new users to go to the `Register Page`.

![Register](images/register.png?raw=true "Register")

When a new user registers, the application uses `Bcrypt` to hash the password securely.

Once the user is successfully registered, the user can go to the `Login Page` using the link that appears.

![Login](images/login.png?raw=true "Login")

In the `Login Page`, when the user logs in, a `Json Web Token` is assigned to the user to uniquely identify the user.

After successful login, the user gets redirected to the `Personal Page`.

![Main](images/main.png?raw=true "Main")

## This page has three main sections:

1. The first half is the `VideoPlayer` where the selected video is played.

The user can navigate between the videos using the `Next` and `Previous` buttons.

2. On top of the VideoPlayer, there is the `SearchBar`. The user can search for videos by typing in words into this SearchBar.

When a user searches for a word, the application first checks if any videos that contain the searched word is in the database. If yes, then those videos are displayed in the `SideBar`. If there are no videos in the database that contains the SearchWord, the `YouTube API` is called and the result videos are displayed on the `SideBar`. At the same time, these result videos are also saved into the `Database`.

![VideoPlayer](images/videoplayer-search.png?raw=true "VideoPlayer")

3. The next section is the `SideBar`. In this section, a list of all videos is available.

![SideBar](images/sidebar.png?raw=true "SideBar")

The user can like a video by clicking on the `Heart` in this section. All the liked videos will be displayed on the `SideBar` if the user clicks on the `My Favorites` button.

The `SideBar` also has `Load More` button implemented so that the videos are loaded in batches.

![Favorites](images/favorites.png?raw=true "Favorites")

## GET THE PROJECT

Git clone or download the repository into the your local system.

After cloning this repository for the first time, go to the root of the project.

You will need two terminals open and working, one for the frontend and one for the backend.

In terminal 1: enter into the backend using ### `cd backend`.

In terminal 2: enter into the frontend using ### `cd frontend`.

## Install dependencies

In both frontend and backend, install all the dependencies using the command:

```
npm install

```

## Set Up Database

This project uses PostgreSQL in the backend with Knex and Objections to make database management and querying efficient.
You have to install PostgreSQL in your local system to make the project work.
After installing PostgreSQL, in the terminal use the command : `psql -U name_of_databaseuser` or `psql -U postgres` to enter into psql mode. The part after `-U` is the username for the database.

Next, create a database for the project data using the command: `CREATE DATABASE name_of_database;`

Now the database is ready.

Use the command `\c name_of_database` to switch into the newly created database.

You can view the tables in the database using the command `\dt`

## Create .env file

You need to create a `.env` file for both the frontend and backend folders.
Use the command `touch .env` in backend terminal and frontend terminal. This will create a `.env` file in both the frontend and backend folders.

Use this screenshot for reference:

![FolderStructure](images/folderstructure.png?raw=true "FolderStructure")

`In the .env file for the frontend`, add the following information:

```shell
REACT_APP_BASE_URL = "http://localhost:3010"
```

`In the .env file for the backend`, add the following information:

```shell
DB_USERNAME = 'name_of_databaseuser'
DB_DATABASE = 'name_of_database'
DB_PASSWORD = 'databasepassword'
LOCALHOST = 'http://localhost:3000'
API_KEY = 'apikeyforyoutube'
API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video'
JWT_SECRET = 'yourjwtsecret'
```

1. DB_USERNAME is the `username` you use to access your postgreSQL database:

To access postgreSQL database, you need to use the command `psql -U name_of_databaseuser` or `psql -U postgres`. In the first case, the username is `name_of_databaseuser` and in the second case the username is `postgres`.

2. DB_DATABASE is the name of the database created for this particular project, ie: `name_of_database`

3. DB_PASSWORD is the password to access your database. You will set this up during the installation process.

4. API_KEY is the key you get for your account when you enable the Youtube API.

You can use this link to learn how to get the YouTube API: https://blog.hubspot.com/website/how-to-get-youtube-api-key

5. JWT_SECRET can be any string/sentence of your choice. This will be used to create a unique hash for the users of the website and to authorise them.

## Running the project

To run the project, first we have to have the tables required for the project in the database. For this we use Knex migrations.

In the terminal for the backend,

1. Run the command `npm run migrate`. This will create all the required tables for the project to work.
2. Run the command `npm run dev`. This will start the server.

In the terminal for the frontend,

Run the command `npm start`. This will open the app in the development mode in [http://localhost:3010](http://localhost:3010).

The page will reload if you make edits.

PS: Make sure you don't have any active ports. In most Unix-based operating systems, the command `killall node` would help.

## Test React App

Inside the root of the project, type the following:

```
npm run test
```

Launches the test runner in the interactive watch mode.
