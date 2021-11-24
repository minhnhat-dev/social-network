import React, { useState } from "react"
import CenterIcon from "./CenterIcon/CenterIcon"
import "./NavigationCenter.scss"

function NavigationCenter() {
    const navLinks = [
        { label: "Home", icon: "fas fa-home", path: "/" },
        { label: "Watch", icon: "fab fa-youtube", path: "/watch" },
        { label: "Marketplace", icon: "fas fa-store", path: "/shop" },
        { label: "Group", icon: "fas fa-users", path: "/group" }
    ]
    const [selectIcon, setSelectIcon] = useState("Home")
    return (
        <div className="navigation-center">
            {navLinks.map((navLink, index) => {
                return (
                    <CenterIcon key={index} navLink={navLink} selectIcon={selectIcon} setSelectIcon={setSelectIcon} />
                )
            })}
        </div>
    )
}

export default NavigationCenter
