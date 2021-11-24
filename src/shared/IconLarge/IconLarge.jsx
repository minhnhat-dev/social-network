import React from "react"
import "./IconLarge.scss"
function IconLarge(props) {
    const { tooltip, icon, active, onClickIcon, value, className } = props
    return (
        <button
            className={`${className} btn-icon-large ${active && "active"}`}
            onClick={() => {
                onClickIcon && onClickIcon(value)
            }}
        >
            <i className={`icon-large ${icon} ${active && "active"}`}></i>
            {tooltip && (
                <button className="icon-large-tooltip">
                    <span>{tooltip}</span>
                </button>
            )}
        </button>
    )
}

export default IconLarge
