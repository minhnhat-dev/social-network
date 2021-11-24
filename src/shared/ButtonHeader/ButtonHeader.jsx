import React from "react"
import "./ButtonHeader.scss"

function ButtonHeader({ title, styleCustom, active, className, onClick }) {
    return (
        <div onClick={onClick} className={`${className} button-header-wrapper`}>
            <button style={styleCustom} className={`button-header ${active && "active"}`}>
                {title}
            </button>
            <hr className={`border-button-header ${active && "active-border"}`} />
        </div>
    )
}

export default ButtonHeader
