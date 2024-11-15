import React, { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'

function App() {
  const [count, setCount] = useState<Array<unknown>>([])

  const get = async () => {

    const data = await fetch('/sw/products')

    const json = await data.json()

    setCount(json)
  }

  const creeeate = async () => {

    await fetch('/sw/products', { method: 'POST' })

    await get()
  }

  React.useEffect(() => {
    get()
  }, [])


  return (
    <>
      <div style={{ display: "flex", gap: 8, flexDirection: 'column' }}>

        {JSON.stringify(count)}

        <button onClick={creeeate}>
          Create
        </button>
      </div>
      <PWABadge />
    </>
  )
}

export default App
