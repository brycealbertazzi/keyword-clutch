import React, { useState} from 'react'
import '../../Home.css'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { LoadingSpinner } from '../../LoadingSpinner'
import { Error } from '../error/Error'
import { ResultType, ResultTypeColors } from '../../Utils'

export const TextOptimize = ({userInputText, setUserInputText, optimizedText, setOptimizedText, optimizedKeywords, setOptimizedKeywords}) => {
    const [chosenKeywords, setChosenKeywords] = useState([])
    const [chosenKeywordInput, setChosenKeywordInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)
    const [showingOptimizedText, setShowingOptimizedText] = useState(false)
    
    const submitKeyword = (e) => {
        e.preventDefault()
        if (e.target.value.length < 3) return
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
        setUserInputText(e.target.value)
    }

    const removeKeyword = (keyword) => {
        setChosenKeywords(chosenKeywords.filter((kw) => kw !== keyword))
    }

    const submitTextForOptimization = () => {
        setOptimizedKeywords(chosenKeywords)
        setChosenKeywords([])
        if (userInputText.length === 0 || chosenKeywords.length === 0) {
            setApiError(true)
            return
        }
        setLoading(true)
        axios.get('/api/data/text', {
            params: {
                text: userInputText,
                keywords: chosenKeywords
            }
        }).then((response) => {
            setOptimizedText(response?.data ? response.data : '')
            setShowingOptimizedText(true)
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

    const MAX_SELECTED_KEYWORDS = 5
    if (showingOptimizedText) {
        return (
            <div className='text-optimize-container'>
                <div className='text-optimize-headers'>
                    <h2 style={{textAlign: 'center'}}>Optimized for keywords: {
                        optimizedKeywords.map((keyword, index) => <span key={index} style={{color: ResultTypeColors[ResultType.TEXT]}}>{keyword}{index !== optimizedKeywords.length - 1 ? ',' : ''}&nbsp;</span>)
                    }</h2>
                </div>
                <div className="text-input-container">
                    <textarea className="text-input" value={optimizedText} disabled={true}></textarea>
                    <button className="app-button" onClick={() => setShowingOptimizedText(false)}>Back</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='text-optimize-container'>
                <div className="keyword-container">
                    <input type="text" id="keyword-input" value={chosenKeywordInput} placeholder="Type a keyword and press Enter... (min. 3 characters)" onChange={handleChangeKeywordInput} onKeyDown={handleKeyDown} disabled={chosenKeywords.length >= MAX_SELECTED_KEYWORDS}/>
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
                    <textarea className="text-input" placeholder="Paste text for optimization..." onChange={handleChangeTextInput} value={userInputText}></textarea>
                    <div className='optimize-action-buttons'>
                        <button className="app-button" onClick={submitTextForOptimization} disabled={chosenKeywords.length <= 0 || userInputText.length <= 0}>Optimize</button>
                        {optimizedText.length > 0 && <button className="app-button" onClick={() => setShowingOptimizedText(true)}>Prev Optimized Text</button>}
                    </div>
                </div>
            </div>
        )
    }

    // return (
    //     <div className='text-optimize-container'>
    //         <div className="keyword-container">
    //             <input type="text" id="keyword-input" value={chosenKeywordInput} placeholder="Type a keyword and press Enter... (min. 3 characters)" onChange={handleChangeKeywordInput} onKeyDown={handleKeyDown} disabled={chosenKeywords.length >= MAX_SELECTED_KEYWORDS}/>
    //             <div id="keyword-list">
    //                 {chosenKeywords.map((keyword, index) => {
    //                     return (<div key={index} className="keyword-box">
    //                         {keyword}&nbsp;&nbsp;
    //                         <FontAwesomeIcon icon={faX} size='sm' color='red' onClick={() => removeKeyword(keyword)}/>
    //                     </div>)
    //                 })}
    //             </div>
    //         </div>
    //         {showingOptimizedText ? 
    //             <div className="text-input-container">
    //                 <textarea className="text-input" value={optimizedText} disabled={true}></textarea>
    //                 <button className="app-button" onClick={() => setShowingOptimizedText(false)}>Back</button>
    //             </div>
    //         :
    //             <div className="text-input-container">
    //                 <textarea className="text-input" placeholder="Paste text for optimization..." onChange={handleChangeTextInput} value={userInputText}></textarea>
    //                 <div className='optimize-action-buttons'>
    //                     <button className="app-button" onClick={submitTextForOptimization} disabled={chosenKeywords.length <= 0 || userInputText.length <= 0}>Optimize</button>
    //                     {optimizedText.length > 0 && <button className="app-button" onClick={() => setShowingOptimizedText(true)}>Prev Optimized Text</button>}
    //                 </div>
    //             </div>
    //         }
            
    //     </div>
    // )
}
