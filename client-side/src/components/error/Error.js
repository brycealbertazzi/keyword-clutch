import React from 'react'
import './Error.css'
import { ResultType, ResultTypeColors } from '../../Utils'

export const Error = ({resultType, input}) => {
  return (
    <div>
      {resultType === ResultType.GOOGLE && (
        <div className='error-container' style={{borderColor: '#4285F4'}}>
          <h2 className='error-title'>Unable to fetch Google Keyword Results for <span style={{color: ResultTypeColors[ResultType.GOOGLE], fontSize: '1.2em'}}>{input}</span></h2>
          <div className='error-info'>
              <p className='error-msg-item'>- Make sure to enter a valid keyword so Google search data can be returned</p>
              <p className='error-msg-item'>- Make sure you are connected to the internet</p>
              <p className='error-msg-item'>- The server might be taking too long to respond, refresh the page and try again</p>
          </div>
        </div>
      )}
      {resultType === ResultType.YOUTUBE && (
        <div className='error-container' style={{borderColor: '#f44242'}}>
          <h2 className='error-title'>Unable to fetch Youtube Keyword Results for <span style={{color: ResultTypeColors[ResultType.YOUTUBE], fontSize: '1.2em'}}>{input}</span></h2>
          <div className='error-info'>
            <p  className='error-msg-item'>- Make sure to enter a valid keyword so Youtube search data can be returned</p>
            <p className='error-msg-item'>- Make sure you are connected to the internet</p>
            <p className='error-msg-item'>- The server might be taking too long to respond, refresh the page and try again</p>
          </div>
        </div>
      )}
      {resultType === ResultType.WEB_URL && (
        <div className='error-container' style={{borderColor: '#ad9f2f'}}>
          <h2 className='error-title'>Unable to scrape website keywords for <span style={{color: ResultTypeColors[ResultType.WEB_URL], fontSize: '1.2em'}}>{input}</span></h2>
          <div className='error-info'>
            <p className='error-msg-item'>- Make sure to enter a valid URL so website keywords can be returned (e.g. example.com)</p>
            <p className='error-msg-item'>- Make sure you are connected to the internet</p>
            <p className='error-msg-item'>- The server might be taking too long to respond, refresh the page and try again</p>
          </div>
        </div>
      )}
    </div>
  )
}
