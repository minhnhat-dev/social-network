import React, { useEffect } from "react"
import conversationHandler from "../../handlers/conversations.handler"
import conversationConstants from "../../constants/conversations.constant"
import "./ChatOnline.scss"

const { TYPES } = conversationConstants

function ChatOnline(props) {
    const { userOnline = {}, currentUser = {}, setCurrentChat } = props
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {}, [])

    const handleClick = async () => {
        /* check exist conversation */
        const params = {
            users: [currentUser.id, userOnline.id].join(","),
            type: TYPES.PRIVATE
        }
        const result = await conversationHandler.checkExistsConversation(params)
        const { is_exists: isExists, conversation } = result
        if (isExists) setCurrentChat(conversation)
        if (!isExists) {
            /* create new conversation */
            const body = {
                type: TYPES.PRIVATE,
                members: [currentUser.id, userOnline.id]
            }
            const conversationRes = await conversationHandler.createConversation(body)
            console.log("conversationRes", conversationRes)
            setCurrentChat(conversation)
        }
        console.log("result", result)
    }

    return (
        <li className="online-item" onClick={handleClick}>
            <div className="online-container">
                <img
                    src={
                        userOnline.profilePicture
                            ? `${PUBLIC_FOLDER}person/1.jpeg`
                            : `${PUBLIC_FOLDER}person/noAvatar.png`
                    }
                    alt=""
                />
                <div className="online-badge" />
            </div>
            <div className="username">
                <span>{userOnline.name}</span>
            </div>
        </li>
    )
}

export default ChatOnline
