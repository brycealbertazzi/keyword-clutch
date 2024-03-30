import React, {useContext} from 'react'
import GlobalContext from '../global/GlobalContext'
import './PopUpModal.css'
import '../App.css'

export const PopUpModal = ({submitFunc, closeFunc}) => {
    const globalContext = useContext(GlobalContext)
    const { popUpModalData, setPopUpModalData} = globalContext

    const handleCloseModal = () => {
        setPopUpModalData({ open: false, header: '', message: '' })
    }

    return (
        <div>
            {/* Modal container */}
            <div id="modal" className="modal-container">
                <div className="modal-content">
                    <h2 className='modal-content-header'>{popUpModalData?.header ? popUpModalData.header : ''}</h2>
                    <p>{popUpModalData?.message ? popUpModalData.message : ''}</p>
                </div>
                {submitFunc ?
                    <div className="modal-actions">
                        <button onClick={() => handleCloseModal()} className="app-button">Cancel</button>
                        <button onClick={() => {submitFunc(); handleCloseModal()}} className="app-button">Confirm</button>
                    </div>
                    :
                    <div className="modal-actions" style={{justifyContent: 'center'}}>
                        {closeFunc ?
                            <button onClick={() => {closeFunc(); handleCloseModal()}} className="app-button">Close</button>
                        :
                            <button onClick={() => handleCloseModal()} className="app-button">Close</button>
                        }
                    </div>
                }
                
            </div>

            {/* Background blur element */}
            <div id="blurBackground" className="blur-background"></div>
        </div>
    )
}
