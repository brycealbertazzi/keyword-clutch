import React, { useState } from 'react'
import { Home } from "./Home"
import './App.css'
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { GlobalStateProvider } from './global/GlobalState'

function App() {
  const [tmpHideFooter, setTmpHideFooter] = useState(false)

  return (
    <GlobalStateProvider>
      <div className="App">
        <Navbar />
        <Home setTmpHideFooter={setTmpHideFooter}/>
        {!tmpHideFooter && <Footer />}
      </div>
    </GlobalStateProvider>
  )
}

export default App
