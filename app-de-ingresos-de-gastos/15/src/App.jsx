import { Balance } from "./components/Balance"
import { Header } from "./components/Header"
import { IncomeExpenses } from "./components/IncomeExpenses"
import { TransactionList } from "./components/transaction/TransactionList"
import { TrasacionForm } from "./components/transaction/TrasacionForm"
import { GlobalProvider } from "./context/GlobalState"

function App() {
  return (
    <GlobalProvider>
      <div className="bg-zinc-900 text-white min-h-screen flex justify-center items-start p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-xl">
            <Header />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              <div className="lg:col-span-1 space-y-6">
                <Balance />
                <IncomeExpenses />
                <TrasacionForm />
              </div>
              
              <div className="lg:col-span-2">
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App