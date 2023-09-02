import { useState } from 'react';
import {
  Routes, Route, createSearchParams, useSearchParams, useNavigate,
} from 'react-router-dom';

import 'reactjs-popup/dist/index.css';

import Popup from 'reactjs-popup';
import { ENDPOINT, API_KEY } from './constants';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import YouTubePlayer from './components/YoutubePlayer';
import useInfiniteScroll from './hooks/useInfiniteScroll';

import './app.scss';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [videoKey, setVideoKey] = useState();
  const navigate = useNavigate();

  const closeCard = () => {

  };

  const searchMovies = (query) => {
    navigate('/', { replace: true });
    if (query && query !== '') {
      setSearchParams(createSearchParams({ search: query }));
    }
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL)
      .then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid) => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
  };

  useInfiniteScroll(searchQuery);
  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="container">
        <Popup
          open={Boolean(videoKey)}
          closeOnDocumentClick
          onClose={() => setVideoKey(null)}
          closeOnEscape
        >
          <YouTubePlayer
            videoKey={videoKey}
          />
          <button className="btn btn-primary close-button" onClick={() => setVideoKey(null)} type="button">
            Close
          </button>
        </Popup>
        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
