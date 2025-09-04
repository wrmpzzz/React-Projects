interface SorterProps {
  sortBy: "name" | "country" | null
  onSort: (type: "name" | "country" | null) => void
}

export default function Sorter({ sortBy, onSort }: SorterProps) {
  return (
    <div className="flex justify-center gap-3 mb-6">
      <button
        onClick={() => onSort("name")}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === "name"
            ? "bg-purple-700 text-white shadow-lg"
            : "bg-purple-600 hover:bg-purple-700 text-white/80 hover:text-white"
        }`}
      >
        Ordenar por nombre
      </button>

      <button
        onClick={() => onSort("country")}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === "country"
            ? "bg-yellow-700 text-white shadow-lg"
            : "bg-yellow-600 hover:bg-yellow-700 text-white/80 hover:text-white"
        }`}
      >
        Ordenar por país
      </button>

      <button
        onClick={() => onSort(null)}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === null
            ? "bg-gray-700 text-white shadow-lg"
            : "bg-gray-600 hover:bg-gray-700 text-white/80 hover:text-white"
        }`}
      >
        Quitar orden
      </button>
    </div>
  )
}
