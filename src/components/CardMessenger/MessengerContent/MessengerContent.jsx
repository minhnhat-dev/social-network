import React, { forwardRef } from "react"
import "./MessengerContent.scss"
import TimeAgo from "timeago-react"
import { imageShow, videoShow } from "helpers/media.helper"

function MessengerContent({ own, user, message }, ref) {
    return (
        <div ref={ref} className={`messenger-content-box ${own && "own"}`}>
            <div className="content-box-avatar">
                <img src={user.profilePicture} alt="avatar" />
            </div>
            <div className="content-box-text">
                {message.text ? (
                    <p className={`text-messenger ${message.media.length && "has-images"}`}>{message.text}</p>
                ) : null}
                {message.media.length
                    ? message.media.map((item, index) => (
                          <div className="content-box-media" key={index}>
                              {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
                          </div>
                      ))
                    : null}

                <p className="fs-12 text-messenger-time">
                    <TimeAgo datetime={message.createdAt} locale="en" live={false} />
                </p>
            </div>
        </div>
    )
}

export default forwardRef(MessengerContent)
