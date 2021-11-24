import React, { useState } from "react"
import IconLarge from "shared/IconLarge/IconLarge"
import Avatar from "shared/Avatar/Avatar"
import "./BoxSearch.scss"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { logout } from "actions/auth.action"
import Loader from "shared/Loader/Loader"
import LoaderIcon from "shared/LoaderIcon/LoaderIcon"
import { useDispatch } from "react-redux"
function BoxSearch({ active = false, users = [], loading }) {
    const styleAvatar = {
        width: "45px",
        height: "45px",
        marginRight: "10px"
    }
    const styleIcon = {
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: " translate(-50%,-50%)"
    }

    const { user } = useSelector(state => state.auth)

    return (
        <div className={`box-search ${active && "active"}`}>
            <div className="box-search-wrapper">
                <ul className="box-search-list">
                    {loading && <LoaderIcon styleIcon={styleIcon} show={loading} />}
                    {users.map((userItem, index) => {
                        return (
                            <Link key={index} to={`/profile/${userItem.id}`} className="text-link">
                                <li className="search-item">
                                    <Avatar styleAvatar={styleAvatar} url={userItem.profilePicture} />
                                    <div className="item-user-name">
                                        <span className="item-text">{userItem.username}</span>
                                        <span className="item-text-small">View profile</span>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
//
export default BoxSearch
