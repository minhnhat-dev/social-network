import React, { useState, useRef, useEffect } from "react"
import "./ContainerRight.scss"
import CreatePost from "shared/CreatePost/CreatePost"
import { useSelector, useDispatch } from "react-redux"
import postApi from "api/postApi"
import PostList from "components/PostList/PostList"
import { getPosts } from "actions/posts.action"
import { useParams } from "react-router-dom"
function ContainerRight() {
    const { user } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.profile)
    const { id: profileId } = useParams()
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const loadPosts = async () => {
            const params = {
                skip: 0,
                limit: pageSize,
                sort: "-createdAt",
                userId: profileId,
                page: 1,
                isHomePage: false
            }
            const { items = [], total, newTotalPage } = await dispatch(getPosts(params))
            setPosts(items)
            setTotalPage(newTotalPage)
            setTotalItems(total)
        }
        loadPosts()
    }, [profileId, dispatch])

    const loadMore = async () => {
        setLoading(true)
        const newPage = page + 1
        const skip = Number((newPage - 1) * pageSize)
        const params = {
            skip,
            limit: Number(pageSize),
            sort: "-createdAt",
            userId: profileId,
            page: newPage,
            isHomePage: false
        }
        if (user.id) params.userIdCheckLike = user.id
        const { items, total, newTotalPage } = await dispatch(getPosts(params))
        setPosts([...items, ...posts])
        setTotalItems(total)
        setTotalPage(newTotalPage)
        setLoading(false)
        setPage(newPage)
    }

    return (
        <div className="detail-container-right">
            <div className="section-create-post">
                {profileId === user.id && <CreatePost user={profile} posts={posts} setPosts={setPosts} />}
            </div>
            <div className="section-post-list">
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
    )
}

export default ContainerRight
