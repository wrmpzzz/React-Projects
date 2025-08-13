import React from 'react'
import { useGlobalState } from '../../context/GlobalState'

export const TransactionList = () => {
    const { transactions, deleteTransaction } = useGlobalState()

    return (
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">History</h3>
        <ul className="space-y-3">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`flex justify-between items-center p-3 rounded shadow-sm 
                ${transaction.amount < 0 ? 'bg-red-100 border-l-4 border-red-500' : 'bg-green-100 border-l-4 border-green-500'}`}
            >
              <p className="font-medium">{transaction.description}</p>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
                </span>
                <button 
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}