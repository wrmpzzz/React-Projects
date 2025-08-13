import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        opacity: 0.8,
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        zIndex: -1000,
        cursor: 'pointer',
        border: '2px solid #fff',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable' : 'Enable'} seguir el puntero</button>
    </main>
  )
}

export default App
