  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect, useState } from 'react'
  import './KeywordScrape.css'
  import '../Home.css'
  import { LoadingSpinner } from '../LoadingSpinner'
import { ResultType, ResultTypeColors } from '../Utils'
import { Error } from './error/Error'

  export const KeywordScrape = ({apiData, url, loading, setLoadingTables, apiError}) => {
    const [keywordGroups, setKeywordGroups] = useState([])
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
    }, [apiData])

    useEffect(() => {
      setLoadingTables({...setLoadingTables, [ResultType.WEB_URL]: false})
  }, [keywordGroups])

    return (
      <div>
        {apiError && <Error resultType={ResultType.WEB_URL} input={url}/>}
        {loading && <LoadingSpinner type={ResultType.WEB_URL}/>}
        {apiData && !loading &&
          <div>
            <h2 className='data-table-title'>Keywords for <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>{url}</span></h2>
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
