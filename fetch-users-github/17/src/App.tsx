import { useState, useRef, useCallback } from "react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia al input para manejar foco
  const inputRef = useRef<HTMLInputElement>(null);

  // Función memoriza con useCallback para evitar recreación en cada render
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Usuario no encontrado");
        }
        return res.json();
      })
      .then((data: GithubUser) => {
        setUserData(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        // Después de la búsqueda, ponemos foco en el input para nueva búsqueda
        inputRef.current?.focus();
      });
  }, [username]); // Dependencia username porque lo usamos en fetch

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-white">Buscador de Usuarios de GitHub</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          ref={inputRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Escribe un usuario..."
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>

      {loading && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-80 animate-pulse">
          <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded mt-4 w-32 mx-auto"></div>
          <div className="h-3 bg-gray-600 rounded mt-2 w-48 mx-auto"></div>
          <div className="flex justify-around mt-4">
            <div className="h-3 bg-gray-600 rounded w-12"></div>
            <div className="h-3 bg-gray-600 rounded w-16"></div>
            <div className="h-3 bg-gray-600 rounded w-14"></div>
          </div>
          <div className="mt-4 h-8 bg-gray-700 rounded w-24 mx-auto"></div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-80 text-center text-gray-200">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-600"
          />
          <h2 className="text-xl font-bold mt-4">{userData.name || userData.login}</h2>
          <p className="text-gray-400">{userData.bio}</p>
          <div className="mt-4 flex justify-around text-sm text-gray-400">
            <span>Repos: {userData.public_repos}</span>
            <span>Seguidores: {userData.followers}</span>
            <span>Siguiendo: {userData.following}</span>
          </div>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            
          >
            Ver perfil
          </a>
        </div>
      )}
    </div>
  );
}
