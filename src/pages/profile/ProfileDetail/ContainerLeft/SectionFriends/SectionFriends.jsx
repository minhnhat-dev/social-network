import React, { useEffect, useState } from "react"
import UserCard from "shared/UserCard/UserCard"
import "./SectionFriends.scss"
import ButtonHeader from "shared/ButtonHeader/ButtonHeader"
import { Link } from "react-router-dom"
import userApi from "api/userApi"
import { PAGING } from "constants/global.constant"
import { useSelector } from "react-redux"
import UserCardCircle from "shared/UserCardCircle/UserCardCircle"

function SectionFriends() {
    const { profile } = useSelector(state => state.profile)
    const [friends, setFriends] = useState([])
    const [totalFriends, setTotalFriends] = useState(0)
    useEffect(() => {
        const fetchFriends = async () => {
            if (profile && profile.id) {
                const params = {
                    skip: PAGING.SKIP_DEFAULT,
                    limit: 9,
                    userId: profile.id.toString()
                }
                const { items = [], total } = await userApi.getFollowings(params)
                setFriends(items)
                setTotalFriends(total)
            }
        }
        fetchFriends()
    }, [profile])

    return (
        <div className="section-friends">
            <div className="section-friends-header">
                <div className="friends-header-left">
                    <h2>Friends</h2>
                    <span className="total-friends">{totalFriends} friends</span>
                </div>
                <ButtonHeader className="friends-header-icon" title={"See all friends"} />
            </div>

            <div className="section-friends-list">
                {friends.map((friend, index) => {
                    return (
                        <Link to={`/profile/${friend.user.id}`} className="text-link">
                            <UserCardCircle key={index} className="section-friend-item" user={friend.user} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default SectionFriends
