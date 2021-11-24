import React from "react"
import IconLarge from "shared/IconLarge/IconLarge"
import Avatar from "shared/Avatar/Avatar"
import "./BoxAccount.scss"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { logout } from "actions/auth.action"
import { useDispatch } from "react-redux"

function BoxAccount({ active }) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const styleAvatar = {
        width: "65px",
        height: "65px",
        marginRight: "10px"
    }

    const handleLogout = async () => {
        await dispatch(logout())
        window.location.href = "/login"
    }

    const handleThemeMode = () => {}
    const navItems = [
        { title: "Settings", tooltip: "Settings", icon: "fas fa-cog", value: "settings" },
        { title: "Dark Mode", tooltip: "Theme", icon: "fas fa-moon", value: "dark-mode", onClick: handleThemeMode },
        { title: "Logout", tooltip: "Logout", icon: "fas fa-sign-out-alt", value: "logout", onClick: handleLogout }
    ]
    return (
        <div className={`box-account ${active && "active"}`}>
            <div className="box-account-wrapper">
                <ul className="box-account-list">
                    <Link to={`/profile/${user.id}`} className="text-link">
                        <li className="account-item">
                            <Avatar styleAvatar={styleAvatar} />
                            <div className="item-user-name">
                                <span className="item-text">{user.username}</span>
                                <span className="item-text-small">View your profile</span>
                            </div>
                        </li>
                    </Link>

                    <hr className="hr-1" />
                    {navItems.map(({ tooltip, icon, value, title, onClick }, index) => {
                        return (
                            <li key={index} className="account-item" onClick={onClick && onClick}>
                                <IconLarge
                                    className="account-item-icon"
                                    tooltip={tooltip}
                                    icon={icon}
                                    value={value}
                                    active={false}
                                />{" "}
                                {title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
//
export default BoxAccount
