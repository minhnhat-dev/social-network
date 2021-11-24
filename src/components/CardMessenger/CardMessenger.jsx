import React from "react"
import "./CardMessenger.scss"
import { removeUserChat } from "actions/messenger.action"
import { useDispatch } from "react-redux"
import MessengerContent from "./MessengerContent/MessengerContent"

function CardMessenger({ user = {} }) {
    const dispatch = useDispatch()

    const removeUser = () => {
        dispatch(removeUserChat(user))
    }

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
                    <MessengerContent />
                    <MessengerContent />
                    <MessengerContent own={true} />
                    <MessengerContent />
                    <MessengerContent own={true} />
                </div>
            </div>
            <div className="card-messenger-footer">
                <div className="messenger-footer-input">
                    <input type="text" placeholder="Aa" />
                </div>
                <div className="messenger-footer-icons">
                    <button className="footer-icon-send">
                        <i className="fs-22 fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardMessenger
