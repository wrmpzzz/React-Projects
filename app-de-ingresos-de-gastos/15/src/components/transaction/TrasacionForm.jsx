import { useState } from "react"
import { useGlobalState } from "../../context/GlobalState"
export const TrasacionForm = () => {  const { addTransaction } = useGlobalState()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!description.trim()) {
            setError('Description is required')
            return
        }
        
        if (amount === 0) {
            setError('Amount cannot be zero')
            return
        }

        addTransaction({
            id: window.crypto.randomUUID(),
            description,
            amount: +amount,
        })
        
        // Reset form
        setDescription('')
        setAmount(0)
        setError('')
    }

    return (
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded">
              <p>{error}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Groceries, Salary, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-700 text-white px-4 py-2 rounded-lg block w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
              Amount <span className="text-xs">(positive for income, negative for expense)</span>
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              placeholder="00.00"
              value={amount || ''}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-zinc-700 text-white px-4 py-2 rounded-lg block w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg block w-full transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    );
}