import React, { forwardRef } from "react"
import "./InputComment.scss"
import { Link } from "react-router-dom"
import UserCardCircle from "shared/UserCardCircle/UserCardCircle"

function InputComment({ user, handleSubmit, value, name, handleOnChange }) {
    return (
        <div className="card-comments-input">
            <Link to={`/profile/${user.id}`} className="text-link">
                <UserCardCircle className="comments-input-avatar" user={user} />
            </Link>
            <div className="comments-input-group">
                <input
                    name={name}
                    value={value}
                    className="comments-input"
                    type="text"
                    placeholder="Write your comment"
                    onChange={handleOnChange}
                    onKeyDown={handleSubmit}
                />
            </div>
        </div>
    )
}

export default InputComment
