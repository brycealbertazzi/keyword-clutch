import React, {useState, useContext} from 'react'
import GlobalContext from '../../global/GlobalContext'
import './KeywordScrape.css'

export const KeywordCell = ({keyword, selectKeyword}) => {
    const globalContext = useContext(GlobalContext)
    const {websiteSEOStep} = globalContext
    const [selected, setSelected] = useState(false)

    return (
        <div onClick={(e) => {
            if (websiteSEOStep !== 1) return
            selectKeyword(e)
            setSelected((selected) => !selected)
        }} className='keyword-display-cell' style={{color: selected ? 'gold' : 'white'}}>
          {keyword}
        </div>
    )
}
