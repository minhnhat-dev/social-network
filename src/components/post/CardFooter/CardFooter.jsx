import React, { useState, useEffect } from "react"
import "./CardFooter.scss"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import postApi from "api/postApi"
import { useSelector, useDispatch } from "react-redux"
import { likePost, unlikePost } from "actions/posts.action"

function CardFooter({ post, setShowComment }) {
    const { user } = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket)
    const [isLike, setIsLike] = useState(false)
    const [likes, setLikes] = useState([])
    const [currentPost, setCurrentPost] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentPost(post)
    }, [post])

    useEffect(() => {
        const fetchUsersLike = async () => {
            if (currentPost.id) {
                const params = {
                    skip: 0,
                    limit: 1,
                    sort: "-createdAt"
                }
                const { items = [] } = await postApi.getLikesPost({ postId: currentPost.id, params })
                setLikes(items)
            }
        }

        const fetchIsLike = async () => {
            if (currentPost.id && user.id) {
                const { isLike } = await postApi.checkIsLike({ postId: currentPost.id, userId: user.id })
                setIsLike(isLike)
            }
        }

        fetchUsersLike()
        fetchIsLike()
    }, [currentPost, user.id])

    const handleLikePost = async () => {
        const body = { userId: user.id, postId: currentPost.id }
        if (!isLike) {
            const newPost = await dispatch(likePost(body, socket))
            setCurrentPost(newPost)
            setIsLike(true)
        } else {
            const newPost = await dispatch(unlikePost(body, socket))
            setCurrentPost(newPost)
            setIsLike(false)
        }
    }

    const renderUsersLike = () => {
        const userName = likes.length ? likes[0].user.username : ""
        const numberRest = currentPost.totalLikes - likes.length
        if (currentPost.totalLikes <= 1) return userName
        return `${userName === user.username ? "You" : userName} and ${numberRest} others`
    }

    return (
        <div className="post-card-footer">
            <div className="post-card-footer-wrapper">
                <div className="card-footer-top">
                    <div className="card-footer-likes">
                        {!!likes.length && (
                            <>
                                <img
                                    className="like-icon"
                                    src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1634190030/public/icons8-like-96.png"
                                    alt="like"
                                />
                                <span className="fs-15 gray-70 link">{renderUsersLike()}</span>
                            </>
                        )}
                    </div>
                    <div className="card-footer-comments-count">
                        <span className="fs-15 gray-70 link">{currentPost.totalComments} Comments</span>
                    </div>
                </div>
                <div className="card-footer-bottom">
                    <button className="footer-bottom-btn" onClick={handleLikePost}>
                        {isLike ? (
                            <img
                                className="mr-7"
                                src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630828282/icons/like-1.1s-200px_7.png"
                                alt="like"
                            />
                        ) : (
                            <img
                                className="mr-7"
                                src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630827858/icons/like-1.1s-200px_3.png"
                                alt="like"
                            />
                        )}

                        <span className={`${isLike ? "base-blue" : "gray-70"} fs-16 fw-500`}>Like</span>
                    </button>
                    <button className="footer-bottom-btn" onClick={() => setShowComment(true)}>
                        <i className="mr-10 gray-70 fs-20 far fa-comment-alt"></i>
                        <span className="gray-70 fs-16 fw-500">Comment</span>
                    </button>
                    <button className="footer-bottom-btn">
                        <i className="mr-10 gray-70 fs-20 fas fa-share"></i>
                        <span className="gray-70 fs-16 fw-500">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardFooter
