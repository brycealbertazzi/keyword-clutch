import React, { useReducer } from 'react'
import GlobalContext from './GlobalContext'
import Reducer from './GlobalReducer'

export const GlobalStateProvider = ({ children }) => {

    const initialState = {
        optimizedText: '',
        tmpHideFooter: false,
        websiteSEOStep: 1,
    }
    
    const [state, dispatch] = useReducer(Reducer, initialState)
    
    const setOptimizedText = (payload) => {
        dispatch({ type: 'OPTIMIZED_TEXT', payload })
    }

    const setTmpHideFooter = (payload) => {
        dispatch({ type: 'TMP_HIDE_FOOTER', payload })
    }

    const setWebsiteSEOStep = (payload) => {
        dispatch({ type: 'WEBSITE_SEO_STEP', payload })
    }

    return (
        <GlobalContext.Provider value={{
            optimizedText: state.optimizedText,
            setOptimizedText,
            tmpHideFooter: state.tmpHideFooter,
            setTmpHideFooter,
            websiteSEOStep: state.websiteSEOStep,
            setWebsiteSEOStep,
        }}>
        {children}
        </GlobalContext.Provider>
    )
}
