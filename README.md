# Spotify Artist Search

This is a web application that allows users to search for artists on Spotify and view their albums.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Start the development server by running `npm start`.
4. Open your browser and navigate to `http://localhost:3000` to view the application.
5. Incase the accessToken expired you need to replace it with a new one.
   
## AccessToken Replacement
To replace the access token you should follow these steps:
1. Navigate to http://localhost:3000/AccessToken
2. Press on Generate New Token button
3. Copy the new token
4. Go to ArtistSearch.jsx file, change the value of the variable access_token to the new access token
5. Do the same as step 4 but in the ArtistAlbums.jsx
   
## Usage
- Login using your Spotify account
- Enter the name of an artist in the search bar and press the search button.
- View the list of artists matching your search query.
- The search is dynamic, meaning search results update as you type.
- Click on an artist to view their albums.

## Dependencies

- React
- react-router-dom
- Bootstrap
- Font Awesome

