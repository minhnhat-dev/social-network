import React from "react"
import "./ConversationItem.scss"
import TimeAgo from "timeago-react"
import { useSelector } from "react-redux"

function ConversationItem({ conversation = {} }) {
    const { user } = useSelector(state => state.auth)
    const receipt = conversation.members ? conversation.members.find(item => item.id !== user.id) : {}

    return (
        <div className="conversation-item">
            <div className="conversation-item-content">
                <div className="conversation-item-avatar">
                    <div className="avatar-header">
                        <img
                            class="avatar"
                            src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1634585195/facebook-clone-profiles/aqdr4by2utqvsi8vtmz8.jpg"
                            alt="avatar"
                        ></img>
                    </div>
                </div>
                <div className="conversation-item-text">
                    <h4>{receipt && receipt.username}</h4>
                    <p className="fs-14 ml-5 item-text-message">{receipt && receipt.username}: Doan chat messenger</p>
                    <TimeAgo
                        className="fs-13 ml-5 item-text-message"
                        datetime={conversation.createdAt}
                        locale="en"
                        live={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConversationItem
