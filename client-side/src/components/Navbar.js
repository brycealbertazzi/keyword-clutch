import React from 'react'
import './Navbar.css'
import RankRocketLogo from '../rank-rocket-logo-white.png'

export const Navbar = () => {

    return (
        <div className='nav-container'>
            <img width={75} height={100} src={RankRocketLogo} alt='Rank Rocket Logo'/>
            <h1>RANK ROCKET API</h1>
            {/* Possibly put a menu button here later */}
            <div></div>
        </div>
    )
}
