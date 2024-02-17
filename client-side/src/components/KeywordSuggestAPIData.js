import React, { useEffect, useState } from 'react'
import '../Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const KeywordSuggestAPIData = ({data}) => {
    const [keywordData, setKeywordData] = useState(null)

    useEffect(() => {
        setKeywordData(() => data ? (data.length > 25 ? data.slice(0, 25) : data) : null)
    }, [data])

    return (
        <div>
        {keywordData &&
            <div>
                <div className="data-container" style={{border: '3px solid #4285F4'}}>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>Keywords</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.text || keyword?.text === 0 ? keyword.text : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>
                                <FontAwesomeIcon icon={faGoogle} />&nbsp;
                                Search Volume
                            </h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.search_volume || keyword?.search_volume === 0 ? keyword.search_volume : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>CPC</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.cpc || keyword?.cpc === 0 ? keyword.cpc : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>KD</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.kd || keyword?.kd === 0 ? keyword.kd : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>PD</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.pd || keyword?.pd === 0 ? keyword.pd : '-'}</div>
                        })}
                    </div>
                </div>
                {/* Page arrows */}
                <div className='page-arrows'>
                    <button>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        }
        </div>
    )
}
