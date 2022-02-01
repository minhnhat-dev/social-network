import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PAGING } from "constants/global.constant"
import userApi from "api/userApi"
import LeftBarItem from "./LeftBarItem/LeftBarItem"
import "./LeftBar.scss"
const URL_PUBLIC = "/assets/person/no-avatar.png"
function LeftBar() {
    const { user = {} } = useSelector(state => state.auth)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            if (user && user.id) {
                const params = {
                    skip: PAGING.SKIP_DEFAULT,
                    limit: 5,
                    userId: user.id.toString()
                }
                const { items = [] } = await userApi.getUsers(params)
                setUsers(items)
            }
        }
        fetchUsers()
    }, [user])

    return (
        <div className="left-bar">
            <div className="left-bar-wrapper">
                <ul className="left-bar-content">
                    <li className="left-bar-content-item">
                        <img
                            className="left-bar-content-item-avatar"
                            src={user.profilePicture ? user.profilePicture : `${URL_PUBLIC}`}
                            alt="avatar"
                        />
                        <span className="fs-15 fw-500">{user.username}</span>
                    </li>
                    <li className="left-bar-content-item">
                        <img
                            src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630559219/icons/users-1.1s-200px.png"
                            alt=""
                        />
                        <span className="fs-15 fw-500">Friends</span>
                    </li>
                    <li className="left-bar-content-item">
                        <img
                            src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630559219/icons/flag-1.1s-200px.png"
                            alt=""
                        />
                        <span className="fs-15 fw-500">Page hot</span>
                    </li>
                    <hr className="mt-10 mb-10 hr-1" />
                    {users.map(userItem => (
                        <LeftBarItem user={userItem} />
                    ))}
                    <hr className="mt-10 mb-10 hr-1" />
                </ul>
                <div className="left-bar-footer">
                    <span className="fs-14 gray-70">minhnhat.dev © 2021</span>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
