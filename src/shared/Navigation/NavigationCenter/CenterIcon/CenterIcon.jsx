import React from "react"
import "./CenterIcon.scss"
import { Link } from "react-router-dom"

function CenterIcon({ navLink, selectIcon, setSelectIcon }) {
    const { label, icon, path } = navLink
    return (
        <button className="navigation-center-item">
            <Link to={path} className="text-link" onClick={() => setSelectIcon(label)}>
                <div className={"center-item-wrapper"}>
                    <i className={`center-item-icon ${icon} ${selectIcon === label && "active"}`}></i>
                    <span className="center-item-badge">9+</span>
                </div>
                <div className={`border-action ${selectIcon === label && "active"}`}></div>
            </Link>
            <button className="center-item-tooltip">{label}</button>
        </button>
    )
}

export default CenterIcon
