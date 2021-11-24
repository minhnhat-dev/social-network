import React from "react"
import "./Card.scss"

function Card(props) {
    const { show = false, children, styleContent, className } = props
    return (
        <div className={`modal-background ${show && "show"} ${className}`}>
            <div style={styleContent} className="modal-content">
                {children}
            </div>
        </div>
    )
}

export default Card
