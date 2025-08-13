/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import type { SearchParams } from '../types/movieTypes';

interface SearchFormProps {
  params: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  totalResults: number;
  loading: boolean;
}

const SearchForm = ({ params, updateSearchParams, totalResults, loading }: SearchFormProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ ...params });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          autoFocus
          type="text"
          value={params.query}
          onChange={(e) => updateSearchParams({ query: e.target.value })}
          placeholder="Search for movies..."
          className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none transition-colors duration-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Search
        </button>
        {totalResults > 0 && (
          <div className="text-gray-600 dark:text-gray-400">
            {totalResults} results found
          </div>
        )}
      </div>

      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={params.type || ''}
              onChange={(e) => updateSearchParams({ type: e.target.value || undefined })}
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none transition-colors duration-300"
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
            <select
              value={params.year || ''}
              onChange={(e) => updateSearchParams({ year: e.target.value || undefined })}
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none transition-colors duration-300"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchForm;