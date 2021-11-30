import React, { useState, useEffect, useRef } from "react"
import "./CardMessenger.scss"
import { removeUserChat } from "actions/messenger.action"
import { useDispatch } from "react-redux"
import MessengerContent from "./MessengerContent/MessengerContent"
import { imageShow, videoShow } from "helpers/media.helper"
import toast from "helpers/toast.helper"
import Reactions from "components/Reactions/Reactions"
import { useSelector } from "react-redux"
import { createMessage, getMessages } from "actions/messenger.action"
import { imageUpload } from "helpers/upload.helper"
import messengerApi from "api/messenger.api"
import { PAGING } from "constants/global.constant"

function CardMessenger({ user = {} }) {
    const { user: storageUser } = useSelector(state => state.auth)
    const { currentBoxChat = [] } = useSelector(state => state.messenger)
    const socket = useSelector(state => state.socket)
    const dispatch = useDispatch()
    const [media, setMedia] = useState([])
    const [showReaction, setShowReaction] = useState(false)
    const [loadUpload, setLoadUpload] = useState(false)
    const [conversationId, setConversationId] = useState("")
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    const refDisplay = useRef()

    useEffect(() => {
        const createConversation = async () => {
            const users = `${storageUser.id},${user.id}`
            const params = {
                users,
                type: 1
            }

            const { is_exists: isExists = false, conversation = null } = await messengerApi.checkExistConversation(
                params
            )
            console.log("conversation", conversation)
            if (conversation) {
                setConversationId(conversation.id)
            }

            if (!isExists) {
                /* create new conversation */
                const body = {
                    members: [storageUser.id, user.id],
                    type: 1
                }
                const newConversation = await messengerApi.createConversation(body)
                setConversationId(newConversation.id)
                console.log("newConversation", newConversation)
            }
        }
        createConversation()
    }, [storageUser.id, user.id])

    useEffect(() => {
        const getMessagesFirst = async () => {
            const params = {
                isAll: true,
                sort: "createdAt",
                conversationId
            }
            await dispatch(getMessages({ userId: user.id, params }))
        }

        if (conversationId) {
            getMessagesFirst()
        }
    }, [conversationId, dispatch, user.id])

    useEffect(() => {
        const foundUser = currentBoxChat.find(item => item.user.id === user.id) || {}
        if (foundUser) {
            setMessages(foundUser.messages || [])
            refDisplay.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [currentBoxChat, user.id])

    const removeUser = () => {
        dispatch(removeUserChat(user))
    }

    const onClickReaction = icon => {
        setText(preText => {
            return preText.concat(icon)
        })
    }

    const handleChangeMedia = e => {
        const files = [...e.target.files]
        let newMedia = []

        files.forEach(file => {
            if (!file) return toast.error("File does not exist.")

            if (file.size > 1024 * 1024 * 5) {
                return toast.error("The image/video largest is 5mb.")
            }

            return newMedia.push(file)
        })

        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = index => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const getBodyCreateMessage = async () => {
        let newArr = []
        setShowReaction(false)

        if (media.length > 0) {
            setLoadUpload(true)
            newArr = await imageUpload({ images: media })
            setLoadUpload(false)
            setMedia([])
        }
        const body = {
            conversationId,
            sender: storageUser.id,
            receiver: user.id,
            text,
            media: newArr
        }

        return body
    }

    const handleSubmit = async event => {
        const body = await getBodyCreateMessage()
        await dispatch(createMessage({ userId: user.id, body, socket }))
        setText("")
        // setMessages(preMessages => {
        //     return [...preMessages, message]
        // })
    }

    const handleOnKeyDown = async event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const body = await getBodyCreateMessage()
            await dispatch(createMessage({ userId: user.id, body, socket }))
            setText("")
            // setMessages(preMessages => {
            //     return [...preMessages, message]
            // })
        }
    }

    useEffect(() => {
        console.log("messages ZOO")
        refDisplay.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="card-messenger">
            <div className="card-messenger-header">
                <div className="messenger-header-left">
                    <img src={user?.profilePicture} alt="avatar" className="messenger-header-left-avatar" />
                    <span className="messenger-header-left-name">
                        {user?.username.length > 8 ? `${user?.username.slice(0, 8)}...` : user?.username}
                    </span>
                </div>
                <div className="messenger-header-right">
                    <button className="messenger-header-right-collapse">
                        <i className="fs-17 fas fa-video"></i>
                    </button>
                    <button className="messenger-header-right-collapse">
                        <i className="fs-17 fas fa-phone-alt"></i>
                    </button>

                    <button className="messenger-header-right-collapse" onClick={removeUser}>
                        <i className="fs-20 fas fa-minus"></i>
                    </button>
                    <button className="messenger-header-right-close" onClick={removeUser}>
                        <i className="fs-20 fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div className="card-messenger-content">
                <div className="card-messenger-content-wrapper">
                    {messages.map((message, index) => {
                        const { sender } = message
                        const isOwner = !!(sender === storageUser.id)
                        const userProfile = isOwner ? storageUser : user
                        return (
                            <MessengerContent
                                ref={refDisplay}
                                message={message}
                                user={userProfile}
                                key={index}
                                own={isOwner}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="card-messenger-footer">
                {media && media.length ? (
                    <>
                        <div className="messenger-footer-images">
                            {media.map((item, index) => (
                                <div key={index} className="file-media">
                                    {item.type.match(/video/i)
                                        ? videoShow(URL.createObjectURL(item))
                                        : imageShow(URL.createObjectURL(item), loadUpload)}
                                    <button
                                        className={`file-media-btn ${loadUpload && "load"}`}
                                        onClick={() => handleDeleteMedia(index)}
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                    {loadUpload && (
                                        <img
                                            className="loading-img"
                                            src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630586487/icons/Spinner-1s-200px_6.gif"
                                            alt=""
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : null}

                <div className="messenger-footer-icons file-input">
                    <button className="footer-icon-send">
                        <i className="base-lime fs-20 fas fa-image"></i>
                    </button>
                    <input
                        type="file"
                        name="file-chat"
                        id="file-chat"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleChangeMedia}
                    />
                </div>
                <div className="messenger-footer-input">
                    <input
                        type="text"
                        placeholder="Aa"
                        onKeyDown={handleOnKeyDown}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button className="footer-input-reactions">
                        <Reactions
                            content={""}
                            transform={"top-left"}
                            show={showReaction}
                            onClickIcon={onClickReaction}
                            onClickButton={setShowReaction}
                        />
                    </button>
                </div>
                <div className="messenger-footer-icons">
                    <button className="footer-icon-send" onClick={handleSubmit}>
                        <i className="fs-22 fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardMessenger
