import React from "react"
import "./HeaderCover.scss"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import { useSelector } from "react-redux"

function HeaderCover() {
    const { profile } = useSelector(state => state.profile)
    return (
        <div className="detail-header-cover">
            <img className="header-cover-img" src={profile.coverPicture} alt="cover" />
            <div className="header-cover-btn">
                {/* <div className="file-cover">
                    <ButtonTitle title="Edit cover photo" icon="fas fa-camera-retro" />
                    <input type="file" />
                </div> */}
            </div>
        </div>
    )
}

export default HeaderCover
