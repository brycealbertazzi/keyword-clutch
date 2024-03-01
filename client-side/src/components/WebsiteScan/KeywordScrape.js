  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect, useState } from 'react'
  import './KeywordScrape.css'
  import '../../App.css'
  import { LoadingSpinner } from '../../LoadingSpinner'
  import { ResultType, ResultTypeColors } from '../../Utils'
  import { Error } from '../error/Error'

  export const KeywordScrape = ({apiData, url, loading, setLoadingTables, apiError}) => {
    const [keywordGroups, setKeywordGroups] = useState([])
    const [step, setStep] = useState(1)
    const [stepTitle, setStepTitle] = useState('')

    const GROUP_SIZE = 5

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
      setStep(1)
    }, [apiData])

    useEffect(() => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false})
    }, [keywordGroups])

    return (
      <div>
        {apiError && <Error resultType={ResultType.WEB_URL} input={url}/>}
        {loading && <LoadingSpinner type={ResultType.WEB_URL}/>}
        {apiData && !loading && !apiError &&
          <div>
            <div className='keyword-scrape-action-items'>
              <div>
                <button className={step <= 1 ? 'hidden-button' : 'app-button'} onClick={() => setStep((step) => step - 1)}>
                  Back&nbsp;
                </button>
              </div>
              <div>
                {step === 1 && <h2 style={{textAlign: 'center'}}>Keywords for <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{url}</span></h2>}
                {step === 2 && <h2 style={{textAlign: 'center'}}>Select keywords for SEO optimization</h2>}
                {step === 3 && <h2 style={{textAlign: 'center'}}>SEO Optimized text for <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{url}</span></h2>}
              </div>
              <div>
                <button className={step >= 3 ? 'hidden-button' : 'app-button'} onClick={() => setStep((step) => step + 1)}>
                  Next&nbsp;
                </button>
              </div>
            </div>
            <div className='keyword-scrape-container'>
              <div className='keyword-display'>
                {keywordGroups.map((keywordGroup, index) => {
                  return (
                    <div key={index} className='keyword-display-group'>
                      {keywordGroup.map((keyword, index) => {
                        return <div key={index} className='keyword-display-cell'>{keyword}</div>
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
