import { useDispatch, useSelector } from 'react-redux';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';
import placeholder from '../assets/not-found-500X750.jpeg';

// eslint-disable-next-line no-unused-vars
function Movie({ movie, viewTrailer, closeCard }) {
  const state = useSelector((prevState) => prevState);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const dispatch = useDispatch();

  const myClickHandler = (e) => {
    // if (!e) var e = window.event;
    // e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove('opened');
  };

  return (
    <div className="wrapper">
      <div
        className="card"
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          // Todo: complete this
        }}
        onClick={(e) => e.currentTarget.classList.add('opened')}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies.map((movieItem) => movieItem.id).includes(movie.id) ? (
              <span
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  // Todo: complete this
                }}
                className="btn-star"
                data-testid="starred-link"
                onClick={() => dispatch(starMovie({
                  id: movie.id,
                  overview: movie.overview,
                  release_date: movie.release_date?.substring(0, 4),
                  poster_path: movie.poster_path,
                  title: movie.title,
                }))}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                // Todo: complete this
                }}
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies.map((movieItem) => movieItem.id).includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() => dispatch(addToWatchLater({
                  id: movie.id,
                  overview: movie.overview,
                  release_date: movie.release_date?.substring(0, 4),
                  poster_path: movie.poster_path,
                  title: movie.title,
                }))}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check" />
              </button>
            )}
            <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>
          </div>
          <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default Movie;
