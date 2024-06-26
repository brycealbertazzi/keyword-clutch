/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './KeywordSearch.css'
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faArrowLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinner } from '../../LoadingSpinner';
import { ResultType, ResultTypeColors } from '../../Utils';
import { Error } from '../error/Error';

export const KeywordSuggestAPIData = ({apiData, keyword, loading, setLoadingTables, apiError}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [currentRows, setCurrentRows] = useState([])

    useEffect(() => {
        if (apiData) {
            setCurrentRows(apiData.slice(currentPage * 25, Math.min((currentPage + 1) * 25, apiData.length)))
        }
    }, [currentPage, apiData])

    useEffect(() => {
        setLoadingTables({...setLoadingTables, [ResultType.GOOGLE]: false})
    }, [currentRows])

    if (apiError) {
        return <Error resultType={ResultType.GOOGLE} input={keyword}/>
    }

    if (loading) {
        return <LoadingSpinner type={ResultType.GOOGLE} msg={"Fetching Google Keyword Data..."}/>
    }

    if (!apiData) {
        return null
    }

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Google Search Results for <span style={{color: ResultTypeColors[ResultType.GOOGLE]}}>{keyword}</span></h2>
            <div className="data-container" style={{borderColor: ResultTypeColors[ResultType.GOOGLE]}}>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>Keywords</h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.text || keyword?.text === 0 ? keyword.text.toLowerCase() : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            <FontAwesomeIcon icon={faGoogle} />&nbsp;
                            Search Volume
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.search_volume || keyword?.search_volume === 0 ? keyword.search_volume : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            CPC &nbsp;
                            <span className="tooltip">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="tooltip-text">Cost Per Click - The average amount you pay each time someone clicks on an ad triggered by a specific keyword. Higher CPCs associated with a keyword often signify heightened competition or a more targeted audience, indicating potentially higher costs for advertising campaigns.</span>
                            </span>
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.cpc || keyword?.cpc === 0 ? keyword.cpc : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            KD &nbsp;
                            <span className="tooltip">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="tooltip-text">Keyword Difficulty - An estimate of the challenge involved in achieving organic ranking for a particular keyword within search engine results. Higher KD scores for a keyword suggest that it may require more extensive optimization efforts and content quality to compete effectively for visibility against other search results.</span>
                            </span>
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.kd || keyword?.kd === 0 ? keyword.kd : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            PD &nbsp;
                            <span className="tooltip">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="tooltip-text">Paid Difficulty - A metric indicating the level of competition among advertisers bidding on a specific keyword for paid search advertising placement. Elevated PD values associated with a keyword signify intensified competition, potentially leading to increased costs per click and a more aggressive battle for ad visibility in search engine results pages.</span>
                            </span>
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.pd || keyword?.pd === 0 ? keyword.pd : '-'}</div>
                    })}
                </div>
            </div>
            {/* Page arrows */}
            <div className='table-footer'>
                <h4 className='page-row-display'>{(currentPage * 25) + 1}-{Math.min((currentPage + 1) * 25, apiData.length)}/{apiData.length}</h4>
                <div className='page-arrows'>
                    <button disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)} style={{backgroundColor: currentPage <= 0 ? '#555' : '#4285F4'}}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button disabled={(currentPage + 1) * 25 > apiData.length} onClick={() => setCurrentPage(currentPage + 1)} style={{backgroundColor: (currentPage + 1) * 25 > apiData.length ? '#555' : '#4285F4'}}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </>
    )
}
