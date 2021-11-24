import React from "react"
import "./MessengerContent.scss"
import TimeAgo from "timeago-react"

function MessengerContent({ own }) {
    return (
        <div className={`messenger-content-box ${own && "own"}`}>
            <div className="content-box-avatar">
                <img
                    src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1634585195/facebook-clone-profiles/aqdr4by2utqvsi8vtmz8.jpg"
                    alt="avatar"
                />
            </div>
            <div className="content-box-text">
                <p className="text-messenger">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae asperiores debitis eaque maiores
                    dolorum repellendus illo
                </p>
                <p className="fs-12 text-messenger-time">
                    <TimeAgo datetime={"2021-11-11T15:24:21.105Z"} locale="en" live={false} />
                </p>
            </div>
        </div>
    )
}

export default MessengerContent
