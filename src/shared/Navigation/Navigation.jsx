import React from "react"
import NavigationCenter from "./NavigationCenter/NavigationCenter"
import NavigationRight from "./NavigationRight/NavigationRight"
import NavigationLeft from "./NavigationLeft/NavigationLeft"
import "./Navigation.scss"
import { useSelector } from "react-redux"
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
function Navigation() {
    return (
        <div className="navigation">
            <div className="navigation-wrapper">
                <NavigationLeft />
                <NavigationCenter />
                <NavigationRight />
            </div>
        </div>
    )
}

export default Navigation
