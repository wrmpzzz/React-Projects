import { useCallback, useEffect, useState } from "react"
import type { Operation } from "../types"

export const useCalculator = () => {
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

  return {
    value,
    prev,
    operation,
    wait,
    inputNumber,
    inputDecimal,
    clear,
    deleteLast,
    performOperation,
    handleEquals,
    handlePercentage,
    handleToggleSign,
  }
}