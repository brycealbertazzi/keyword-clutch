import React, { useEffect, useState } from 'react'
import '../../Home.css'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { LoadingSpinner } from '../../LoadingSpinner'
import { Error } from '../error/Error'
import { ResultType } from '../../Utils'

export const TextOptimize = () => {
    const [chosenKeywords, setChosenKeywords] = useState([])
    const [chosenKeywordInput, setChosenKeywordInput] = useState('')
    const [textForOptimization, setTextForOptimization] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)
    
    const submitKeyword = (e) => {
        e.preventDefault()
        setChosenKeywords([...chosenKeywords, e.target.value])
        setChosenKeywordInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitKeyword(e)
        }
    }   

    const handleChangeKeywordInput = (e) => {
        setChosenKeywordInput(e.target.value)
    }

    const handleChangeTextInput = (e) => {
        setTextForOptimization(e.target.value)
    }

    const removeKeyword = (keyword) => {
        setChosenKeywords(chosenKeywords.filter((kw) => kw !== keyword))
    }

    const submitTextForOptimization = () => {
        if (textForOptimization.length === 0 || chosenKeywords.length === 0) {
            setApiError(true)
            return
        }
        setLoading(true)
        axios.get('/api/data/text', {
            params: {
                text: textForOptimization,
                keywords: chosenKeywords
            }
        }).then((response) => {
            setTextForOptimization(response?.data ? response.data : '')
        }).catch((error) => {
            console.error('Error:', error)
            setApiError(true)
        }).finally(() => setLoading(false))
    }

    if (apiError) {
        return (
            <div style={{marginTop: '50px'}}>
                <Error resultType={ResultType.TEXT} input={null}/>
            </div>
        )
    }

    if (loading) {
        return (
            <div style={{marginTop: '50px'}}>
                <LoadingSpinner type={null}/>
            </div>
        )
    }

    return (
        <div className='text-optimize-container'>
            <div className="keyword-container">
                <input type="text" id="keyword-input" value={chosenKeywordInput} placeholder="Type a keyword and press Enter..." onChange={handleChangeKeywordInput} onKeyDown={handleKeyDown}/>
                <div id="keyword-list">
                    {chosenKeywords.map((keyword, index) => {
                        return (<div key={index} className="keyword-box">
                            {keyword}&nbsp;&nbsp;
                            <FontAwesomeIcon icon={faX} size='sm' color='red' onClick={() => removeKeyword(keyword)}/>
                        </div>)
                    })}
                </div>
            </div>
            <div className="text-input-container">
                <textarea className="text-input" placeholder="Paste text for optimization..." onChange={handleChangeTextInput} value={textForOptimization}></textarea>
                <button className="app-button" onClick={submitTextForOptimization}>Submit</button>
            </div>
        </div>
    )
}
