import React from "react"
import "./NotifiesItem.scss"
import TimeAgo from "timeago-react"

function NotifiesItem({ notify = {} }) {
    return (
        <div className="notifies-item">
            <div className="notifies-item-content">
                <div className="notifies-item-avatar">
                    <div className="avatar-header">
                        <img class="avatar" src={notify.sender && notify.sender.profilePicture} alt="avatar"></img>
                        <button className="icon-new far fa-credit-card"></button>
                    </div>
                </div>
                <div className="notifies-item-text">
                    <span>
                        <b>{notify.sender && notify.sender.username}</b> {notify.text}
                    </span>
                </div>
            </div>
            <div className="notifies-item-footer">
                <TimeAgo className="fs-14" datetime={notify.createdAt} locale="en" live={false} />
                {!notify.isRead && <div className="notifies-item-status"></div>}
            </div>
        </div>
    )
}

export default NotifiesItem
