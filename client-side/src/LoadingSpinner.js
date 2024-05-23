import React from 'react'
import './LoadingSpinner.css'
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResultType, ResultTypeColors } from './Utils'

export const LoadingSpinner = ({type, msg}) => {
  return (
    <div className='spinner-container'>
        <div className="spinner">
            {type &&
              <FontAwesomeIcon 
                className='loading-icon' 
                icon={type === ResultType.GOOGLE ? faGoogle : type === ResultType.YOUTUBE ? faYoutube : faGlobe} 
                color={type === ResultType.GOOGLE ? ResultTypeColors[ResultType.GOOGLE] : type === ResultType.YOUTUBE ? ResultTypeColors[ResultType.YOUTUBE] : ResultTypeColors[ResultType.WEB_URL]} 
                size='3x'
              />
            }&nbsp;
        </div>
        {msg && <h2 className='loading-msg'>{msg}</h2>}
    </div>
  )
}
