/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import './KeywordSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faArrowLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinner } from '../../LoadingSpinner';
import { ResultType, ResultTypeColors } from '../../Utils';
import { Error } from '../error/Error';
import '../../App.css'

export const YoutubeKeywordAPIData = ({apiData, keyword, loading, setLoadingTables, apiError}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [currentRows, setCurrentRows] = useState([])

    useEffect(() => {
        if (apiData) {
            setCurrentRows(apiData.slice(currentPage * 25, Math.min((currentPage + 1) * 25, apiData.length)))
        }
    }, [currentPage, apiData])

    useEffect(() => {
        setLoadingTables({...setLoadingTables, [ResultType.YOUTUBE]: false})
    }, [currentRows])

    if (apiError) {
        return <Error resultType={ResultType.YOUTUBE} input={keyword}/>
    }

    if (loading) {
        return <LoadingSpinner type={ResultType.YOUTUBE} msg={"Fetching Youtube Keyword Data..."}/>
    }

    if (!apiData) {
        return null
    }

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Youtube Search results for <span style={{color: ResultTypeColors[ResultType.YOUTUBE]}}>{keyword}</span></h2>
            {/* Data table */}
            <div className="data-container" style={{borderColor: ResultTypeColors[ResultType.YOUTUBE]}}>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>Keywords</h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.keyword || keyword?.keyword === 0 ? keyword.keyword.toLowerCase() : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            <FontAwesomeIcon icon={faYoutube} />&nbsp;
                            Search Volume
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.monthlysearch || keyword?.monthlysearch === 0 ? keyword.monthlysearch : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>Competion Score</h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.competition_score|| keyword?.competition_score === 0 ? keyword.competition_score : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>Difficulty</h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.difficulty || keyword?.difficulty === 0 ? keyword.difficulty : '-'}</div>
                    })}
                </div>
                <div className="data-field">
                    <div className='data-field-title'>
                        <h3 className='data-label'>
                            Overall Score &nbsp;
                            <span className="tooltip">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span className="tooltip-text">The overall score is a general evaluation of the keyword and is a metric for how strongly we would recommend the keyword for SEO. This takes into account competition, search volume and other factors.</span>
                            </span>
                        </h3>
                    </div>
                    {currentRows.map((keyword, index) => {
                        return <div key={index} className="data-cell">{keyword?.overallscore || keyword?.overallscore === 0 ? keyword.overallscore : '-'}</div>
                    })}
                </div>
            </div>
            {/* Page arrows */}
            <div className='table-footer'>
                <div></div>
                <h4 className='page-row-display'>{(currentPage * 25) + 1}-{Math.min((currentPage + 1) * 25, apiData.length)}/{apiData.length}</h4>
                <div className='page-arrows'>
                    <button disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)} style={{backgroundColor: currentPage <= 0 ? '#555' : '#f44242'}}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button disabled={(currentPage + 1) * 25 > apiData.length} onClick={() => setCurrentPage(currentPage + 1)} style={{backgroundColor: (currentPage + 1) * 25 > apiData.length ? '#555' : '#f44242'}}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </>
    )
}
