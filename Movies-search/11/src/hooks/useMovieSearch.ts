import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {debounce } from 'lodash';
import type { Movie, SearchParams } from '../types/movieTypes';

const API_KEY = 'ceaf2d86';

export const useMovieSearch = () => {
  const [params, setParams] = useState<SearchParams>({ query: '' });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Crear una referencia para la función debounced
  const debouncedSearchRef = useRef(
    debounce(async (searchParams: SearchParams, currentPage: number) => {
      if (searchParams.query.trim() === '') {
        setMovies([]);
        setTotalResults(0);
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchParams.query}&page=${currentPage}`;
        
        if (searchParams.type) url += `&type=${searchParams.type}`;
        if (searchParams.year) url += `&y=${searchParams.year}`;
        
        const response = await axios.get(url);
        
        if (response.data.Response === 'True') {
          setMovies(prev => currentPage === 1 ? response.data.Search : [...prev, ...response.data.Search]);
          setTotalResults(parseInt(response.data.totalResults));
          setHasMore(currentPage * 10 < parseInt(response.data.totalResults));
          setError('');
        } else {
          if (currentPage === 1) {
            setMovies([]);
            setTotalResults(0);
            setError(response.data.Error || 'No movies found');
          }
          setHasMore(false);
        }
      } catch (err) {
        setError('Failed to fetch movies');
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }, 500) // 500ms de delay
  );

  // Limpiar el debounce al desmontar
  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  const searchMovies = useCallback((currentPage: number = 1, newParams?: SearchParams) => {
    const searchParams = newParams || params;
    debouncedSearchRef.current(searchParams, currentPage);
  }, [params]);

  useEffect(() => {
    if (params.query.trim() === '') {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    
    searchMovies(1);
  }, [params.query, params.type, params.year, searchMovies]);

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchMovies(nextPage);
  };

  return {
    params,
    updateSearchParams,
    movies,
    loading,
    error,
    page,
    totalResults,
    hasMore,
    loadMore
  };
};