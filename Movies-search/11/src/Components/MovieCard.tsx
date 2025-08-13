/* eslint-disable react/react-in-jsx-scope */
import { memo } from 'react';
import type { Movie } from '../types/movieTypes';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
  isFavorite?: boolean;
}

const MovieCard = memo(({ movie, onClick, isFavorite = false }: MovieCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
      onClick={() => onClick(movie.imdbID)}
      data-testid="movie-card"
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
            View Details
          </button>
        </div>
        {isFavorite && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate text-gray-900 dark:text-white">{movie.Title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;