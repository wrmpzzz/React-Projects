import { useState, useEffect, useCallback } from 'react'
import './App.css'

type Operation = '+' | '-' | '×' | '÷'

interface ButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

function App() {
  const [value, setValue] = useState<string>('0')
  const [prev, setPrev] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation | null>(null)
  const [wait, setWait] = useState<boolean>(false)

  const inputNumber = useCallback((num: number): void => {
    if (wait) {
      setValue(String(num))
      setWait(false)
    } else if (value === '0' && num === 0 && !value.includes('.')) {
      return
    } else {
      setValue(value === '0' && num !== 0 ? String(num) : value + num)
    }
  }, [wait, value])

  const inputDecimal = useCallback((): void => {
    if (wait) {
      setValue('0.')
      setWait(false)
    } else if (!value.includes('.')) {
      setValue(value + '.')
    }
  }, [wait, value])

  const clear = useCallback((): void => {
    setValue('0')
    setPrev(null)
    setOperation(null)
    setWait(false)
  }, [])

  const deleteLast = useCallback((): void => {
    if (value.length > 1) {
      setValue(value.slice(0, -1))
    } else {
      setValue('0')
    }
  }, [value])

  const calculate = useCallback((firstValue: number, secondValue: number, operation: Operation): number => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return secondValue !== 0 ? firstValue / secondValue : 0
      default: return secondValue
    }
  }, [])

  const performOperation = useCallback((nextOperation: Operation): void => {
    const inputValue = parseFloat(value)

    if (prev !== null && operation) {
      const newValue = calculate(prev, inputValue, operation)
      setValue(String(newValue))
      setPrev(newValue)
    } else {
      setPrev(inputValue)
    }

    setWait(true)
    setOperation(nextOperation)
  }, [value, prev, operation, calculate])

  const handleEquals = useCallback((): void => {
    const inputValue = parseFloat(value)

    if (prev !== null && operation) {
      const newValue = calculate(prev, inputValue, operation)
      setValue(String(newValue))
      setPrev(null)
      setOperation(null)
      setWait(true)
    }
  }, [value, prev, operation, calculate])

  const handlePercentage = useCallback((): void => {
    const val = parseFloat(value) / 100
    setValue(String(val))
  }, [value])

  const handleToggleSign = useCallback((): void => {
    if (value !== '0') {
      setValue(value.startsWith('-') ? value.slice(1) : '-' + value)
    }
  }, [value])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      const key = event.key

      if (/[0-9+\-*/=.%]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault()
      }

      if (/[0-9]/.test(key)) inputNumber(parseInt(key))
      else if (key === '+') performOperation('+')
      else if (key === '-') performOperation('-')
      else if (key === '*') performOperation('×')
      else if (key === '/') performOperation('÷')
      else if (key === '.') inputDecimal()
      else if (key === '=' || key === 'Enter') handleEquals()
      else if (key === 'Escape') clear()
      else if (key === 'Backspace') deleteLast()
      else if (key === '%') handlePercentage()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [inputNumber, inputDecimal, performOperation, handleEquals, clear, deleteLast, handlePercentage])

  const Button: React.FC<ButtonProps> = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-2xl transition-all duration-200 active:scale-95 hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="max-w-sm mx-auto mt-8 bg-black rounded-3xl p-6 shadow-2xl w-full">
      {/* Display */}
      <div className="bg-black rounded-2xl p-6 mb-4">
        <div className="text-right">
          <div className="text-gray-400 text-lg min-h-6 flex items-end justify-end mb-2">
            {prev !== null && operation ? `${prev} ${operation}` : ''}
          </div>
          <div className="text-white text-4xl font-light min-h-12 flex items-end justify-end">
            {value.length > 9 ? parseFloat(value).toExponential(3) : value}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* First row */}
        <Button onClick={clear} className="bg-gray-500 hover:bg-gray-400 text-white">AC</Button>
        <Button onClick={handleToggleSign} className="bg-gray-500 hover:bg-gray-400 text-white">±</Button>
        <Button onClick={handlePercentage} className="bg-gray-500 hover:bg-gray-400 text-white">%</Button>
        <Button
          onClick={() => performOperation('÷')}
          className={`text-white ${operation === '÷' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400'}`}
        >
          ÷
        </Button>

        {/* Second row */}
        <Button onClick={() => inputNumber(7)} className="bg-gray-700 hover:bg-gray-600 text-white">7</Button>
        <Button onClick={() => inputNumber(8)} className="bg-gray-700 hover:bg-gray-600 text-white">8</Button>
        <Button onClick={() => inputNumber(9)} className="bg-gray-700 hover:bg-gray-600 text-white">9</Button>
        <Button
          onClick={() => performOperation('×')}
          className={`text-white ${operation === '×' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400'}`}
        >
          ×
        </Button>

        {/* Third row */}
        <Button onClick={() => inputNumber(4)} className="bg-gray-700 hover:bg-gray-600 text-white">4</Button>
        <Button onClick={() => inputNumber(5)} className="bg-gray-700 hover:bg-gray-600 text-white">5</Button>
        <Button onClick={() => inputNumber(6)} className="bg-gray-700 hover:bg-gray-600 text-white">6</Button>
        <Button
          onClick={() => performOperation('-')}
          className={`text-white ${operation === '-' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400'}`}
        >
          -
        </Button>

        {/* Fourth row */}
        <Button onClick={() => inputNumber(1)} className="bg-gray-700 hover:bg-gray-600 text-white">1</Button>
        <Button onClick={() => inputNumber(2)} className="bg-gray-700 hover:bg-gray-600 text-white">2</Button>
        <Button onClick={() => inputNumber(3)} className="bg-gray-700 hover:bg-gray-600 text-white">3</Button>
        <Button
          onClick={() => performOperation('+')}
          className={`text-white ${operation === '+' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400'}`}
        >
          +
        </Button>

        {/* Fifth row */}
        <Button onClick={() => inputNumber(0)} className="bg-gray-700 hover:bg-gray-600 text-white col-span-2">0</Button>
        <Button onClick={inputDecimal} className="bg-gray-700 hover:bg-gray-600 text-white">.</Button>
        <Button onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white">=</Button>
      </div>
    </div>
  )
}

export default App
