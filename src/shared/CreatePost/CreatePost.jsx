import React, { useState } from "react"
import "./CreatePost.scss"
import Avatar from "shared/Avatar/Avatar"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import BoxCreate from "./BoxCreate/BoxCreate"
import { useSelector, useDispatch } from "react-redux"
import { POST_TYPES } from "actions/posts.action"
const URL_PUBLIC = "/assets/person/no-avatar.png"
function CreatePost({ posts, setPosts }) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <div className="create-post">
            <BoxCreate posts={posts} setPosts={setPosts} />
            <div className="create-post-header">
                <Avatar url={user.profilePicture ? user.profilePicture : URL_PUBLIC} className="create-post-avatar" />
                <button
                    onClick={() => {
                        dispatch({
                            type: POST_TYPES.ON_CREATE_BOX
                        })
                    }}
                    className="create-post-btn"
                >
                    <span className="post-btn-text">What you're thinking?</span>
                </button>
            </div>
            <hr className="hr-1" />
            <div className="create-post-footer">
                <button
                    className="post-footer-icon"
                    onClick={() =>
                        dispatch({
                            type: POST_TYPES.ON_CREATE_BOX
                        })
                    }
                >
                    <i className="base-cherry footer-icon fas fa-video"></i>
                    <span>Live camera</span>
                </button>
                <button
                    className="post-footer-icon"
                    onClick={() =>
                        dispatch({
                            type: POST_TYPES.ON_CREATE_BOX
                        })
                    }
                >
                    <i className="base-lime footer-icon fas fa-image"></i>
                    <span>Image/Video</span>
                </button>
                <button
                    className="post-footer-icon"
                    onClick={() =>
                        dispatch({
                            type: POST_TYPES.ON_CREATE_BOX
                        })
                    }
                >
                    <i className="base-seafoam footer-icon red-55 far fa-flag"></i>
                    <span>Your life event</span>
                </button>
            </div>
        </div>
    )
}

export default CreatePost
