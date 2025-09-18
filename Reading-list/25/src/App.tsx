import { useEffect, useState, useMemo } from "react";
import "./App.css";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  cover: string;
}

type GenreFilter = "all" | string;
const STORAGE_KEY = "readingList";

const BookCard = ({
  book,
  inList,
  onToggle,
}: {
  book: Book;
  inList: boolean;
  onToggle: (book: Book) => void;
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <img
        src={book.cover}
        alt={book.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{book.title}</h3>
        <p className="text-gray-400 text-sm">{book.author}</p>
        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-300">
          {book.genre}
        </span>
        <button
          onClick={() => onToggle(book)}
          className={`mt-4 w-full py-2 rounded-lg font-medium transition ${
            inList
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-green-600 hover:bg-green-500 text-white"
          }`}
        >
          {inList ? "Quitar de la lista" : "Añadir a la lista"}
        </button>
      </div>
    </div>
  );
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [list, setList] = useState<Book[]>([]);
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("all");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setList(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const toggleList = (book: Book) => {
    setList((prevList) =>
      prevList.find((b) => b.id === book.id)
        ? prevList.filter((b) => b.id !== book.id)
        : [...prevList, book]
    );
  };

  const filteredBooks =
    genreFilter === "all"
      ? books
      : books.filter((book) => book.genre === genreFilter);

  const genres = [...new Set(books.map((book) => book.genre))];

  const listIds = useMemo(() => new Set(list.map((b) => b.id)), [list]);

  const availableBooks = books.length - list.length;
  const readingCount = list.length;

  return (
    <div className="">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">📚 Biblioteca</h1>
        <div className="flex gap-6 mt-2 text-gray-300">
          <span>{availableBooks} libros disponibles</span>
          <span>{readingCount} en lista de lectura</span>
        </div>
      </header>

      {/* Filtro */}
      <div className="mb-6">
        <label className="text-gray-300 mr-2">Filtrar por género:</label>
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-2 rounded-lg bg-transparent text-gray-200"
        >
          <option value="all" className="text-gray-500 bg-neutral-600">Todos los géneros</option>
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Libros */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            inList={listIds.has(book.id)}
            onToggle={toggleList}
          />
        ))}
      </ul>

      {/* Lista de lectura */}
      <div className="mt-12">
        {list.length === 0 ? (
          <p className="text-gray-500 mt-6 text-center text-lg">
            Tu lista de lectura está vacía
          </p>
        ) : (
          <div className=" p-6 border border-neutral-700 rounded-2xl shadow-md">
            <h2 className="text-white text-xl mb-4 font-semibold">
              📖 Mi Lista de Lectura
            </h2>
            <ul className="space-y-3">
              {list.map((book) => (
                <li
                  key={book.id}
                  className="flex items-center justify-between rounded-xl p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 rounded-md object-cover"
                    />
                    <span className="text-gray-200 font-medium">
                      {book.title}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleList(book)}
                    className="text-red-400 hover:text-red-200 transition"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
