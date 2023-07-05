import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Movie from './Movie';
import '../styles/movies.scss';

function Movies({ viewTrailer, closeCard }) {
  const scrollableContainerRef = useRef();
  const { movies } = useSelector((prevState) => prevState.movies);

  // TODO: handle the search here

  return (
    <div data-testid="movies" className="movies" ref={scrollableContainerRef}>
      {
      (!movies || !movies.length)
        ? (
          <div className="no-movie">
            <span className="text-center">there is no movie available right now!</span>
          </div>
        )
        : movies.map(({ results }) => results).flat().map((movie) => (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        ))
}
    </div>
  );
}

export default Movies;
