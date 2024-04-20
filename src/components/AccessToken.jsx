import React, { useState } from "react";
import Header from './Header'
const AccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

  const generateAccessToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': '13cd15d9720a461bb023a98947421579',
          'client_secret': '2680d53edf814ba38ace1e2ba6029af3'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
      } else {
        console.error('Failed to retrieve access token:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
    <Header/>
      <h1>Spotify API Access Token</h1>
      <p>Access Token: {accessToken}</p>
      <button onClick={generateAccessToken} className="btn btn-primary">Generate New Token</button>
    </div>
  );
};

export default AccessToken;
