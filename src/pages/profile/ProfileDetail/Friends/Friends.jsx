import React, { useEffect, useState, useRef } from "react"
import HeaderCover from "../HeaderCover/HeaderCover"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import HeaderMenu from "../HeaderMenu/HeaderMenu"
import "./Friends.scss"
import { useSelector } from "react-redux"
import { useParams, useRouteMatch } from "react-router-dom"
import toast from "helpers/toast.helper"
import { getProfile } from "actions/profile.action"
import { useDispatch } from "react-redux"
import Search from "shared/Search/Search"
import FriendCard from "components/FriendCard/FriendCard"
import userApi from "api/userApi"
import { PAGING } from "constants/global.constant"

function Friends() {
    const { user: currentUser } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const { id } = match.params
    const [friends, setFriends] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const pageEnd = useRef()
    const observer = useRef()

    useEffect(() => {
        observer.current = new IntersectionObserver(
            entries => {
                const isIntersecting = entries[0].isIntersecting
                console.log("isIntersecting", isIntersecting)
                if (isIntersecting) {
                    loadMore()
                }
            },
            { threshold: 1 }
        )
        observer.current.observe(pageEnd.current)

        return () => {
            if (observer.current) {
                console.log("-----DISCONNECTING OBSERVER------")
                observer.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        const fetchFriends = async () => {
            if (profile && profile.id) {
                setLoading(true)
                const skip = Number((page - 1) * pageSize)
                const params = {
                    skip,
                    limit: Number(pageSize),
                    userId: profile.id.toString()
                }

                const { items: newFriends = [], total = 0 } = await userApi.getFollowings(params)
                const totalPage = Math.ceil(total / pageSize)
                setFriends([...friends, ...newFriends])
                setTotalPage(totalPage)
                setLoading(false)
                if (page >= totalPage) {
                    observer.current.unobserve(pageEnd.current)
                }
            }
        }

        fetchFriends()
    }, [profile, page])

    const loadMore = () => {
        setPage(prevPageNumber => prevPageNumber + 1)
    }

    return (
        <div className="friends">
            <div className="friends-wrapper">
                <div className="friends-header">
                    <h3>Friends</h3>
                    <Search />
                </div>
                <div className="friends-container">
                    {friends.map((friend, index) => {
                        return (
                            <div style={{ zIndex: friends.length - (index + 1) }} className="friends-container-item">
                                <FriendCard key={index} user={friend.user} />
                            </div>
                        )
                    })}
                </div>
                <div className="friends-loading">
                    {loading && (
                        <img
                            className="loading-img"
                            src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630586487/icons/Spinner-1s-200px_6.gif"
                            alt=""
                        />
                    )}
                    <button className="non-display" ref={pageEnd} onClick={loadMore}>
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Friends
