import React, { forwardRef, useEffect, useState, useRef } from "react"
import "./PostList.scss"
import Post from "components/Post/Post"
import postApi from "api/postApi"
import { useDispatch, useSelector } from "react-redux"

function PostList({ posts = [] }) {
    const { user } = useSelector(state => state.auth)
    return (
        <div className="posts-list">
            {posts.map((post, index) => {
                return <Post key={index} post={post} />
            })}
        </div>
    )
}

export default PostList
