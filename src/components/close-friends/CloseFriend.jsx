import React from "react"
import { Link } from "react-router-dom"

function CloseFriend({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <Link to={`/profile/${user.id}`} className="text-link">
            <li className="left-bar__friends__list__item">
                <img
                    className="left-bar__friends__list__item__img"
                    src={
                        user && user?.profilePicture
                            ? `${PUBLIC_FOLDER}person/1.jpeg`
                            : `${PUBLIC_FOLDER}person/noAvatar.png`
                    }
                    alt=""
                />
                <span className="left-bar__friends__list__item__text">{user.name}</span>
            </li>
        </Link>
    )
}

export default CloseFriend
