import Movie from './Movie';
import '../styles/movies.scss';

function Movies({ movies, viewTrailer, closeCard }) {
  return (
    <div data-testid="movies">
      {movies.movies.results?.map((movie) => (
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
