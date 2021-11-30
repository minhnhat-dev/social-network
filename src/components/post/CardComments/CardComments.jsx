import React, { useRef, useEffect, useState } from "react"
import "./CardComments.scss"
import Avatar from "shared/Avatar/Avatar"
import CommentItem from "./CommentItem/CommentItem"
import { useSelector, useDispatch } from "react-redux"
import postApi from "api/postApi"
import UserCardCircle from "shared/UserCardCircle/UserCardCircle"
import { Link } from "react-router-dom"
import { createComment } from "actions/posts.action"
import Reactions from "components/Reactions/Reactions"

function CardComments({ post }) {
    const refInputComment = useRef()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket)
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const [seeMore, setSeeMore] = useState(false)
    const [showReaction, setShowReaction] = useState(false)
    const DEFAULT_LIMIT = 3

    useEffect(() => {
        const fetchComments = async () => {
            if (post.id) {
                const postId = post.id
                const params = {
                    limit: DEFAULT_LIMIT,
                    sort: "-createdAt",
                    userId: user.id
                }
                const { items: commentsRes = [], total = 0 } = await postApi.getComments({ postId, params })
                setComments(commentsRes)
                setTotalItem(total)
                if (commentsRes.length < total) setSeeMore(true)
            }
        }
        fetchComments()
    }, [post, user.id])

    const handleSubmit = async event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const content = refInputComment.current.value
            if (!content) return refInputComment.current.focus()
            const postId = post.id
            const body = { content, userId: user.id }
            body.postId = postId
            const newComment = await dispatch(createComment(body, socket))
            console.log("newComment", newComment)
            setComments([newComment, ...comments])
            refInputComment.current.value = ""
            setShowReaction(false)
        }
    }

    const handleSeeMoreComments = async () => {
        setLoading(true)
        const skip = Number((page - 1) * pageSize) + DEFAULT_LIMIT
        const postId = post.id
        const params = {
            skip,
            limit: Number(pageSize),
            sort: "-createdAt",
            userId: user.id
        }

        const { items: newComments = [], total = 0 } = await postApi.getComments({ postId, params })
        const totalPage = Math.ceil(total / pageSize)
        setTotalItem(total)
        setComments([...comments, ...newComments])
        setTotalPage(totalPage)
        if (newComments.length) {
            const newPage = page + 1
            setPage(newPage)
        }
        setLoading(false)
    }

    const onClickReaction = icon => {
        const currentContent = refInputComment.current.value
        const newContent = currentContent.concat(icon)
        refInputComment.current.value = newContent
    }

    useEffect(() => {
        if (comments.length >= totalItem) {
            setSeeMore(false)
        }
    }, [comments, totalItem])

    return (
        <div className="post-card-comments">
            <div className="post-card-comments-wrapper">
                <div className="card-comments-input">
                    <Link to={`/profile/${user.id}`} className="text-link">
                        <UserCardCircle className="comments-input-avatar" user={user} />
                    </Link>
                    <div className="comments-input-group">
                        <input
                            ref={refInputComment}
                            className="comments-input"
                            type="text"
                            placeholder="Write your comment"
                            onKeyDown={handleSubmit}
                        />
                        <button className="comments-input-reactions">
                            <Reactions
                                content={""}
                                transform={"left"}
                                show={showReaction}
                                onClickIcon={onClickReaction}
                                onClickButton={setShowReaction}
                            />
                        </button>
                    </div>
                </div>
                <div className="card-comments-body">
                    <ul className="comments-body-list">
                        {comments.map((comment, index) => (
                            <CommentItem key={index} comment={comment} />
                        ))}
                    </ul>
                </div>
                <div className="card-comments-footer">
                    {seeMore && (
                        <span onClick={handleSeeMoreComments} className="link fw-500 gray-70">
                            See more comments
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardComments
