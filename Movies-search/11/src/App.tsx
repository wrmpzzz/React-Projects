/* eslint-disable react/react-in-jsx-scope */
import { useState, useCallback } from 'react';
import { useMovieSearch } from './hooks/useMovieSearch';
import { useMovieDetails } from './hooks/useMovieDetails';
import { useFavorites } from './hooks/useFavorites';
import { useDarkMode } from './hooks/useDarkMode';
import SearchForm from './Components/SearchForm';
import MovieCard from './Components/MovieCard';
import MovieDetailsModal from './Components/MovieDetailsModal';

const API_KEY = 'ceaf2d86'; // Reemplaza con tu API key de OMDB

function App() {
  const {
    params,
    updateSearchParams,
    movies,
    loading,
    error,
    totalResults,
    hasMore,
    loadMore
  } = useMovieSearch();

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const { movie: selectedMovie, loading: loadingDetails } = useMovieDetails(API_KEY, selectedMovieId || undefined);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { isDarkMode } = useDarkMode();

  const [showFavorites, setShowFavorites] = useState(false);

  const handleMovieSelect = useCallback((imdbID: string) => {
    setSelectedMovieId(imdbID);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const handleAddFavorite = useCallback(() => {
    if (selectedMovie) {
      addFavorite({
        imdbID: selectedMovie.imdbID,
        Title: selectedMovie.Title,
        Poster: selectedMovie.Poster,
        Year: selectedMovie.Year,
        Type: selectedMovie.Type
      });
    }
  }, [selectedMovie, addFavorite]);

  const handleRemoveFavorite = useCallback(() => {
    if (selectedMovie) {
      removeFavorite(selectedMovie.imdbID);
    }
  }, [selectedMovie, removeFavorite]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            Movie Search
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                showFavorites ? 'bg-purple-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Favorites ({favorites.length})
            </button>
          </div>
        </header>

        <SearchForm 
          params={params}
          updateSearchParams={updateSearchParams}
          totalResults={totalResults}
          loading={loading}
        />

        {showFavorites ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400 border-b border-purple-500 pb-2">
              Your Favorites
            </h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard 
                    key={movie.imdbID} 
                    movie={movie} 
                    onClick={handleMovieSelect}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                You don&#39;t have any favorites yet.
              </div>
            )}
          </div>
        ) : (
          <>
            {loading && !movies.length && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-12 text-red-500">
                {error}
              </div>
            )}

            {movies.length > 0 && (
              <div className="mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movies.map((movie) => (
                    <MovieCard 
                      key={movie.imdbID} 
                      movie={movie} 
                      onClick={handleMovieSelect}
                      isFavorite={isFavorite(movie.imdbID)}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Showing {movies.length} of {totalResults} results
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <MovieDetailsModal
          movie={selectedMovie}
          loading={loadingDetails}
          error={error}
          isFavorite={selectedMovie ? isFavorite(selectedMovie.imdbID) : false}
          onClose={closeModal}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
}

export default App;