import React, {useState, useEffect} from 'react'
import '../Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const YoutubeKeyworkAPIData = ({data}) => {
    const [keywordData, setKeywordData] = useState(null)

    useEffect(() => {
        let youtubeKeywordData = data
        setKeywordData(() => youtubeKeywordData ? youtubeKeywordData.slice(0, 25) : null)
    }, [data])

    return (
        <div>
        {keywordData &&
            <div>
                {/* Data table */}
                <div className="data-container" style={{border: '3px solid #f44242'}}>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>Keywords</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.keyword || keyword?.keyword === 0 ? keyword.keyword : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>
                                <FontAwesomeIcon icon={faYoutube} />&nbsp;
                                Search Volume
                            </h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.monthlysearch || keyword?.monthlysearch === 0 ? keyword.monthlysearch : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>Competion Score</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.competition_score|| keyword?.competition_score === 0 ? keyword.competition_score : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>Difficulty</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.difficulty || keyword?.difficulty === 0 ? keyword.difficulty : '-'}</div>
                        })}
                    </div>
                    <div className="data-field">
                        <div className='data-field-title'>
                            <h3 className='data-label'>Overall Score</h3>
                        </div>
                        {keywordData.map((keyword, index) => {
                            return <div key={index} className="data-cell">{keyword?.overallscore || keyword?.overallscore === 0 ? keyword.overallscore : '-'}</div>
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
