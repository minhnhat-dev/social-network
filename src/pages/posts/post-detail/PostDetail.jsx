import React, { useEffect, useState } from "react"
import "./PostDetail.scss"
import Post from "components/Post/Post"
import { useParams } from "react-router-dom"
import { getPost } from "actions/posts.action"
import { useDispatch } from "react-redux"

function PostDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [post, setPost] = useState({})
    useEffect(() => {
        const fetchPost = async () => {
            const postRes = await dispatch(getPost(id))
            console.log("postRes", postRes)
            setPost(postRes)
        }
        fetchPost()
    }, [id, dispatch])
    return (
        <div className="post-detail">
            <div className="post-detail-item">{post && <Post post={post}></Post>}</div>
        </div>
    )
}

export default PostDetail
