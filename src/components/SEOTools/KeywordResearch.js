import React from 'react'
import './SEOTools.css'

export const KeywordResearch = () => {

  // Use chat gpt to find a random 5+ high ranking seo websites in the user's business field

  // Web scrape those websites and return how many times the keyword is used in the website

  return (
    <div className='section-container' id='keyword-research'>
      <h1 className='section-title'>Keyword Research</h1>
      <p className='section-description'>Keyword Research is a key part of any SEO strategy. It's important to understand what keywords are being searched for and how competitive they are in your field of business. This will help you to understand what keywords to target and how to optimise your content.</p>
      {/* Take in a keyword and return how often that keyword is used in other popular websites related to the business field */}
      <form className='keyword-form'>
        <label htmlFor='keyword'>Enter a keyword:</label>
        <input type='text' id='keyword' name='keyword' />
        <button type='submit'>Research</button>
      </form>
      <div className='keyword-results'>

      </div>
    </div>
  )
}
