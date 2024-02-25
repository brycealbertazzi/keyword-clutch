import React from 'react'
import './Navbar.css'
import '../App.css'
import KeywordClutchLogo from '../keyword-clutch.png'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className='nav-container'>
            <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo'/>
            <h1>KEYWORD CLUTCH</h1>
            <div className='nav-right'>
                <button className='app-button' onClick={() => navigate('/home')}>Sign Up</button>
            </div>
        </div>
    )
}
