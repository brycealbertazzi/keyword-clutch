import React from 'react'
import './LoadingSpinner.css'
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResultType } from './Utils'

export const LoadingSpinner = ({type}) => {
  return (
    <div className='spinner-container'>
        <div className="spinner">
            <FontAwesomeIcon 
                className='loading-icon' 
                icon={type === ResultType.GOOGLE ? faGoogle : type === ResultType.YOUTUBE ? faYoutube : faGlobe} 
                color={type === ResultType.GOOGLE ? '#4285F4' : type === ResultType.YOUTUBE ? '#f44242' : '#ad9f2f'} 
                size='3x'
            />&nbsp;
        </div>
    </div>
  )
}
