import React from "react"
import "./Dropdown.scss"

function Dropdown({ show, items = [] }) {
    return (
        <>
            {show && (
                <div className={`dropdown-list ${show && "show"}`}>
                    <ul className="dropdown-list-table">
                        {items.map(({ icon, label, onClick }, index) => (
                            <li key={index} onClick={onClick} className="dropdown-list-item">
                                <button>
                                    <i className={`fs-20 ${icon}`}></i>
                                </button>
                                <span className="ml-10 fw-500 fs-16 ml-5">{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Dropdown
