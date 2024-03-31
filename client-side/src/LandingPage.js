import React from 'react'
import './LandingPage.css'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ResultType, ResultTypeColors } from './Utils'

export const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className='page-content'>
      <div className='landing-pg-text-content'>
        <div className='bulletpoint-container'>
          <h1 style={{fontSize: '30px'}}>Convenient, all-in-one SEO keyword research tool</h1>
          <h2 style={{fontSize: '25px'}} className='bulletpoint'>- Up your SEO game</h2>
          <h2 style={{fontSize: '25px'}} className='bulletpoint'>- Gain key insider infomation about keywords such as cost per click, search volume and more</h2>
          <h2 style={{fontSize: '25px'}} className='bulletpoint'>- Scan any website to see its keywords</h2>
          <h2 style={{fontSize: '25px'}} className='bulletpoint'>- Optimize website text for keywords</h2>
          <h2 style={{fontSize: '25px'}} className='bulletpoint'>- Get an edge over cometitors, rank higher and bring more traffic to your website</h2>
          <button className='app-button' onClick={() => navigate('/pricing')}>See Pricing</button>
        </div>
      </div>
      <div className='landing-pg-logos'>
          <div className='logos-top'>
            <div className='logo'>
              <FontAwesomeIcon icon={faGoogle} size='7x' color={ResultTypeColors[ResultType.GOOGLE]}/>
            </div>
            <div className='logo'>
              <FontAwesomeIcon icon={faYoutube}  size='7x' color={ResultTypeColors[ResultType.YOUTUBE]}/>
            </div>
          </div>
          <div className='logo-bottom'>
            <div className='logo'>
              <FontAwesomeIcon icon={faGlobe}  size='7x' color={ResultTypeColors[ResultType.WEB_URL]}/>
            </div>
          </div>
      </div>
    </div>
  )
}
