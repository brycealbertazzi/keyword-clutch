  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect, useState, useContext } from 'react'
  import './KeywordScrape.css'
  import '../../App.css'
  import { LoadingSpinner } from '../../LoadingSpinner'
  import { ResultType, ResultTypeColors } from '../../Utils'
  import { Error } from '../error/Error'
  import axios from 'axios'
  import { KeywordCell } from './KeywordCell'
  import GlobalContext from '../../global/GlobalContext'

  export const KeywordScrape = ({apiData, url, loading, setLoadingTables, apiError, websiteText, optimizedKeywords, setOptimizedKeywords}) => {
    const globalContext = useContext(GlobalContext)
    const { websiteSEOStep, setWebsiteSEOStep, webUrlOptimizedText, setWebUrlOptimizedText } = globalContext

    const [keywordGroups, setKeywordGroups] = useState([])
    const [optimizedTextSections, setOptimizedTextSections] = useState([])

    const GROUP_SIZE = 5

    const optimizeForKeywords = () => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: true})
      axios.post('/api/data/openai-gpt3', {
        websiteText,
        optimizedKeywords,
      })
      .then((res) => {
        let tmpOptimizedText = res.data
        tmpOptimizedText.replace(/\n/g, '')
        setWebUrlOptimizedText(tmpOptimizedText)
      })
      .catch((error) => {
        console.error('Error:', error)
      }).finally(() => setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false}))
    }

    const MAX_SELECTED_KEYWORDS = 5
    const selectKeyword = (e) => {
      if (websiteSEOStep !== 1) return
      const selectedKeyword = e.target.innerText
      if (optimizedKeywords.includes(selectedKeyword)) {
        setOptimizedKeywords(optimizedKeywords.filter((keyword) => keyword !== selectedKeyword))
      } else {
        setOptimizedKeywords([...optimizedKeywords, selectedKeyword])
      }
    }

    useEffect(() => {
      let optimizedTextSections = webUrlOptimizedText.split('*del*')
      optimizedTextSections = optimizedTextSections.filter((section) => section.length > 0 && !section.includes('Keywords:'))
      setOptimizedTextSections(optimizedTextSections)
    }, [webUrlOptimizedText])

    useEffect(() => {
      if (!apiData) return
      var tmpGroups = []
      for (let i = 0; i < apiData.length; i += GROUP_SIZE) {
        var newGroup = apiData.slice(i, i + GROUP_SIZE)
        if (newGroup.length < GROUP_SIZE) {
          for (let j = newGroup.length; j < GROUP_SIZE; j++) {
            newGroup.push('')
          }
        }
        tmpGroups.push(newGroup)
      }
      setKeywordGroups(tmpGroups)
    }, [apiData])

    useEffect(() => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false})
    }, [keywordGroups])

    if (apiError) {
      return <Error resultType={ResultType.WEB_URL} input={url}/>
    }

    if (loading) {
      return <LoadingSpinner type={ResultType.WEB_URL}/>
    }

    if (!apiData) {
      return null
    }

    return (
      <>
        <div className='keyword-scrape-action-items'>
          <div></div>
          <div>
            {websiteSEOStep === 1 && <h2 style={{textAlign: 'center'}}>Select keywords for SEO optimization <span style={{fontSize: '15px'}}>(max. 5 keywords)</span></h2>}
            {websiteSEOStep === 2 && (
              <div className='optimized-text-headers'>
                <h2 style={{textAlign: 'center'}}>SEO optimized text for <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{url}</span></h2>
                <h2 style={{textAlign: 'center'}}>Keywords: {
                  optimizedKeywords.map((keyword, index) => <span key={index} style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{keyword}{index !== optimizedKeywords.length - 1 ? ',' : ''}&nbsp;</span>)
                }</h2>
              </div>
            )}
          </div>
          <div>
            <button className={websiteSEOStep >= 2 ? 'hidden-button' : 'app-button'} disabled={optimizedKeywords.length <= 0} onClick={() => {
              if (websiteSEOStep === 1) optimizeForKeywords()
              setWebsiteSEOStep(2)
            }}>
              Generate&nbsp;
            </button>
          </div>
        </div>
        {websiteSEOStep === 2 ?
          <div className='optimized-text-container'>
            {optimizedTextSections.map((section, index) => {
              var pattern = /(?<=\d):(?=\d)/g // Pattern to match colons between numbers
              const disallowedHeaders = ['Website text', 'SEO Optimized text', 'Optimized text']
              // Use replace method with the pattern to remove colons
              var modifiedSectionStr = section.replace(pattern, '')
              let sectionSplit = modifiedSectionStr.split(':')
              sectionSplit = sectionSplit.filter((section) => !disallowedHeaders.includes(section))
              console.log(sectionSplit)
              if (sectionSplit.length > 2) {
                return (
                  <div key={index} className='optimized-text-section'> 
                    {sectionSplit.map((split, idx) => {
                      return (<p key={idx} style={{textAlign: 'center', lineHeight: '1.75em'}}>{split}</p>)
                    })}
                  </div>
                )
              } else {
                const header = sectionSplit[0].replace(':', '')
                let content = sectionSplit[1] ? sectionSplit[1] : ''
                const LONG_HEADER = header.length > 30
                if (LONG_HEADER > 30) {
                  content = header.concat(content)
                }
                return (
                  <div key={index} className='optimized-text-section'>
                    {content && !LONG_HEADER && <h3 style={{textAlign: 'center'}}>{header}</h3>}
                    <p style={{textAlign: 'center', lineHeight: '1.75em'}}>{content ? content : header}</p>
                  </div>
                )
              }
            })}
          </div>
        :
          <div className='keyword-scrape-container'>
            <div className='keyword-display'>
              {keywordGroups.map((keywordGroup, grpIndex) => {
                return (
                  <div key={grpIndex} className='keyword-display-group'>
                    {keywordGroup.map((keyword, cellIndex) => 
                      <KeywordCell key={`${grpIndex}${cellIndex}`} keyword={keyword} selectKeyword={selectKeyword} allowedToSelect={optimizedKeywords.length < MAX_SELECTED_KEYWORDS}/>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        }
      </>
    )
  }
