import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const ArtistAlbums = ({ match }) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const access_token=
'BQDIM94dyAB6Ol9Eimox-QcJYzuLsZBH-18YpxFH7Xqc_KKow3NjkVIGuT0eIZbMB90CEs4xP3Qnw380DxDZpAPDPID79Hj5wab3xSJX3uem322J1fg'
useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching artist: ${response.statusText}`);
        }

        const data = await response.json();
        setArtist(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          headers: {
            Authorization: `Bearer ${access_token}` // Use your access token here
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching albums: ${response.statusText}`);
        }

        const data = await response.json();
        setAlbums(data.items);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
fetchArtist();
    fetchAlbums();
  }, [artistId]);

  

  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <Header/>
    <h2>{artist.name}</h2>
    <h5 style={{color:'grey'}}>Albums</h5>
    {loading ? (
      <p>Loading albums...</p>
    ) : (
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {albums.map(album => (
          <div className="col" key={album.id}>
            <div className="card">
              <img src={album.images[0]?.url} className="card-img-top" alt={album.name} />
              <div className="card-body">
                <h5 className="card-title">{album.name}</h5>
                <p className="card-text">Artist: {artist.name}</p>
                <p className="card-text">Release Date: {album.release_date}</p>
                <p className="card-text">Total Tracks: {album.total_tracks}</p>
                <a href={album.external_urls.spotify} className="btn btn-primary">Preview on Spotify</a>
                {/* Display additional album information as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default ArtistAlbums;
