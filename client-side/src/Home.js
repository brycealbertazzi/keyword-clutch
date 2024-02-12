import React from 'react'
import { Navbar } from './components/Navbar'
import { GeneralScan } from './components/SEOTools/GeneralScan'
import { KeywordResearch } from './components/SEOTools/KeywordResearch'
import { CompetitorAnalysis } from './components/SEOTools/CompetitorAnalysis'
import { Footer } from './components/Footer'

export const Home = () => {
  return (
    <div id='home'>
      <Navbar />
      <div style={{marginTop: 120}}>
        <GeneralScan />
        <KeywordResearch />
        <CompetitorAnalysis />
        <Footer />
      </div>
    </div>
  )
}
