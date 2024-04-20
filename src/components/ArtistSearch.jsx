import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import '../css/Search.css'

const ArtistSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const access_token = 'BQBUY-OucVDy_yhA_Klft2Qezdpgr5Pi_hhteWRs4LTYsfHGiWSQu6J7xnnM6nL-i2biRIO9NMTpt_kGEagHD0jBN7d4qyjPfvJIDZRZHY6rflNcBoI'

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("q"); 
    if (queryParam) {
      setQuery(queryParam); 
      handleSearch(queryParam);
    }
  }, [location.search]);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    const searchParams = new URLSearchParams();
    searchParams.append('q', query);
    navigate(`?${searchParams}`);

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.artists.items);
      } else {
        throw new Error(`Error fetching search results: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  const generateStarRating = (popularity) => {
    const maxRating = 5;
    const rating = Math.ceil((popularity / 100) * maxRating); // Convert popularity to a rating between 1 and 5
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star-filled' : 'star-empty'} style={{ fontSize: '24px', color: '#CCCCCC' }}>&#9733;</span>
      );
    }
    return stars;
  };
  
  return (
    <div>
      <Header />
      <div className="input-group" style={{  marginBottom:'20px',
      marginTop: searchResults.length > 0 ? '20px' : 'calc(40vh - 25px)'
      }}>
        <div className="form-outline" data-mdb-input-init>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for an artist..."
            id="form1"
            className="form-control"
            style={{ width: '300px' }}
          />
        </div>
        <button className="btn btn-primary" data-mdb-ripple-init onClick={() => handleSearch(query)}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {searchResults.map(artist => (
          <div className="col-md-3" key={artist.id}>
            <Link to={`/artist/${artist.id}?q=${encodeURIComponent(query)}`} className="card-link" style={{textDecoration:'none'}}>
              <div className="card h-100">
                <img src={artist.images[0]?.url} className="card-img-top" alt={artist.name} style={{ objectFit: 'cover', height: '50%' }} />
                <div className="card-body" style={{ borderTop: '1px solid #dee2e6' }}>
                  <h5 className="card-title">{artist.name}</h5>
                  
                  <p className="card-text">Followers: {artist.followers.total}</p>
                  <div className="star-rating">
                    {generateStarRating(artist.popularity)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
