import React from "react"
import "./Button.scss"

function Button({ title, handleOnClick }) {
    return (
        <button onClick={handleOnClick} className="button-custom">
            <span>{title}</span>
            <i className="fas fa-chevron-right"></i>
        </button>
    )
}

export default Button
