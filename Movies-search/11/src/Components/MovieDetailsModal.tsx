/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import type { MovieDetails } from '../types/movieTypes';

interface MovieDetailsModalProps {
  movie: MovieDetails | null;
  loading: boolean;
  error: string;
  isFavorite: boolean;
  onClose: () => void;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
}

const MovieDetailsModal = ({
  movie,
  loading,
  error,
  isFavorite,
  onClose,
  onAddFavorite,
  onRemoveFavorite
}: MovieDetailsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Controlar apertura/cierre del modal
  useEffect(() => {
    if (movie || loading) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      startClosingAnimation();
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [movie, loading]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        startClosingAnimation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const startClosingAnimation = () => {
    if (!isOpen) return;
    
    setIsClosing(true);
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      startClosingAnimation();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 ${
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
          isClosing ? 'animate-scaleOut' : 'animate-scaleIn'
        } shadow-xl relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={startClosingAnimation}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-300 z-10 bg-gray-100 dark:bg-gray-700 p-1 rounded-full"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading movie details...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={startClosingAnimation}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        ) : movie ? (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3 flex-shrink-0">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.Title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{movie.Title} ({movie.Year})</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {movie.Rated && <DetailItem label="Rated" value={movie.Rated} />}
                  {movie.Released && <DetailItem label="Released" value={movie.Released} />}
                  {movie.Runtime && <DetailItem label="Runtime" value={movie.Runtime} />}
                  {movie.Genre && <DetailItem label="Genre" value={movie.Genre} />}
                  {movie.Director && <DetailItem label="Director" value={movie.Director} />}
                  {movie.Actors && <DetailItem label="Actors" value={movie.Actors} />}
                  {movie.Language && <DetailItem label="Language" value={movie.Language} />}
                  {movie.Country && <DetailItem label="Country" value={movie.Country} />}
                </div>
                
                {movie.Plot && (
                  <div className="mb-6">
                    <DetailItem label="Plot" value={movie.Plot} />
                  </div>
                )}
                
                {(movie.Ratings?.length > 0 || movie.imdbRating) && (
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Ratings</p>
                    <div className="flex flex-wrap gap-3">
                      {movie.Ratings?.map((rating, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg flex-1 min-w-[120px]">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{rating.Source}</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{rating.Value}</p>
                        </div>
                      ))}
                      {movie.imdbRating && (
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg flex-1 min-w-[120px]">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">IMDb</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{movie.imdbRating}/10 ({movie.imdbVotes} votes)</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {isFavorite ? (
                    <button
                      onClick={onRemoveFavorite}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-300"
                    >
                      <StarIcon />
                      Remove from Favorites
                    </button>
                  ) : (
                    <button
                      onClick={onAddFavorite}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-colors duration-300"
                    >
                      <StarIcon />
                      Add to Favorites
                    </button>
                  )}
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300"
                  >
                    <ExternalLinkIcon />
                    View on IMDb
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Componentes auxiliares
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
    <p className="text-gray-900 dark:text-white">{value}</p>
  </div>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export default MovieDetailsModal;