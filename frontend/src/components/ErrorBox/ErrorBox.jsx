import React from 'react'
import "./ErrorBox.css"
export default function ErrorBox({ msg }) {
    return (
        <h1 className='cms-empty-error'>{msg}</h1>
    )
}
