import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MovieDetails } from '../types/movieTypes';


const API_KEY = "ceaf2d86&";

export const useMovieDetails = (apiKey: string, imdbID?: string) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!imdbID) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        if (response.data.Response === 'True') {
          setMovie(response.data);
        } else {
          setError(response.data.Error || 'Movie details not found');
          setMovie(null);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [apiKey, imdbID]);

  return { movie, loading, error };
};