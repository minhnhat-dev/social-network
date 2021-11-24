import React, { useEffect, useState, useRef } from "react"
import "./CommentItem.scss"
import Avatar from "shared/Avatar/Avatar"
import UserCardCircle from "shared/UserCardCircle/UserCardCircle"
import { Link } from "react-router-dom"
import TimeAgo from "timeago-react"
import { CONTENT_LIMIT } from "constants/posts.constant"
import postApi from "api/postApi"
import { useSelector } from "react-redux"
import CardLike from "components/CardLike/CardLike"
import Dropdown from "shared/Dropdown/Dropdown"
import InputComment from "components/InputComment/InputComment"
import { update as updateCommentAction, deleteComment as deleteCommentAction } from "actions/comment.action"
import { useDispatch } from "react-redux"

function CommentItem({ comment = {} }) {
    const socket = useSelector(state => state.socket)
    const [readMore, setReadMore] = useState(false)
    const { user } = useSelector(state => state.auth)
    const [isLikeComment, setIsLikeComment] = useState(false)
    const [currentComment, setCurrentComment] = useState(comment)
    const [showAction, setShowAction] = useState(false)
    const [isEditComment, setIsEditComment] = useState(false)
    const [content, setContent] = useState()
    const refContent = useRef(null)
    const dispatch = useDispatch()

    const deleteComment = async () => {
        const body = {
            userId: user.id,
            postId: comment.postId,
            commentId: comment.id,
            content
        }
        await dispatch(deleteCommentAction(body, socket))
        setCurrentComment(comment)
    }
    const editComment = () => {
        setIsEditComment(true)
    }
    const actionIcons = [
        {
            label: "Delete",
            icon: "far fa-trash-alt",
            onClick: deleteComment
        },
        {
            label: "Edit",
            icon: "far fa-edit",
            onClick: editComment
        }
    ]
    useEffect(() => {
        setCurrentComment(comment)
        setIsLikeComment(comment.isLikeComment)
        setContent(comment.content)
    }, [comment])

    const handleLikeComment = async () => {
        const body = {
            userId: user.id,
            postId: currentComment.postId,
            commentId: currentComment.id
        }
        if (!isLikeComment) {
            const newComment = await postApi.likeComment(body)
            setCurrentComment(newComment)
            setIsLikeComment(true)
        } else {
            const newComment = await postApi.unLikeComment(body)
            setCurrentComment(newComment)
            setIsLikeComment(false)
        }
    }

    const handleOnChange = e => {
        setContent(e.target.value)
    }

    const handleSubmit = async e => {
        if (e.code === "Escape") {
            setContent(comment.content)
            setIsEditComment(false)
            return
        }

        if (e.code === "Enter") {
            const body = {
                userId: user.id,
                postId: comment.postId,
                commentId: comment.id,
                content
            }
            const newComment = await dispatch(updateCommentAction(body, socket))
            setCurrentComment(newComment)
            setContent(newComment.content)
            setIsEditComment(false)
        }
    }

    const onCancelEdit = () => {
        setContent(comment.content)
        setIsEditComment(false)
    }

    return (
        <li className="comment-item">
            <div className="comment-item-wrapper">
                {!isEditComment && (
                    <Link to={`/profile/${currentComment.user?.id}`} className="text-link">
                        <UserCardCircle className="comment-item-avatar" user={currentComment?.user} />
                    </Link>
                )}

                {/* <Avatar url={comment.user?.profilePicture} /> */}
                <div className="comment-item-body">
                    <div className="item-content-wrapper">
                        {isEditComment ? (
                            <div className="content-edit">
                                <InputComment
                                    handleSubmit={handleSubmit}
                                    handleOnChange={handleOnChange}
                                    user={user}
                                    value={content}
                                    name="content"
                                />
                                <small className="ml-45">
                                    Press Esc to{" "}
                                    <span onClick={onCancelEdit} className="link base-blue">
                                        cancel
                                    </span>
                                </small>
                            </div>
                        ) : (
                            <button className="comment-item-content">
                                <h4 className="link item-content-username fs-13 fw-700">
                                    {currentComment.user?.username}
                                </h4>
                                <span className="fs-15 content-text">
                                    {currentComment && currentComment?.content.length > CONTENT_LIMIT && !readMore
                                        ? currentComment?.content.slice(0, CONTENT_LIMIT) + "...."
                                        : currentComment?.content}
                                    {currentComment?.content.length > CONTENT_LIMIT && !readMore && (
                                        <span
                                            onClick={() => setReadMore(!readMore)}
                                            className="fs-13 content-text ml-5 link fw-500"
                                        >
                                            Read more
                                        </span>
                                    )}
                                </span>
                                {!!currentComment.totalLikes && <CardLike comment={currentComment} />}
                            </button>
                        )}

                        {comment.userId === user.id && !isEditComment && (
                            <div className="comment-item-action" onClick={() => setShowAction(!showAction)}>
                                <button className="header-action-icon">
                                    <i className="fas gray-70 fa-ellipsis-h"></i>
                                </button>
                                <Dropdown show={showAction} items={actionIcons} />
                            </div>
                        )}
                    </div>
                    {!isEditComment && (
                        <div className="comment-item-icons">
                            <span
                                className={`${isLikeComment ? "base-blue" : "gray-70"} link fw-700 fs-13`}
                                onClick={handleLikeComment}
                            >
                                Like
                            </span>
                            <span className="link gray-70 fw-700 fs-13"> · </span>
                            <span className="gray-70 fw-700 fs-13">
                                <TimeAgo datetime={currentComment?.createdAt} locale="en" live={false} />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}

export default CommentItem
