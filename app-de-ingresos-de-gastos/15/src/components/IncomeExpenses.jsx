import React from 'react'
import { useGlobalState } from '../context/GlobalState'

export const IncomeExpenses = () => {
    const { transactions } = useGlobalState()

    const amounts = transactions.map(transaction => transaction.amount)

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)

    const expense = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1)

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    return (
        <div className="flex justify-between my-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="text-center flex-1">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider">Income</h4>
                <p className="text-green-500 font-bold text-xl mt-1">
                    {formatMoney(income)}
                </p>
            </div>
            
            <div className="border-l border-gray-600 mx-4"></div>
            
            <div className="text-center flex-1">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider">Expense</h4>
                <p className="text-red-500 font-bold text-xl mt-1">
                    {formatMoney(expense)}
                </p>
            </div>
        </div>
    )
}