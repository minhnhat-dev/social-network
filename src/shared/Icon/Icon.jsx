import React from "react"
import "./Icon.scss"

function Icon({ icon, className }) {
    return (
        <button className={`icon ${className}`}>
            <i className={`${icon}`}></i>
        </button>
    )
}

export default Icon
