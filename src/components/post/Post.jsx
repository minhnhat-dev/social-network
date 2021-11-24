import React, { useState } from "react"
import "./Post.scss"
import CardBody from "./CardBody/CardBody"
import CardComments from "./CardComments/CardComments"
import CardFooter from "./CardFooter/CardFooter"
import CardHeader from "./CardHeader/CardHeader"
import { useSelector } from "react-redux"

function Post({ post }) {
    const [showComment, setShowComment] = useState(false)
    const { user } = useSelector(state => state.auth)
    return (
        <div className="post">
            <div className="post-wrapper">
                <CardHeader post={post} />
                <CardBody post={post} />
                <CardFooter post={post} setShowComment={setShowComment} />
                {showComment && <CardComments post={post} />}
            </div>
        </div>
    )
}

export default Post
