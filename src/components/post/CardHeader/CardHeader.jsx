import React, { useEffect, useState } from "react"
import "./CardHeader.scss"
import Avatar from "shared/Avatar/Avatar"
import Dropdown from "shared/Dropdown/Dropdown"
import TimeAgo from "timeago-react"
import { VISIBLE } from "constants/posts.constant"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { POST_TYPES, deletePost } from "actions/posts.action"
import { useSelector } from "react-redux"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"

function CardHeader({ post = {} }) {
    const { user } = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    const handleDeletePost = async () => {
        await dispatch(deletePost(post, socket))
        return window.location.reload()
    }

    const editPost = () => {
        dispatch({
            type: POST_TYPES.ON_EDIT_BOX,
            payload: { ...post }
        })
    }

    const [showAction, setShowAction] = useState(false)
    const actionIcons = [
        {
            label: "Edit post",
            icon: "far fa-edit",
            onClick: editPost
        },
        {
            label: "Delete post",
            icon: "far fa-trash-alt",
            onClick: handleDeletePost
        }
    ]

    return (
        <div className="post-card-header">
            <div className="post-card-header-wrapper">
                <div className="card-header-user">
                    <Link to={`/profile/${post.user && post.user.id}`} className="text-link">
                        <Avatar className="card-left-avatar" url={post.user.profilePicture} />
                    </Link>

                    <div className="header-user-info">
                        <Link to={`/profile/${post.user && post.user.id}`} className="text-link">
                            <h4>{post.user && post.user.username}</h4>
                        </Link>
                        <span className="user-info-visible fs-13 gray-70">
                            <TimeAgo className="link" datetime={post?.createdAt} locale="en" live={false} />
                            {post?.visible === VISIBLE.PUBLID ? (
                                <i className="ml-8 fas fa-globe-americas"></i>
                            ) : (
                                <i className="ml-8 fas fa-lock"></i>
                            )}
                        </span>
                    </div>
                </div>
                <div className="card-header-action">
                    <Link to={`/posts/${post && post?.id}`} className="text-link">
                        <ButtonTitle tooltip="Detail" className="btn-detail-post" icon="fas fa-external-link-alt" />
                    </Link>
                    {user.id === (post.user && post?.user.id) && (
                        <div onClick={() => setShowAction(!showAction)}>
                            <button className="header-action-icon">
                                <i className="fas gray-70 fa-ellipsis-h"></i>
                            </button>
                            <Dropdown show={showAction} items={actionIcons} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardHeader
