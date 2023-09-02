/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';

const useInfiniteScroll = (searchQuery, debounceDelay = 300) => {
  const dispatch = useDispatch();
  const { totalPages } = useSelector((prevState) => prevState.movies);

  const [page, setPage] = useState(1);
  const getMovies = (query) => {
    if (query && query !== '') {
      dispatch(fetchMovies({ page, query }));
    } else {
      dispatch(fetchMovies({ page, query: null }));
    }
  };
  useEffect(() => {
    let debounceTimeout;

    const handleScroll = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        if (
          window.innerHeight + window.pageYOffset
          >= document.documentElement.offsetHeight
        ) {
          setPage((oldPage) => {
            if (page < totalPages) {
              return oldPage + 1;
            }
            return oldPage;
          });
        }
      }, debounceDelay);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(debounceTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [debounceDelay, totalPages]);

  useEffect(() => {
    getMovies(searchQuery);
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      getMovies(searchQuery);
    }
  }, [searchQuery]);
};

export default useInfiniteScroll;
