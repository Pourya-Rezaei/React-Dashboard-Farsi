import React from 'react'
import ReactDOM from "react-dom"
import "./DeleteModal.css"
export default function DeleteModal({ submit,
    cancel, title }) {
    return ReactDOM.createPortal(
        <div className="modal-parent active">
            <div className="delete-modal">
                <h1 className="delete-modal__title">
                    {title}
                </h1>
                <div className="delete-modal__btns">
                    <button className='delete-btn delete-modal__accept-btn'
                        onClick={() => submit()}>بله</button>
                    <button className='delete-btn delete-modal__reject-btn'
                        onClick={() => cancel()}>خیر</button>
                </div>
            </div>
        </div>
        , document.getElementById("modals-parent")
    )
}
