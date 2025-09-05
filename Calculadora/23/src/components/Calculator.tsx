import { useCalculator } from "../hooks/useCalculator"
import { Button } from "./Button"
import { Display } from "./Display"

export const Calculator: React.FC = () => {
  const {
    value, prev, operation,
    inputNumber, inputDecimal,
    clear, deleteLast,
    performOperation, handleEquals,
    handlePercentage
  } = useCalculator()

  return (
    <div className="max-w-sm mx-auto mt-8 bg-black rounded-3xl p-6 shadow-2xl">
      <Display value={value} prev={prev} operation={operation} />

      <div className="grid grid-cols-4 gap-3">
        <Button onClick={clear} className="bg-gray-500 text-white">AC</Button>
        <Button onClick={deleteLast} className="bg-gray-500 text-white">⌫</Button>
        <Button onClick={handlePercentage} className="bg-gray-500 text-white">%</Button>
        <Button onClick={() => performOperation("÷")} className={`text-white ${operation === "÷" ? "bg-white text-orange-500" : "bg-orange-500"}`}>÷</Button>

        <Button onClick={() => inputNumber(7)} className="bg-gray-700 text-white">7</Button>
        <Button onClick={() => inputNumber(8)} className="bg-gray-700 text-white">8</Button>
        <Button onClick={() => inputNumber(9)} className="bg-gray-700 text-white">9</Button>
        <Button onClick={() => performOperation("×")} className={`text-white ${operation === "×" ? "bg-white text-orange-500" : "bg-orange-500"}`}>×</Button>

        <Button onClick={() => inputNumber(4)} className="bg-gray-700 text-white">4</Button>
        <Button onClick={() => inputNumber(5)} className="bg-gray-700 text-white">5</Button>
        <Button onClick={() => inputNumber(6)} className="bg-gray-700 text-white">6</Button>
        <Button onClick={() => performOperation("-")} className={`text-white ${operation === "-" ? "bg-white text-orange-500" : "bg-orange-500"}`}>-</Button>

        <Button onClick={() => inputNumber(1)} className="bg-gray-700 text-white">1</Button>
        <Button onClick={() => inputNumber(2)} className="bg-gray-700 text-white">2</Button>
        <Button onClick={() => inputNumber(3)} className="bg-gray-700 text-white">3</Button>
        <Button onClick={() => performOperation("+")} className={`text-white ${operation === "+" ? "bg-white text-orange-500" : "bg-orange-500"}`}>+</Button>

        <Button onClick={() => inputNumber(0)} className="bg-gray-700 text-white col-span-2">0</Button>
        <Button onClick={inputDecimal} className="bg-gray-700 text-white">.</Button>
        <Button onClick={handleEquals} className="bg-orange-500 text-white">=</Button>
      </div>
    </div>
  )
}
