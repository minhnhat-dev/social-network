import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import "./MessengerBox.scss"
import ConversationItem from "components/ConversationItem/ConversationItem"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updatePostNotifyAction, clearPostNotifyAction } from "actions/notifies.action"
import toast from "helpers/toast.helper"
import postsApi from "api/messenger.api"
import { PAGING } from "constants/global.constant"
import userApi from "api/userApi"
import Avatar from "shared/Avatar/Avatar"
import { addUserChat } from "actions/messenger.action"

function MessengerBox({ setBoxSelect }) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isSearchUsers, setIsSearchUsers] = useState(false)
    const [conversations, setConversations] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [users, setUsers] = useState([])
    const pageEnd = useRef()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalItem, setTotalItem] = useState(0)
    const [isLoad, setIsLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const styleAvatar = {
        width: "50px",
        height: "50px",
        marginRight: "10px"
    }

    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPage(p => p + 1)
                }
            },
            {
                threshold: 0.1
            }
        )

        observer.observe(pageEnd.current)
    }, [setPage])

    useEffect(() => {
        const fetchConversation = async () => {
            const skip = Number((page - 1) * pageSize)
            const params = {
                limit: pageSize,
                skip: skip,
                userId: user.id
            }
            const { items = [], total } = await postsApi.getConversations(params)
            setTotalItem(total)
            setConversations(preConversations => {
                return [...preConversations, ...items]
            })
            if (conversations.length >= total) {
                setIsLoad(false)
            }
        }

        if (user.id && isLoad) {
            fetchConversation()
        }
    }, [page, user.id])

    const fetchUsers = async () => {
        try {
            if (textSearch) {
                const params = {
                    skip: PAGING.SKIP_DEFAULT,
                    limit: 20,
                    searchText: textSearch
                }
                const { items = [] } = await userApi.getUsers(params)
                setUsers(items)
            } else {
                setUsers([])
            }
        } catch (error) {
            console.log("+ fetchUsers() error", error)
        } finally {
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            await fetchUsers()
        }, 50)

        return () => clearTimeout(delayDebounceFn)
    }, [textSearch])

    const handleAddUser = user => {
        console.log("user", user)
        const userChat = {
            isShow: true,
            user
        }
        dispatch(addUserChat(userChat))
    }

    return (
        <div className="messenger-box">
            <div className="messenger-box-header">
                <h2 className="mb-10">Messenger</h2>
                <div className="messenger-box-search-wrapper">
                    {isSearchUsers && (
                        <button
                            className="messenger-box-search-back"
                            onClick={() => {
                                setIsSearchUsers(false)
                                setTextSearch("")
                            }}
                        >
                            <i className="fs-28 gray-70 fas fa-arrow-circle-left"></i>
                        </button>
                    )}
                    <div className="messenger-box-search" onClick={() => setIsSearchUsers(true)}>
                        <i class="fs-18 messenger-box-search-icon fas fa-search"></i>
                        <input
                            value={textSearch}
                            onChange={e => setTextSearch(e.target.value)}
                            placeholder="Search on Messenger"
                            className="messenger-box-search-input"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="messenger-box-content">
                {isSearchUsers ? (
                    <div className="box-content-users">
                        <ul className="box-search-list">
                            {users.map((userItem, index) => {
                                return (
                                    <li className="search-item" onClick={() => handleAddUser(userItem)}>
                                        <Avatar styleAvatar={styleAvatar} url={userItem.profilePicture} />
                                        <div className="item-user-name">
                                            <span className="item-text">{userItem.username}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : (
                    <div className="box-content-conversations">
                        {conversations.map(conversation => {
                            return <ConversationItem conversation={conversation} />
                        })}
                        <button ref={pageEnd} style={{ opacity: 0 }}>
                            Load More
                        </button>
                    </div>
                )}
            </div>

            <div className="messenger-footer">
                <button className="clear-messenger">Xem tất cả trong Messenger</button>
            </div>
        </div>
    )
}

export default MessengerBox
