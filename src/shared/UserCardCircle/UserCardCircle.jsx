import React, { useEffect } from "react"
import "./UserCardCircle.scss"
import Avatar from "shared/Avatar/Avatar"
import Icon from "shared/Icon/Icon"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import { RELATIONSHIP_STRING } from "constants/users.constant"
import ButtonAddFriend from "shared/ButtonAddFriend/ButtonAddFriend"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function UserCardCircle({ user = {}, className }) {
    const { user: userCurrent } = useSelector(state => state.auth)
    return (
        <div className={`user-card-circle ${className}`}>
            <img className="user-card-circle-img" src={user.profilePicture} alt="" />
            <div className="user-card-circle-tooltip">
                <div className="user-card-circle-header">
                    <div className="user-card-circle-left">
                        <Link className="text-link" to={`/profile/${user.id}`}>
                            <Avatar className="card-left-avatar" url={user.profilePicture} />
                        </Link>
                    </div>
                    <div className="user-card-circle-right">
                        <Link className="text-link" to={`/profile/${user.id}`}>
                            <h3>{user.username}</h3>
                        </Link>
                        <ul className="introduce-list">
                            <li className="introduce-item">
                                <button className="introduce-item-btn">
                                    <i className="introduce-item-icon fas fa-map-marker-alt"></i>
                                </button>
                                <span className="introduce-item-text">
                                    From <strong>{user.from}</strong>
                                </span>
                            </li>
                            <li className="introduce-item">
                                <button className="introduce-item-btn">
                                    <i className="introduce-item-icon fas fa-heart"></i>
                                </button>
                                <span className="introduce-item-text">{RELATIONSHIP_STRING[user.relationship]}</span>
                            </li>
                            <li className="introduce-item">
                                <button className="introduce-item-btn">
                                    <i className="introduce-item-icon follow fas fa-wifi"></i>
                                </button>
                                <span className="introduce-item-text">
                                    There are <strong>{user.totalFollowers}</strong> followers
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {userCurrent.id !== user.id && (
                    <div className="user-card-circle-footer">
                        <ButtonAddFriend isTooltip={false} className="mr-10 card-footer-icon" user={user} />
                        <ButtonTitle className="card-footer-icon width-40" icon="fas fa-ellipsis-h" />
                    </div>
                )}
            </div>
        </div>
    )
}
export default UserCardCircle
