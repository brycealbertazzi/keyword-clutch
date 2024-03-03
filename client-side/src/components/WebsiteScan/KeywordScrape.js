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
    const { optimizedText, setOptimizedText, websiteSEOStep, setWebsiteSEOStep } = globalContext

    const [keywordGroups, setKeywordGroups] = useState([])
    const [optimizedTextSections, setOptimizedTextSections] = useState([])

    const GROUP_SIZE = 5

    const optimizeForKeywords = () => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: true})
      axios.post('/api/openai-gpt3', {
        websiteText,
        optimizedKeywords,
      })
      .then((res) => {
        setOptimizedText(res.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      }).finally(() => setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false}))
    }

    const selectKeyword = (e) => {
      if (websiteSEOStep !== 1) return
      const selectedKeyword = e.target.innerText
      if (optimizedKeywords.includes(selectedKeyword)) {
        setOptimizedKeywords(optimizedKeywords.filter((keyword) => keyword !== selectedKeyword))
      } else {
        setOptimizedKeywords([...optimizedKeywords, selectedKeyword])
      }
    }

    const updateOptimizedTextSections = () => {
      let optimizedTextSections = optimizedText.split('*del*')
      optimizedTextSections = optimizedTextSections.filter((section) => section.length > 0 && !section.includes('Keywords:'))
      setOptimizedTextSections(optimizedTextSections)
    }

    useEffect(() => {
      updateOptimizedTextSections()
    }, [optimizedText])

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
      updateOptimizedTextSections()
    }, [apiData])

    useEffect(() => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false})
    }, [keywordGroups])

    useEffect(() => {
      console.log(websiteSEOStep)
    }, [websiteSEOStep])

    return (
      <div>
        {apiError && <Error resultType={ResultType.WEB_URL} input={url}/>}
        {loading && <LoadingSpinner type={ResultType.WEB_URL}/>}
        {apiData && !loading && !apiError &&
          <div>
            <div className='keyword-scrape-action-items'>
              <div></div>
              <div>
                {websiteSEOStep === 1 && <h2 style={{textAlign: 'center'}}>Select keywords for SEO optimization</h2>}
                {websiteSEOStep === 2 && <h2 style={{textAlign: 'center'}}>SEO Optimized text for <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{url}</span></h2>}
              </div>
              <div>
                <button className={websiteSEOStep >= 2 ? 'hidden-button' : 'app-button'} onClick={() => {
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
                  const sectionSplit = section.split(':')
                  const header = sectionSplit[0].replace(':', '')
                  let content = sectionSplit[1] ? sectionSplit[1] : ''
                  const LONG_HEADER = header.length > 30
                  if (LONG_HEADER > 30) {
                    content = header.concat(content)
                  }
                  return (
                    <div key={index} className='optimized-text-section'>
                      {content && !LONG_HEADER && <h3 style={{textAlign: 'center'}}>{header}</h3>}
                      <p style={{textAlign: 'center'}}>{content ? content : header}</p>
                    </div>
                  )
                })}
              </div>
            :
              <div className='keyword-scrape-container'>
                <div className='keyword-display'>
                  {keywordGroups.map((keywordGroup, grpIndex) => {
                    return (
                      <div key={grpIndex} className='keyword-display-group'>
                        {keywordGroup.map((keyword, cellIndex) => 
                          <KeywordCell key={`${grpIndex}${cellIndex}`} keyword={keyword} selectKeyword={selectKeyword}/>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
