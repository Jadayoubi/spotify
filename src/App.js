import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import ArtistSearch from './components/ArtistSearch';
import ArtistAlbums from './components/ArtistAlbums';
import NotFound from './components/NotFound';
import AccessToken from './components/AccessToken';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ArtistSearch" element={<ArtistSearch />} />
        <Route path="/artist/:artistId" element={<ArtistAlbums />} />
        <Route path="/AccessToken" element={<AccessToken />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};


export default App;
