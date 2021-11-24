import React from "react"
import "./CardLike.scss"

function CardLike({ comment }) {
    return (
        <button className="card-like">
            <img
                className="rotate-5 mr-3 card-like-img"
                src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630828282/icons/like-1.1s-200px_7.png"
                alt="like"
            />
            <span className="fs-12 gray-80 fw-500 mr-3">{comment.totalLikes}</span>
        </button>
    )
}

export default CardLike
