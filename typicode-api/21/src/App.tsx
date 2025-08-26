import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Search } from 'lucide-react';

// Tipos TypeScript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();

        setPosts(postsData.slice(0, 10)); // Solo 10 posts
        setUsers(usersData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener usuario por ID
  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  // Filtrar posts
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Posts de Typicode
          </h1>
          <p className="text-gray-600">
            Mini proyecto con React y TypeScript
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron posts</p>
            </div>
          ) : (
            filteredPosts.map(post => {
              const author = getUserById(post.userId);
              
              return (
                <div key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  
                  {/* Info del autor */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {author?.name.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">
                        {author?.name || 'Usuario'}
                      </p>
                      <p className="text-sm text-gray-500">
                        @{author?.username || 'unknown'}
                      </p>
                    </div>
                  </div>

                  {/* Contenido del post */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 capitalize">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.body}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>Post #{post.id}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer simple */}
        <div className="text-center mt-8 pt-6 border-t">
          <p className="text-gray-500 text-sm">
            Datos de{' '}
            <a 
              href="https://jsonplaceholder.typicode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              JSONPlaceholder
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;