import { Search } from "lucide-react"

interface FilterProps {
  value: string
  onChange: (value: string) => void
}

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center bg-gray-800 text-white px-3 py-2 rounded-lg w-72">
        <Search size={16} className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o país"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none text-sm flex-1"
        />
      </div>
    </div>
  )
}
