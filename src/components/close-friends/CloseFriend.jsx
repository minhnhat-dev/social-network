import React from "react";

function CloseFriend({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="left-bar__friends__list__item">
            <img className="left-bar__friends__list__item__img" src={`${PUBLIC_FOLDER}${user.profilePicture}`} alt="" />
            <span className="left-bar__friends__list__item__text">{user.username}</span>
        </li>
    );
}

export default CloseFriend;
