import React, { useEffect, useState } from 'react'
import './SEOTools.css'

export const KeywordResearch = () => {
  const [keyword, setKeyword] = useState('')
  const [businessType, setBusinessType] = useState('')

  // Use chat gpt to find a random 5+ high ranking seo websites in the user's business field
  const getHighRankingWebsites = (businessType) => {
    const url = 'https://api.openai.com/v1/completions'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`
    }

    const prompt = `Find 5+ high ranking SEO websites in the ${businessType} field`

    const data = {
      model: 'gpt-3.5-turbo-0125', // Specify the model you want to use
      prompt: prompt,
      max_tokens: 50 // Specify the maximum number of tokens for the completion
    }

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }).then(response => {
      console.log(response.json().choices[0].text) // Output the response text
    }).catch(error => console.error('Error:', error))
  }

  // Web scrape those websites and return how many times the keyword is used in the website



  const generateResults = (keyword, businessType) => {
    console.log(keyword, businessType)
    getHighRankingWebsites(businessType)
  }

  useEffect(() => {
    console.log(businessType, keyword)
  }, [businessType, keyword])

  return (
    <div className='section-container' id='keyword-research'>
      <h1 className='section-title'>Keyword Research</h1>
      <p className='section-description'>Keyword Research is a key part of any SEO strategy. It's important to understand what keywords are being searched for and how competitive they are in your field of business. This will help you to understand what keywords to target and how to optimise your content.</p>
      {/* Take in a keyword and return how often that keyword is used in other popular websites related to the business field */}
      <form className='keyword-form'>
        <label htmlFor='keyword'>Enter a keyword:</label>
        <input type='text' id='keyword' name='keyword' onChange={(e) => setKeyword(e.target.value)}/>
        <label htmlFor='business-field'>Business Type:</label>
        <input type='text' id='business-field' name='business-field' onChange={(e) => setBusinessType(e.target.value)}/>
        <button onClick={(e) => {e.preventDefault(); generateResults(keyword, businessType)}}>Research</button>
      </form>
      <div className='keyword-results'>

      </div>
    </div>
  )
}
