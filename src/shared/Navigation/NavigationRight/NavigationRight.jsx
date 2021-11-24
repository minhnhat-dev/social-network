import React, { useState } from "react"
import "./NavigationRight.scss"
import IconLarge from "shared/IconLarge/IconLarge"
import BoxAccount from "./BoxAccount/BoxAccount"
import NotifiesBox from "components/NotifiesBox/NotifiesBox"
import MessengerBox from "components/MessengerBox/MessengerBox"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

function NavigationRight() {
    const { auth, user } = useSelector(state => state.auth)
    const notifies = useSelector(state => state.notifies) || []
    const [boxSelect, setBoxSelect] = useState("")

    const onSelectMenu = value => {
        if (value === boxSelect) {
            setBoxSelect("")
        } else {
            setBoxSelect(value)
        }
    }
    const icons = [
        { label: "Menu", icon: "far fa-clone", box: "menu" },
        { label: "Messenger", icon: "fab fa-facebook-messenger", box: "messenger" },
        {
            label: "Notification",
            icon: "fas fa-bell",
            box: "notification",
            notify: notifies && notifies.length ? notifies.filter(item => !item.isRead).length : 0
        },
        { label: "Account", icon: "fas fa-angle-down", box: "account" }
    ]
    return (
        <div className="navigation-right">
            {auth && (
                <>
                    <Link to={`/profile/${user.id}`} className="text-link">
                        <div className="navigation-right-user">
                            <img className="right-user-avatar" src={user.profilePicture} alt="avatar" />
                            <span className="right-user-name">{user.username}</span>
                        </div>
                    </Link>

                    {icons.map((item, index) => (
                        <div className="notify-count">
                            <IconLarge
                                key={index}
                                tooltip={item.label}
                                icon={item.icon}
                                active={boxSelect === item.box}
                                value={item.box}
                                onClickIcon={onSelectMenu}
                            />
                            {item.notify > 0 && (
                                <div className="badge">
                                    <span>{item.notify}</span>
                                </div>
                            )}
                        </div>
                    ))}
                    <BoxAccount active={boxSelect === "account"} />
                    {boxSelect === "notification" && notifies.length > 0 && <NotifiesBox setBoxSelect={setBoxSelect} />}
                    {boxSelect === "messenger" && <MessengerBox setBoxSelect={setBoxSelect} />}
                </>
            )}
        </div>
    )
}

export default NavigationRight
