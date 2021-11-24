import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import uuid from "react-uuid"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import _ from "lodash"
import Topbar from "../../components/top-bar/TopBar"
import Conversations from "../../components/conversations/Conversations"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chat-online/ChatOnline"
import conversationHandler from "../../handlers/conversations.handler"
import { getUsers, getFriendsByUserId } from "../../handlers/user.handler"
import toast from "../../api/toast"
import "./Messenger.scss"

const { REACT_APP_SOCKET_URL_LOCAL, REACT_APP_NODE_ENV, REACT_APP_SOCKET_URL } = process.env
const SOCKET_URL = REACT_APP_NODE_ENV === "localhost" ? REACT_APP_SOCKET_URL_LOCAL : REACT_APP_SOCKET_URL

function Messenger() {
    const user = useSelector(state => state.user.user)

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [usersOnline, setUsersOnline] = useState([])
    const [friends, setFriends] = useState([])
    const [newMessage, setNewMessage] = useState()
    const scrollRef = useRef()
    const socket = useRef()
    const query = {
        userId: user.id
    }

    useEffect(() => {
        socket.current = io(SOCKET_URL, {
            path: "/v1/socketio",
            withCredentials: true,
            extraHeaders: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhYzI3ZWFmMWZiYzIwMDA2NzJmOGUyIiwiZnVsbF9uYW1lIjoiTmd1eeG7hW4gTWluaCBOaOG6rXQiLCJlbWFpbCI6Im5oYXQubmd1eWVuQGtpbmdmb29kLmNvIiwiZW1wbG95ZWVfY29kZSI6IktGMDAwNDk5IiwibGFzdF9sb2dpbiI6MTYyNDYwMTk5ODY5MCwiZXh0ZW5kX3JvbGVzIjp7fX0sImlhdCI6MTYyNDYwMTk5OCwiZXhwIjoxNjI1MjA2Nzk4fQ.cqMv0kKezMruHV_Xe6tUylZRX-STQz7ssI73OKv_11k" /* auth for header */
            },
            auth: {
                token: "123" /* auth payload */
            },
            query
        })

        socket.current.on("getMessage", data => {
            console.log("+ getMessage() data:", data)
            const { sender, text, conversationId } = data
            toast.notify(`${sender.name}: ${text}`)

            const messageData = {
                conversationId,
                sender,
                text
            }
            setMessages(prevMessages => [...prevMessages, messageData])
        })
        /* get friends */
        const getFriends = async () => {
            const params = { userId: user.id, sort: "-createdAt" }
            const friendsRes = await getFriendsByUserId(params)
            setFriends(friendsRes)
        }

        getFriends()
        return () => {
            socket.current.disconnect()
            socket.current.off()
        }
    }, [])

    useEffect(() => {
        const { id } = user
        const fetchConversations = async () => {
            const params = {
                sort: "-createdAt",
                userId: id
            }
            const conversationsRes = await conversationHandler.getConversations(params)
            const { items = [] } = conversationsRes
            setConversations(items)
        }

        socket.current.on("getUsers", async users => {
            console.log("+ socket.on('getUsers') users", users)
            const userIds = users.map(item => item.userId)
            const usersValid = friends.filter(item => userIds.includes(item.followingId))
            const usersValidIds = usersValid.map(item => item.followingId)

            /* get users */
            if (usersValidIds.length) {
                const paramsUsers = {
                    ids: usersValidIds.join(","),
                    select: "name profilePicture"
                }
                const { items: usersRes = [] } = await getUsers(paramsUsers)
                setUsersOnline(prevUser => _.unionBy([...prevUser, ...usersRes], "id"))
            }
        })

        socket.current.on("error", error => {
            console.log("+ socket.on('error')", error)
        })

        fetchConversations()
    }, [user, friends])

    const handleClickItem = async conversationId => {
        /* get current chat */
        const conversation = await conversationHandler.getConversation(conversationId)
        setCurrentChat(conversation)
    }

    const handleSubmitMessage = async e => {
        e.preventDefault()
        const userReceive = currentChat.members.find(item => item.id !== user.id)
        const data = {
            conversationId: currentChat.id,
            receiver: userReceive,
            sender: {
                id: user.id,
                name: user.name
            },
            text: newMessage
        }
        socket.current.emit("sendMessage", data)

        const body = {
            conversationId: currentChat.id,
            sender: user.id,
            type: 1,
            text: newMessage
        }
        const messageRes = await conversationHandler.createMessages(body)
        const newMessages = [...messages, messageRes]
        setMessages(newMessages)
        setNewMessage("")
    }

    useEffect(() => {
        const getMessages = async () => {
            const params = {
                conversationId: currentChat.id,
                sort: "createdAt",
                isAll: true
            }
            const { items: messagesFound = [] } = await conversationHandler.getMessages(params)
            setMessages(messagesFound)
        }

        if (currentChat && currentChat.id) {
            getMessages()
        }
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="menu">
                    <div className="menu-wrapper">
                        <input type="text" placeholder="Search for friends" />
                        {conversations.map(conversation => (
                            <div onClick={() => handleClickItem(conversation.id)}>
                                <Conversations
                                    key={conversation.id}
                                    conversation={conversation}
                                    currentUser={user}
                                    handleClickItem={handleClickItem}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="box">
                    {currentChat ? (
                        <div className="box-wrapper">
                            <div className="box-top">
                                {messages.map(message => (
                                    <div ref={scrollRef}>
                                        <Message
                                            key={message.id}
                                            own={message.sender.id === user.id}
                                            message={message}
                                        />
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="bottom">
                                <div className="bottom-wrapper">
                                    <input
                                        value={newMessage}
                                        type="text"
                                        placeholder="Send something"
                                        onChange={e => setNewMessage(e.target.value)}
                                    />
                                    <i className="fas fa-paper-plane" onClick={handleSubmitMessage} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <span className="no-conversation">Open a Conversation to start Chat</span>
                    )}
                </div>
                <div className="online">
                    <ul className="online-wrapper">
                        {usersOnline.map(userOnline => (
                            <ChatOnline currentUser={user} userOnline={userOnline} setCurrentChat={setCurrentChat} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Messenger
