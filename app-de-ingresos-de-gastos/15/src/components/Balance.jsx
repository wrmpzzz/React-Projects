import { useGlobalState } from "../context/GlobalState"

export const Balance = () => {
    const { transactions } = useGlobalState()
    
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0)
    
    // Función para formatear el balance con color y signo
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-400">Your Balance</h3>
            <h1 className={`text-3xl font-bold ${total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatBalance(total)}
            </h1>
            
            {/* Resumen de ingresos y gastos (opcional) */}
            <div className="flex justify-between mt-4 bg-gray-800 p-3 rounded-lg">
                <div className="text-center">
                    <h4 className="text-gray-300">Income</h4>
                    <p className="text-green-400 font-medium">
                        {formatBalance(amounts.filter(item => item > 0).reduce((a, b) => a + b, 0))}
                    </p>
                </div>
                <div className="border-l border-gray-600"></div>
                <div className="text-center">
                    <h4 className="text-gray-300">Expense</h4>
                    <p className="text-red-400 font-medium">
                        {formatBalance(amounts.filter(item => item < 0).reduce((a, b) => a + b, 0))}
                    </p>
                </div>
            </div>
        </div>
    )
}