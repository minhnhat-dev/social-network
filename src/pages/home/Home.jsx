import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Topbar from "../../components/top-bar/TopBar"
import RightBar from "../../components/right-bar/RightBar"
import Feed from "../../components/feed/Feed"
import { getFollowings } from "../../handlers/user.handler"
import "./Home.scss"
import Navigation from "shared/Navigation/Navigation"
import LeftBar from "components/LeftBar/LeftBar"
import CreatePost from "shared/CreatePost/CreatePost"
import Post from "components/Post/Post"
import PostList from "components/PostList/PostList"
import postApi from "api/postApi"
import { getPosts } from "actions/posts.action"

function Home() {
    const { user } = useSelector(state => state.auth)
    const postsReducer = useSelector(state => state.posts)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setPosts(postsReducer.posts)
        setTotalPage(postsReducer.totalPage)
        setPageSize(postsReducer.limit)
        setTotalItems(postsReducer.totalItems)
        setPage(postsReducer.page)
    }, [postsReducer])

    const loadMore = async () => {
        setLoading(true)
        const newPage = page + 1
        const skip = Number((newPage - 1) * pageSize)
        const params = {
            skip,
            limit: Number(pageSize),
            sort: "-createdAt",
            page: newPage
        }
        if (user.id) params.userIdCheckLike = user.id
        await dispatch(getPosts(params))
        setLoading(false)
    }

    return (
        <div className="home">
            <LeftBar />
            <div className="posts">
                <div className="posts-wrapper">
                    <CreatePost user={user} posts={posts} setPosts={setPosts} />
                    <PostList posts={posts} />
                    <div className="posts-load-more">
                        {loading && (
                            <img
                                className="loading-img"
                                src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630586487/icons/Spinner-1s-200px_6.gif"
                                alt=""
                            />
                        )}
                        {posts.length < totalItems && (
                            <button className="btn-load-more" onClick={loadMore}>
                                Load More...
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="right-bar"></div>
        </div>
    )
}

export default Home
