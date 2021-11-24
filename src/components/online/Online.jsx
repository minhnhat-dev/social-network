import React from "react"
import { Link } from "react-router-dom"
import "./Online.scss"

function Online({ user = {} }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="right-bar__wrapper__friends-online__list__item">
            <Link to={`/profile/${user?.id}`}>
                <img
                    src={
                        user && user?.profilePicture
                            ? `${PUBLIC_FOLDER}person/1.jpeg`
                            : `${PUBLIC_FOLDER}person/noAvatar.png`
                    }
                    alt=""
                    className="right-bar__wrapper__friends-online__list__item__img"
                />
            </Link>

            <span className="right-bar__wrapper__friends-online__list__item__name">{user.name}</span>
            <span
                className={`${
                    !user.online ? "background-red " : ""
                }right-bar__wrapper__friends-online__list__item__badge`}
            />
        </li>
    )
}

export default Online
