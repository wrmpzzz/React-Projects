interface DisplayProps {
  value: string
  prev: number | null
  operation: string | null
}

export const Display: React.FC<DisplayProps> = ({ value, prev, operation }) => (
  <div className="bg-black rounded-2xl p-6 mb-4">
    <div className="text-right">
      <div className="text-gray-400 text-lg min-h-6 flex items-end justify-end mb-2">
        {prev !== null && operation ? `${prev} ${operation}` : ""}
      </div>
      <div className="text-white text-4xl font-light min-h-12 flex items-end justify-end">
        {value.length > 9 ? parseFloat(value).toExponential(3) : value}
      </div>
    </div>
  </div>
)
