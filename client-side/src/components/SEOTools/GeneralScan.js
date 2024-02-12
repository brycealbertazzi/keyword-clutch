import React, { useEffect, useState } from 'react'
import './SEOTools.css'
import RankRocketUtils from '../../RankRocketUtils'
import axios from 'axios'

export const GeneralScan = () => {
  const [apiKey, setApiKey] = useState(null)
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [rawScrapingBeeData, setRawScrapingBeeData] = useState({})

  const runScrapingBeeWebScraper = () => {
    if (!apiKey) {
      console.error('ScrapingBee API key not found')
      return
    }
    if (!websiteUrl) { // If websiteUrl is an empty string ''
      console.error('Website URL not found')
      return
    }
    const apiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(websiteUrl)}&country_code=us&json_response=true`

    axios.get(apiUrl, { headers: { 'Content-Type': 'application/json' } }).then(response => {
      setRawScrapingBeeData(response.data)
    })
  }

  useEffect(() => {
    console.log('ScrapingBee data:', JSON.stringify(rawScrapingBeeData))
  }, [rawScrapingBeeData])

  useEffect(() => {
    RankRocketUtils.ScrapingBeeKey.then(apiKey => setApiKey(apiKey))
  }, [])

  return (
    <div className='section-container' id='general-scan'>
      <h1 className='section-title'>General Scan</h1>
      <p className='section-description'>Run a general scan of your website to see how it is ranking in SEO and find ways to improve its SEO performance. Includes a SERP analysis</p>
      <form className='general-scan-form'>
        <label htmlFor='website-url'>Enter your website URL:</label>
        <input type='text' id='website-url' name='website-url' onChange={(e) => setWebsiteUrl(e.target.value)}/>
        <button onClick={(e) => {e.preventDefault(); runScrapingBeeWebScraper()}}>Run SEO Scan</button>
      </form>
      <div className='general-scan-results'>

      </div>
    </div>
  )
}
