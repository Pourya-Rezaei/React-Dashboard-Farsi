import React, { useEffect } from 'react'
import "./EditModal.css"


export default function EditModal({ children, onClose, onSubmit }) {
    useEffect(() => {
        const checkKey = (event) => {
            console.log(event)
            if (event.keyCode === 27) {
                onClose()
            }
        }
        window.addEventListener("keydown", checkKey)
        return () => window.removeEventListener("keydown", checkKey)
    }, [])
    return (
        <div className='modal-parent active'>
            <form className='edit-modal__form'>
                <h1>اطلاعات جدید را وارد نمایید</h1>
                {children}
                <button className='edit-form__submit' onClick={onSubmit}>
                    ثبت ویرایش
                </button>
            </form>
        </div>
    )
}
