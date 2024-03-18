import React, { useState, useContext } from 'react'
import axios from 'axios'
import './Home.css'
import './App.css'
import { KeywordSuggestAPIData } from './components/KeywordSearch/KeywordSuggestAPIData'
import { YoutubeKeywordAPIData } from './components/KeywordSearch/YoutubeKeywordAPIData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { InputType, ResultType, ResultTypeColors, extractKeywords } from './Utils'
import { KeywordScrape } from './components/WebsiteScan/KeywordScrape'
import GlobalContext from './global/GlobalContext'

export const Home = () => {
  const globalContext = useContext(GlobalContext)
  const { setTmpHideFooter, setWebsiteSEOStep } = globalContext
  const [userInput, setUserInput] = useState({
    [InputType.KEYWORD]: '',
    [InputType.URL]: ''
  })
  const [loadingTables, setLoadingTables] = useState({
    [ResultType.GOOGLE]: false,
    [ResultType.YOUTUBE]: false,
    [ResultType.WEB_URL]: false
  })
  const [keyword, setKeyword] = useState('')
  const [url, setUrl] = useState('')

  const [googleSearchResults, setGoogleSearchResults] = useState(null)
  const [youtubeSearchResults, setYoutubeSearchResults] = useState(null)
  const [webUrlKeywordResults, setWebUrlKeywordResults] = useState(null)

  const [selectedResultType, setSelectedResultType] = useState(ResultType.WEB_URL)

  const [googleApiError, setGoogleApiError] = useState(false)
  const [youtubeApiError, setYoutubeApiError] = useState(false)
  const [webUrlApiError, setWebUrlApiError] = useState(false)

  const [websiteText, setWebsiteText] = useState('')
  const [optimizedKeywords, setOptimizedKeywords] = useState([])

  const submitKeyword = () => {
    const currentKeyword = userInput[InputType.KEYWORD]
    if (currentKeyword.length <= 0) return
    setKeyword(currentKeyword)
    // Retrieve keyword data from the KeySuggest Keyword Data API
    setLoadingTables({...loadingTables, [ResultType.GOOGLE]: true, [ResultType.YOUTUBE]: true})
    setGoogleApiError(false)
    setYoutubeApiError(false)
    axios.get(`/api/data/keyword?keyword=${currentKeyword}`)
      .then((response) => {
        const googleKeywordData = response?.data?.data?.related_kw
        setGoogleSearchResults(googleKeywordData)
        if (!googleKeywordData || googleKeywordData.length <= 0) {
          setGoogleApiError(true)
          setLoadingTables({...loadingTables, [ResultType.GOOGLE]: false})
        }
      })
      .catch((error) => {
        console.log('Error fetching keyword data: ', error)
        setGoogleApiError(true)
        setLoadingTables({...loadingTables, [ResultType.GOOGLE]: false})
      })
    
    // Retrieve keyword data from the Keyword Research for YouTube API
    axios.get(`/api/data/youtube-keyword?keyword=${currentKeyword}`)
      .then((response) => {
        let youtubeKeywordData = []
        if (response?.data?.exact_keyword) youtubeKeywordData = youtubeKeywordData.concat(response?.data?.exact_keyword)
        if (response?.data?.related_keywords) youtubeKeywordData = youtubeKeywordData.concat(response?.data?.related_keywords)
        setYoutubeSearchResults(youtubeKeywordData.length > 0 ? youtubeKeywordData : null)
        if (youtubeKeywordData.length <= 0) {
          setYoutubeApiError(true)
          setLoadingTables({...loadingTables, [ResultType.YOUTUBE]: false})
        }
      })
      .catch((error) => {
        console.log('Error fetching keyword data: ', error)
        setYoutubeApiError(true)
        setLoadingTables({...loadingTables, [ResultType.YOUTUBE]: false})
      })
  }

  const submitWebUrl = () => {
    setOptimizedKeywords([])
    setWebsiteSEOStep(1)
    const currentUrl = userInput[InputType.URL]
    if (currentUrl.length <= 0) return
    setUrl(currentUrl)
    let modifiedUrl = !currentUrl.startsWith('https') && !currentUrl.startsWith('http') ? `https://${currentUrl}` : currentUrl
    // Add www to url
    if (!modifiedUrl.includes('www.')) {
      const urlParts = modifiedUrl.split('://')
      modifiedUrl = `${urlParts[0]}://www.${urlParts[1]}`
    }
    setLoadingTables({...loadingTables, [ResultType.WEB_URL]: true})
    setWebUrlApiError(false)
    axios.get(`/api/data/weburl?websiteUrl=${modifiedUrl}`)
      .then((response) => {
        const websiteText = response?.data
        setWebsiteText(websiteText)
        if (websiteText && websiteText.length > 0) {
          const extractedKeywords = extractKeywords(websiteText)
          setWebUrlKeywordResults(extractedKeywords)
        } else {
          setWebUrlApiError(true)
          setLoadingTables({...loadingTables, [ResultType.WEB_URL]: false})
        }
      })
      .catch((error) => {
        console.log('Error fetching url data: ', error)
        setWebUrlApiError(true)
        setLoadingTables({...loadingTables, [ResultType.WEB_URL]: false})
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
    if (document.querySelector('.data-container')) {
      setTmpHideFooter(true)
      setTimeout(() => {
        setTmpHideFooter(false)
      }, 100)
    }
    setSelectedResultType(resultType)
    setUserInput({
      [InputType.KEYWORD]: '',
      [InputType.URL]: ''
    })
  }

  return (
    <div className='page-content'>
      {/* Result Type Select Tab: Google or Youtube */}
      <div className="result-type-select">
        <div>
          <button className="app-button" style={{backgroundColor: selectedResultType === ResultType.WEB_URL ? ResultTypeColors[ResultType.WEB_URL]  : '#555'}} onClick={() => handleChangeResultType(ResultType.WEB_URL)}>
            Website&nbsp;
            <FontAwesomeIcon icon={faGlobe} />
          </button>
        </div>
        <div>
          <button className="app-button" style={{backgroundColor: selectedResultType === ResultType.GOOGLE ? ResultTypeColors[ResultType.GOOGLE] : '#555'}} onClick={() => handleChangeResultType(ResultType.GOOGLE)}>
            Google&nbsp;
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
        <div>
          <button className="app-button" style={{backgroundColor: selectedResultType === ResultType.YOUTUBE ? ResultTypeColors[ResultType.YOUTUBE]  : '#555'}} onClick={() => handleChangeResultType(ResultType.YOUTUBE)}>
            Youtube&nbsp;
            <FontAwesomeIcon icon={faYoutube} />
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
      {selectedResultType === ResultType.GOOGLE && <KeywordSuggestAPIData apiData={googleSearchResults ? googleSearchResults : null} keyword={keyword} loading={loadingTables[ResultType.GOOGLE]} setLoadingTables={setLoadingTables} apiError={googleApiError}/>}
      {selectedResultType === ResultType.YOUTUBE && <YoutubeKeywordAPIData apiData={youtubeSearchResults ? youtubeSearchResults : null} keyword={keyword} loading={loadingTables[ResultType.YOUTUBE]} setLoadingTables={setLoadingTables} apiError={youtubeApiError}/>}
      {selectedResultType === ResultType.WEB_URL && 
        <KeywordScrape 
          apiData={webUrlKeywordResults ? webUrlKeywordResults : null} 
          url={url} 
          loading={loadingTables[ResultType.WEB_URL]} 
          setLoadingTables={setLoadingTables} 
          apiError={webUrlApiError} 
          websiteText={websiteText} 
          optimizedKeywords={optimizedKeywords}  
          setOptimizedKeywords={setOptimizedKeywords}
        />
      }
    </div>
  )
}
