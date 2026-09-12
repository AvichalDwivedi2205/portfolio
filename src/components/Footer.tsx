import { useEffect, useState } from 'react'

function Clock() {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).toLowerCase())
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return <span>india · {t}</span>
}

export function Footer() {
  return (
    <footer>
      <div className="wrap mono">
        <span>© 2026 avichal dwivedi</span>
        <Clock />
      </div>
    </footer>
  )
}
