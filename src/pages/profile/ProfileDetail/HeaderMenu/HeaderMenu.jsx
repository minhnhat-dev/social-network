import React, { useState } from "react"
import "./HeaderMenu.scss"
import ButtonHeader from "shared/ButtonHeader/ButtonHeader"
import { Link, useRouteMatch } from "react-router-dom"
function HeaderMenu({ menuSelect, setMenuSelect }) {
    const [select, setSelect] = useState("pots")
    const match = useRouteMatch()
    const { params } = match

    const buttons = [
        { title: "Posts", value: "posts", to: `/profile/${params.id}` },
        // { title: "Introduce", value: "introduce", to: `${match.url}/introduce` },
        { title: "Friends", value: "friends", to: `/profile/${params.id}/friends` },
        { title: "Images", value: "images", to: `/profile/${params.id}/images` }
    ]
    return (
        <div className="detail-header-menu">
            <div className="header-menu-icons">
                {buttons.map((itemButton, index) => {
                    return (
                        <Link className="text-link" to={itemButton.to}>
                            <ButtonHeader
                                key={index}
                                onClick={() => setMenuSelect(itemButton.value)}
                                className="menu-icon"
                                title={itemButton.title}
                                active={menuSelect === itemButton.value}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default HeaderMenu
