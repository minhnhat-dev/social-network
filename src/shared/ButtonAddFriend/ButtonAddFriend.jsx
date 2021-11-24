import React, { useState } from "react"
import "./ButtonAddFriend.scss"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import { useSelector } from "react-redux"
import { follow, unfollow } from "actions/profile.action"
import { useDispatch } from "react-redux"
import toast from "helpers/toast.helper"

function ButtonAddFriend({ user: userParent = {}, className, isTooltip = true }) {
    const dispatch = useDispatch()
    const { id: userParentId } = userParent
    const { user: userCurrent } = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket)
    const { profile } = useSelector(state => state.profile)
    const { followings = [] } = userCurrent
    const isFriend = !!followings.find(item => item.followingId === userParentId)

    const [showTooltip, setShowTooltip] = useState(false)
    const handleFollow = async () => {
        const body = {
            userId: userCurrent.id,
            followerId: userParentId
        }
        const newUser = await dispatch(follow(body, socket))
        if (newUser && newUser.id) return toast.success("Add friend success.")
    }

    const handleUnfollow = async () => {
        const isUserAuth = userCurrent.id === profile.id
        const body = {
            userId: userCurrent.id,
            unFollowerId: userParentId,
            isUserAuth
        }
        const newUser = await dispatch(unfollow(body, socket))
        if (newUser && newUser.id) return toast.success("Unfriend success.")
    }
    return (
        <div className={`btn-add-friend ${className}`}>
            {!isFriend ? (
                <div onClick={handleFollow}>
                    <ButtonTitle
                        className="mr-10 not-add-friend-btn blue-btn"
                        title="Add friend"
                        icon="fas fa-user-plus"
                    />
                </div>
            ) : (
                <div className={`is-add-friended`}>
                    <div onClick={() => setShowTooltip(!showTooltip)}>
                        <ButtonTitle className="mr-10 is-add-friend-btn" title="Friend" icon="fas fa-user-check" />
                    </div>
                    {isTooltip && (
                        <div className={`is-add-friend-tooltip ${showTooltip && "show"}`}>
                            <ul className="is-add-friend-tooltip-table">
                                {/* <li className="is-add-friend-tooltip-item">
                                    <button>
                                        <i className="fs-22 far fa-star"></i>
                                    </button>
                                    <span className="ml-10 fw-500 fs-16 ml-5">Favorite</span>
                                </li>
                                <li className="is-add-friend-tooltip-item">
                                    <button>
                                        <i className="fs-22 far fa-calendar-times"></i>
                                    </button>
                                    <span className="ml-15 fw-500 fs-16 ml-5">Unfollow</span>
                                </li> */}
                                <li onClick={handleUnfollow} className="is-add-friend-tooltip-item">
                                    <button>
                                        <i className="fs-20 fas fa-user-times"></i>
                                    </button>
                                    <span className="ml-10 fw-500 fs-16 ml-5">Unfriend</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <ButtonTitle className={`${isFriend && "blue-btn"}`} title="Message" icon="fab fa-facebook-messenger" />
        </div>
    )
}

export default ButtonAddFriend
