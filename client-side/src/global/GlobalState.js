import React, { useReducer } from 'react'
import GlobalContext from './GlobalContext'
import Reducer from './GlobalReducer'

export const GlobalStateProvider = ({ children }) => {

    const initialState = {
        
    }
    
    const [state, dispatch] = useReducer(Reducer, initialState)
    
    const setTmpHideFooter = (payload) => {
        dispatch({ type: 'TMP_HIDE_FOOTER', payload })
    }

    return (
        <GlobalContext.Provider value={{
            tmpHideFooter: state.tmpHideFooter,
            setTmpHideFooter: setTmpHideFooter
        }}>
        {children}
        </GlobalContext.Provider>
    )
}
