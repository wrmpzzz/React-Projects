import { useState, useEffect } from 'react';
import type { Movie } from '../types/movieTypes';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteMovies');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveFavorites = (newFavorites: Movie[]) => {
    localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      saveFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (imdbID: string) => {
    saveFavorites(favorites.filter(fav => fav.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};