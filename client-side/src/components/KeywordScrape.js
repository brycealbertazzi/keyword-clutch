  import React, { useEffect, useState } from 'react'
  import './KeywordScrape.css'
  import '../Home.css'

  export const KeywordScrape = ({apiData, url}) => {
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

    return (
      <div>
        {apiData &&
          <div>
            <h2 className='data-table-title'>Keywords for {url}</h2>
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
