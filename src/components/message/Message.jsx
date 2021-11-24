import React from "react"
import TimeAgo from "timeago-react"
import "./Message.scss"

function Message({ message = {}, own }) {
    const { REACT_APP_PUBLIC_FOLDER } = process.env

    return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <img src={`${REACT_APP_PUBLIC_FOLDER}person/9.jpeg`} alt="" />
                <span>{message.text}</span>
            </div>
            <div className="message-bottom">
                <span>
                    {" "}
                    <TimeAgo datetime={message.createdAt} locale="en" live={false} />
                </span>
            </div>
        </div>
    )
}

export default Message
