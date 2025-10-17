import { useState, useEffect, useMemo } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface UsePokemonResult {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
}

// Custom Hook para fetch de Pokémon
function usePokemon(initialLimit: number = 20): UsePokemonResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los Pokémon');
        }
        
        const data = await response.json();
        setPokemons(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit]);

  const loadMore = () => {
    setLimit(prev => prev + 20);
  };

  return { pokemons, loading, error, loadMore };
}

// Custom Hook para búsqueda
function useSearch<T>(items: T[], searchTerm: string, filterFn: (item: T, term: string) => boolean) {
  return useMemo(() => {
    if (!searchTerm.trim()) return items;
    return items.filter(item => filterFn(item, searchTerm));
  }, [items, searchTerm, filterFn]);
}

// Función helper
function getPokemonId(url: string): number {
  const id = url.split('/').filter(Boolean).pop();
  return Number(id);
}

export default function App() {
  const [search, setSearch] = useState('');
  const { pokemons, loading, error, loadMore } = usePokemon(150);
  
  const filteredPokemons = useSearch(
    pokemons,
    search,
    (pokemon, term) => pokemon.name.toLowerCase().includes(term.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Buscador de Pokémon
        </h1>

        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 mb-6 text-lg focus:outline-none focus:border-blue-500"
        />

        <p className="text-gray-400 mb-4">
          {filteredPokemons.length} Pokémon encontrados
        </p>

        {loading && pokemons.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-300">Cargando Pokémon...</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {filteredPokemons.map((pokemon) => {
                const pokemonId = getPokemonId(pokemon.url);
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                
                return (
                  <div
                    key={pokemon.name}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-750 transition flex items-center gap-4 border border-gray-700"
                  >
                    <img 
                      src={imageUrl} 
                      alt={pokemon.name}
                      className="w-16 h-16 bg-gray-700 rounded"
                    />
                    <p className="text-lg font-medium capitalize text-white">
                      #{pokemonId} {pokemon.name}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={loadMore}
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 transition"
            >
              {loading ? 'Cargando...' : 'Cargar más Pokémon'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}