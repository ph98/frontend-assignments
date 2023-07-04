import { useSelector } from 'react-redux';
import Movie from './Movie';
import '../styles/movies.scss';

function Movies({ viewTrailer, closeCard }) {
  const state = useSelector((prevState) => prevState);
  const { movies } = state.movies;

  // TODO: handle the search here

  if (!movies.results || !movies.results.length) {
    return (
      <div className="no-moview">
        <span className="text-center">there is no movie available right now!</span>
      </div>
    );
  }

  return (
    <div data-testid="movies" className="movies">
      {movies.results.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          viewTrailer={viewTrailer}
          closeCard={closeCard}
        />
      ))}
    </div>
  );
}

export default Movies;
