import React, {useContext} from 'react'
import './Footer.css'
import GlobalContext from '../global/GlobalContext'
import KeywordClutchLogo from '../keyword-clutch.png'

export const Footer = () => {
    const globalContext = useContext(GlobalContext)
    const { tmpHideFooter } = globalContext

    if (!tmpHideFooter) {
        return (
            <div>
                <footer className='footer-container'>
                    <div>
                        <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo' />
                    </div>
                    <p style={{textAlign: 'center'}}>© 2024 Keyword Clutch</p>
                    <div>
                        <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo' />
                    </div>
                </footer>
            </div>
        )
    } else return null
}
