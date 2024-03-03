import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./Home"
import './App.css'
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { GlobalStateProvider } from './global/GlobalState'
import { LandingPage } from './LandingPage'


function App() {

  return (
    <Router>
      <GlobalStateProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home/>} />
          </Routes>
          <Footer />
        </div>
      </GlobalStateProvider>
    </Router>
  )
}

export default App
