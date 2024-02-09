import React from 'react'
import './SEOTools.css'
import RankRocketAPIUtils from './RankRocketApiUtils'

export const GeneralScan = () => {

  // Run a google SERP analysis
  const runSERPAnalysis = async (businessName) => {
    const response = await RankRocketAPIUtils.fetchGoogleSerpResults(businessName)
    console.log(response)
  }

  return (
    <div className='section-container' id='general-scan'>
      <h1 className='section-title'>General Scan</h1>
      <p className='section-description'>Run a general scan of your website to see how it is ranking in SEO and find ways to improve its SEO performance. Includes a SERP analysis</p>
      <button onClick={() => runSERPAnalysis('Albertazzi Law Firm')}>Run SERP Analysis</button>
      <div className='general-scan-results'>

      </div>
    </div>
  )
}
