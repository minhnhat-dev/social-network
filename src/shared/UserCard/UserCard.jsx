import React from "react"
import "./UserCard.scss"
import Avatar from "shared/Avatar/Avatar"
import Icon from "shared/Icon/Icon"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
function UserCard({ user }) {
    return (
        <div className="user-card">
            <img className="user-card-img" src={user.profilePicture} alt="" />
            <h5>{user.username}</h5>
            <div className="user-card-tooltip">
                <div className="user-card-header">
                    <div className="user-card-left">
                        <Avatar className="card-left-avatar" url={user.profilePicture} />
                    </div>
                    <div className="user-card-right">
                        <h3>Tran Nghia</h3>
                        <ul>
                            <li className="card-right-item">
                                <Icon className="right-item-icon" icon="fas fa-user-check" />
                                <span>Đã trở thành bạn bè với Minh Thuan và 56 người khác</span>
                            </li>
                            <li className="card-right-item">
                                <Icon className="right-item-icon" icon="fas fa-user-friends" />
                                <span>20 bạn chung bao gồm Nguyễn Thị Việt Trinh và Trực Pin</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-card-footer">
                    <ButtonTitle className="card-footer-icon" title="Friend" icon="fas fa-user-check" />
                    <ButtonTitle
                        className="card-footer-icon icon-blue"
                        title="Inbox"
                        icon="fab fa-facebook-messenger"
                    />
                    <ButtonTitle className="card-footer-icon width-40" icon="fas fa-ellipsis-h" />
                </div>
            </div>
        </div>
    )
}
export default UserCard
