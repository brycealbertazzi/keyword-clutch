import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./Home"
import './App.css'
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { GlobalStateProvider } from './global/GlobalState'
import { LandingPage } from './LandingPage'
import { StripeContainer } from './components/stripe/StripeContainer';
import { Pricing } from './components/Pricing';
import { ManageAccount } from './UserAccount/ManageAccount';

function App() {

  return (
    <Router>
        <GlobalStateProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/payment" element={<StripeContainer />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/account" element={<ManageAccount />} />
            </Routes>
            <Footer />
          </div>
        </GlobalStateProvider>
    </Router>
  )
}

export default App
