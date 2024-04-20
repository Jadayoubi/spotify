import React from "react";
import SpotifyLogin from '../images/spotifylogin.jpg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const clientId = "13cd15d9720a461bb023a98947421579";
  const redirectUri = "http://localhost:3000/ArtistSearch";
  const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=user-read-private%20user-read-email`;

  const redirectToSpotifyLogin = () => {
    window.location.href = spotifyLoginUrl;
  };
  return (
    <div>
      <button onClick={redirectToSpotifyLogin} style={{backgroundColor:'transparent',marginLeft:'25%',marginTop:'10%',borderColor:'transparent'}}>
        <img src={SpotifyLogin} alt="Spotify login" />
      </button>
    </div>
  );
  
};

  export default Login;