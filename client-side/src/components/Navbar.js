import React, { useEffect, useState } from 'react'
import './Navbar.css'
import {Menu, MenuItem} from '@mui/material'
import RankRocketLogo from '../rank-rocket-logo.png'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleCloseMenu = () => {
        setMenuOpen(false)
        setAnchorEl(null)
    }

    const getTargetSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        section.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
    }, [menuOpen])

    return (
        <div className='nav-container'>
            <div>
                <img width={75} height={100} src={RankRocketLogo} alt='Rank Rocket Logo' />
            </div>
            <h1>RANK ROCKET API</h1>
            <div>
                <button onClick={(e) => {setMenuOpen(open => !open); setAnchorEl(e.currentTarget)}} className='seo-tools-btn'>SEO TOOLS</button>
                <Menu
                    id="simple-menu"
                    keepMounted
                    open={menuOpen}
                    anchorEl={anchorEl}
                >
                    <MenuItem onClick={() => {
                        getTargetSection('general-scan')
                        handleCloseMenu()
                    }}>General Scan</MenuItem>
                    <MenuItem onClick={() => {
                        getTargetSection('keyword-research')
                        handleCloseMenu()
                    }}>Keyword Research</MenuItem>
                    <MenuItem onClick={() => {
                        getTargetSection('competitor-analysis')
                        handleCloseMenu()
                    }}>Competitor Analysis</MenuItem>
                </Menu>
            </div>
        </div>
    )
}
