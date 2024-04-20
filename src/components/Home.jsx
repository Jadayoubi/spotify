import React from "react";
import Header from "./Header";
import SpotifyLogin from '../images/spotifylogin.jpg'
import Login from "./Login";


const Home = () => {
    const clientId = "13cd15d9720a461bb023a98947421579"; // Your Spotify client ID
    const redirectUri = "http://localhost:3000/ArtistSearch"; // Your redirect URI
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=user-read-private%20user-read-email`;
  
    const redirectToSpotifyLogin = () => {
      window.location.href = spotifyLoginUrl;
    };
    return (
      <div>
      <Header/>
       <Login/>
      </div>
    );
    
  };
  
  
  export default Home;