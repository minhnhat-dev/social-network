import React from "react"
import "./Avatar.scss"

function Avatar({ styleAvatar, url, className }) {
    // const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    // const path = !url ? "https://res.cloudinary.com/dcbejjfw2/image/upload/v1629915808/covers/image-5.jpg" : url
    return <img src={url} style={styleAvatar} className={`avatar ${className}`} alt="avatar" />
}

export default Avatar
