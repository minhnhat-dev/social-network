import React, { useState, useEffect } from "react"
import { MoreVert, ThumbUp, ChatBubbleOutline, Share } from "@material-ui/icons"
import "./Post.scss"
import TimeAgo from "timeago-react"
import { useParams, Link } from "react-router-dom"

import { useSelector, shallowEqual } from "react-redux"
import postHandlers from "../../handlers/posts.handler"
import { getUser } from "../../handlers/user.handler"
// import * as timeago from "timeago.js";
// import vi from "timeago.js/lib/lang/vi";
// timeago.register("vi", vi);

// import it first.
import { Users } from "../../dummyData"

function Post({ post = {} }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const PUBLIC_SERVER_FOLDER = process.env.REACT_APP_PUBLIC_SERVER_FOLDER
    /* current is user login */
    const { user: currentUser } = useSelector(state => state.auth)
    // const [currentPost, setCurrentPost] = useState(post)
    // const { userId: userIdPost, id: postId } = currentPost
    // const [isLike, setIsLike] = useState(false)
    // const [user, setUser] = useState({})
    // const { userId } = useParams()

    // useEffect(() => {
    //     /* check is like  */
    //     const fetchIsLike = async () => {
    //         const isLikePost = await postHandlers.checkIsLike({ userId: currentUser.id, postId })
    //         setIsLike(isLikePost)
    //     }

    //     fetchIsLike()
    // }, [currentUser.id, postId])

    // useEffect(() => {
    //     /* fetch info user  */
    //     const fetchUser = async () => {
    //         const userPost = await getUser({ userId: userIdPost })
    //         setUser(userPost)
    //     }

    //     fetchUser()
    // }, [userIdPost, postId])

    const handleLike = async () => {}

    return (
        <div className="postzzz">
            <div className="post__wrapper">
                <div className="post__wrapper__top">
                    <div className="post__wrapper__top__left">
                        <Link to={`profile/${currentUser.id}`}>
                            <img
                                src={currentUser.profilePicture || `${PUBLIC_FOLDER}person/noAvatar.png`}
                                alt=""
                                className="post__wrapper__top__left__img"
                            />
                        </Link>

                        <span className="post__wrapper__top__left__name">{currentUser?.username}</span>
                        <span className="post__wrapper__top__left__hour">
                            <TimeAgo datetime={post?.createdAt} locale="en" live={false} />
                        </span>
                    </div>
                    <div className="post__wrapper__top__right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post__wrapper__center">
                    <span className="post__wrapper__center__title">{post?.content}</span>
                    {/* <img
                        src={`${PUBLIC_SERVER_FOLDER}${post?.image?.filename}`}
                        alt=""
                        className="post__wrapper__center__img"
                    /> */}
                </div>
                <div className="post__wrapper__bottom">
                    <div className="post__wrapper__bottom__left">
                        <span onClick={handleLike} className="post__wrapper__bottom__left__like">
                            <i className="like-icon-first far fa-thumbs-up" />
                        </span>
                        <span onClick={handleLike} className="post__wrapper__bottom__left__like">
                            <i className="like-icon-second far fa-heart" />
                        </span>

                        <span className="post__wrapper__bottom__left__count-like">
                            {post.totalLikes} people like this
                        </span>
                    </div>
                    <div className="post__wrapper__bottom__right">
                        <span className="post__wrapper__bottom__comment">{post.totalComments} Comments</span>
                    </div>
                </div>
                <hr className="post__wrapper__hr" />
                <div className="post__wrapper__action">
                    <div className={true ? "is-like post__wrapper__action__item" : "post__wrapper__action__item"}>
                        <i className="far fa-thumbs-up post__wrapper__action__item__icon" />
                        <span className="post__wrapper__action__item__text">Like</span>
                    </div>
                    <div className="post__wrapper__action__item">
                        <ChatBubbleOutline className="post__wrapper__action__item__icon" />
                        <span className="post__wrapper__action__item__text">Comment</span>
                    </div>
                    <div className="post__wrapper__action__item">
                        <Share className="post__wrapper__action__item__icon" />
                        <span className="post__wrapper__action__item__text">Share</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
