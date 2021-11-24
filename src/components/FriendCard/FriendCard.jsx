import React from "react"
import "./FriendCard.scss"
import ButtonAddFriend from "shared/ButtonAddFriend/ButtonAddFriend"
import { Link } from "react-router-dom"

function FriendCard({ user = {} }) {
    return (
        <div className="friend-card">
            <div className="friend-card-header">
                <Link className="text-link" to={`/profile/${user.id}`}>
                    <img className="card-header-avatar" src={user.profilePicture} alt="" />
                </Link>
                <div className="card-header-content">
                    <Link className="text-link" to={`/profile/${user.id}`}>
                        <h4>{user.username}</h4>
                    </Link>
                    <span className="gray-70 fs-13">282 Ban chung</span>
                </div>
            </div>
            <ButtonAddFriend user={user} />
        </div>
    )
}

export default FriendCard
