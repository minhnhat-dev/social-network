import React from "react"
import { useSelector } from "react-redux"
import "./ButtonTitle.scss"

function ButtonTitle({ tooltip, title, icon, styleCustom, className, onClick }) {
    const { loading } = useSelector(state => state.notifications)
    return (
        <button disabled={loading} onClick={onClick} style={styleCustom} className={`button-title ${className}`}>
            <button className={`button-title-icon ${icon}`}></button>
            {title && <span className="button-title-text">{title}</span>}
            {tooltip && (
                <button className="button-title-icon-tooltip">
                    <span>{tooltip}</span>
                </button>
            )}
        </button>
    )
}

export default ButtonTitle
