import React, { useState, useEffect } from "react"
import "./HeaderInfo.scss"
import IconLarge from "shared/IconLarge/IconLarge"
import Avatar from "shared/Avatar/Avatar"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import EditProfile from "shared/EditProfile/EditProfile"
import ButtonAddFriend from "shared/ButtonAddFriend/ButtonAddFriend"
import { useSelector } from "react-redux"
import { validateFileProfileUpload, validateFileCoverUpload, validateInputProfile } from "validators/profile.validator"
import AvatarUpload from "shared/AvatarUpload/AvatarUpload"
import { imageUpload } from "helpers/upload.helper"
import userApi from "api/userApi"
import { PAGING } from "constants/global.constant"
import UserCard from "shared/UserCard/UserCard"
import UserCardCircle from "shared/UserCardCircle/UserCardCircle"
import { Link } from "react-router-dom"

function HeaderInfo() {
    const { profile } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.auth)
    const [showEdit, setShowEdit] = useState(false)
    const [friends, setFriends] = useState([])
    useEffect(() => {
        const fetchFriends = async () => {
            if (profile && profile.id) {
                const params = {
                    skip: PAGING.SKIP_DEFAULT,
                    limit: 8,
                    userId: profile.id.toString()
                }
                const { items = [] } = await userApi.getFollowings(params)
                setFriends(items)
            }
        }
        fetchFriends()
    }, [profile])

    const styleAvatar = {
        width: "45px",
        height: "45px",
        marginLeft: "-10px",
        border: "2px solid white"
    }

    return (
        <div className="detail-header-info">
            <EditProfile show={showEdit} setShowEdit={setShowEdit} />
            <div className="header-info-left">
                <div className="info-left-image">
                    <div onClick={() => setShowEdit(true)}>
                        <AvatarUpload
                            image={profile.profilePicture}
                            id="header-avatar-upload"
                            className="left-image"
                            type="text"
                        />
                    </div>
                </div>
                <div className="info-left-user">
                    <h3 className="left-user-username">{profile.username}</h3>
                    <span className="left-user-total-friends">{profile.totalFollowings} Friends</span>
                    <div className="left-user-friends">
                        {friends.map((friend, index) => (
                            <Link to={`/profile/${friend.user.id}`} className="text-link">
                                <UserCardCircle className="user-friends-item" key={index} user={friend.user} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="header-info-right">
                <div className="info-right-icons">
                    {profile.id === user.id ? (
                        <div onClick={() => setShowEdit(!showEdit)}>
                            <ButtonTitle className="info-right-btn" title="Edit profile" icon="fas fa-pen" />
                        </div>
                    ) : (
                        <>
                            <div>
                                <ButtonAddFriend user={profile} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderInfo
