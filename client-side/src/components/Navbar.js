import React from 'react'
import './Navbar.css'
import '../App.css'
import RankRocketLogo from '../rank-rocket-logo-white.png'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className='nav-container'>
            <img width={75} height={100} src={RankRocketLogo} alt='Rank Rocket Logo'/>
            <h1>KEYWORD CLUTCH</h1>
            <div className='nav-right'>
                <button className='app-button' onClick={() => navigate('/home')}>Sign Up</button>
            </div>
        </div>
    )
}
