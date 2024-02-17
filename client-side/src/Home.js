import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { KeywordSuggestAPIData } from './components/KeywordSuggestAPIData'
import { YoutubeKeyworkAPIData } from './components/YoutubeKeyworkAPIData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ResultType } from './Utils'

export const Home = () => {
  const [keyword, setKeyword] = useState('')
  const [keywordSuggestAPIData, setKeywordSuggestAPIData] = useState(null)
  const [youtubeKeywordAPIData, setYoutubeKeywordAPIData] = useState(null)
  const [selectedResultType, setSelectedResultType] = useState(ResultType.GOOGLE)

  const submitKeyword = () => {
    // Retrieve keyword data from the KeySuggest Keyword Data API
    axios.get(`/api/keyword?keyword=${keyword}`)
      .then((response) => {
        setKeywordSuggestAPIData(response?.data?.data?.related_kw)
      })
      .catch((error) => {
        console.error('Error fetching keyword data:', error)
      })
    
    // Retrieve keyword data from the Keyword Research for YouTube API
    axios.get(`/api/youtube-keyword?keyword=${keyword}`)
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

  const changeResultType = (resultType) => {
    setSelectedResultType(resultType)
  }

  useEffect(() => {
    console.log('Youtube Keyword API Data:', youtubeKeywordAPIData)
  }, [keywordSuggestAPIData, youtubeKeywordAPIData])

  return (
    <div className='home-pg-content'>
      {/* Search Bar */}
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Enter your keyword" onChange={(e) => setKeyword(e.target.value)}/>
        <button className="search-button" onClick={submitKeyword}>Search</button>
      </div>
      {/* Result Type Select Tab: Google or Youtube */}
      <div className="result-type-select">
        <div>
          <button className="result-type-button" style={{backgroundColor: selectedResultType === ResultType.GOOGLE ? '#4285F4' : '#555'}} onClick={() => changeResultType(ResultType.GOOGLE)}>
            Google&nbsp;
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
        <div>
          <button className="result-type-button" style={{backgroundColor: selectedResultType === ResultType.YOUTUBE ? '#f44242' : '#555'}} onClick={() => changeResultType(ResultType.YOUTUBE)}>
            Youtube&nbsp;
            <FontAwesomeIcon icon={faYoutube} />
          </button>
        </div>
      </div>
      {/* Data Grids */}
      {selectedResultType === ResultType.GOOGLE && <KeywordSuggestAPIData data={keywordSuggestAPIData ? keywordSuggestAPIData : null}/>}
      {selectedResultType === ResultType.YOUTUBE && <YoutubeKeyworkAPIData data={youtubeKeywordAPIData ? youtubeKeywordAPIData : null}/>}
    </div>
  )
}
