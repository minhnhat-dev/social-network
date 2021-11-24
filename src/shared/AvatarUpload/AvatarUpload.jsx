import React, { useState } from "react"
import "./AvatarUpload.scss"

function AvatarUpload({ type = "file", url, className, id = "avatar-upload", handleUploadFile, image }) {
    const path = !url ? "https://res.cloudinary.com/dcbejjfw2/image/upload/v1629915808/covers/image-5.jpg" : url
    return (
        <div className={`avatar-upload ${className}`}>
            <label htmlFor={id}>
                <img className="avatar-upload-img" src={image} alt="avatar-upload" />
                <i className="avatar-upload-file fas fa-camera"></i>
                <input style={{ display: "none" }} type={type} id={id} onChange={handleUploadFile} />
            </label>
        </div>
    )
}

export default AvatarUpload
