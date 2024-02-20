import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'
import { KeywordSuggestAPIData } from './components/KeywordSuggestAPIData'
import { YoutubeKeyworkAPIData } from './components/YoutubeKeyworkAPIData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { InputType, ResultType, extractKeywords } from './Utils'
import { KeywordScrape } from './components/KeywordScrape'

export const Home = () => {
  const [userInput, setUserInput] = useState({
    [InputType.KEYWORD]: '',
    [InputType.URL]: ''
  })
  const [keyword, setKeyword] = useState('')
  const [url, setUrl] = useState('')
  const [keywordSuggestAPIData, setKeywordSuggestAPIData] = useState(null)
  const [youtubeKeywordAPIData, setYoutubeKeywordAPIData] = useState(null)
  const [websiteScrapeApiData, setWebsiteScrapeApiData] = useState(null)
  const [selectedResultType, setSelectedResultType] = useState(ResultType.GOOGLE)

  const submitKeyword = () => {
    const currentKeyword = userInput[InputType.KEYWORD]
    if (currentKeyword.length <= 0) return
    setKeyword(currentKeyword)
    // Retrieve keyword data from the KeySuggest Keyword Data API
    axios.get(`/api/keyword?keyword=${currentKeyword}`)
      .then((response) => {
        setKeywordSuggestAPIData(response?.data?.data?.related_kw)
      })
      .catch((error) => {
        console.error('Error fetching keyword data:', error)
      })
    
    // Retrieve keyword data from the Keyword Research for YouTube API
    axios.get(`/api/youtube-keyword?keyword=${currentKeyword}`)
      .then((response) => {
        let youtubeKeywordData = []
        if (response?.data?.exact_keyword) youtubeKeywordData = youtubeKeywordData.concat(response?.data?.exact_keyword)
        if (response?.data?.related_keywords) youtubeKeywordData = youtubeKeywordData.concat(response?.data?.related_keywords)
        setYoutubeKeywordAPIData(youtubeKeywordData.length > 0 ? youtubeKeywordData : null)
      })
      .catch((error) => {
        console.error('Error fetching youtube keyword data:', error)
      })
  }

  const submitWebUrl = () => {
    const currentUrl = userInput[InputType.URL]
    if (currentUrl.length <= 0) return
    setUrl(currentUrl)
    const modifiedUrl = !currentUrl.startsWith('https') && !currentUrl.startsWith('http') ? `https://${currentUrl}` : currentUrl
    axios.get(`/api/weburl?websiteUrl=${modifiedUrl}`)
      .then((response) => {
        const websiteText = response?.data
        if (websiteText && websiteText.length > 0) {
          const extractedKeywords = extractKeywords(websiteText)
          setWebsiteScrapeApiData(extractedKeywords)
        }
      })
      .catch((error) => {
        console.error('Error fetching keyword density data:', error)
      })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (selectedResultType === ResultType.WEB_URL) submitWebUrl()
      else submitKeyword()
    }
  }

  const handleInputChange = (e, type) => {
    setUserInput({
      ...userInput,
      [selectedResultType === ResultType.WEB_URL ? InputType.URL : InputType.KEYWORD]: e.target.value
    })
  }

  const handleSubmit = () => {
    if (selectedResultType === ResultType.WEB_URL) submitWebUrl()
    else submitKeyword()
  }

  const handleChangeResultType = (resultType) => {
    setSelectedResultType(resultType)
    setUserInput({
      [InputType.KEYWORD]: '',
      [InputType.URL]: ''
    })
  }

  return (
    <div className='home-pg-content'>
      {/* Result Type Select Tab: Google or Youtube */}
      <div className="result-type-select">
        <div>
          <button className="result-type-button" style={{backgroundColor: selectedResultType === ResultType.GOOGLE ? '#4285F4' : '#555'}} onClick={() => handleChangeResultType(ResultType.GOOGLE)}>
            Google&nbsp;
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
        <div>
          <button className="result-type-button" style={{backgroundColor: selectedResultType === ResultType.YOUTUBE ? '#f44242' : '#555'}} onClick={() => handleChangeResultType(ResultType.YOUTUBE)}>
            Youtube&nbsp;
            <FontAwesomeIcon icon={faYoutube} />
          </button>
        </div>
        <div>
          <button className="result-type-button" style={{backgroundColor: selectedResultType === ResultType.WEB_URL ? '#ad9f2f' : '#555'}} onClick={() => handleChangeResultType(ResultType.WEB_URL)}>
            Website&nbsp;
            <FontAwesomeIcon icon={faGlobe} />
          </button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="search-container">
        <input type="text" className="search-input" placeholder={selectedResultType === ResultType.WEB_URL ? 'Enter a URL...' : 'Enter a keyword...'} value={selectedResultType === ResultType.WEB_URL ? userInput[InputType.URL] : userInput[InputType.KEYWORD]} onChange={(e) => handleInputChange(e)} onKeyDown={handleKeyPress}/>
        <button className="search-button" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color='white' size='xl'/>
        </button>
      </div>
      {/* Data Grids */}
      {selectedResultType === ResultType.GOOGLE && <KeywordSuggestAPIData apiData={keywordSuggestAPIData ? keywordSuggestAPIData : null} keyword={keyword}/>}
      {selectedResultType === ResultType.YOUTUBE && <YoutubeKeyworkAPIData apiData={youtubeKeywordAPIData ? youtubeKeywordAPIData : null} keyword={keyword}/>}
      {selectedResultType === ResultType.WEB_URL && <KeywordScrape apiData={websiteScrapeApiData} url={url}/>}
    </div>
  )
}
