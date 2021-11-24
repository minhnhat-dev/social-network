import React from "react"
import "./LeftBarItem.scss"

function LeftBarItem({ user }) {
    return (
        <li className="left-bar-content-item">
            <img className="left-bar-content-item-avatar" src={user.profilePicture} alt="avatar" />
            <span className="fs-15 fw-500">{user.username}</span>
        </li>
    )
}

export default LeftBarItem
