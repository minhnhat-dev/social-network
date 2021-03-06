import React from "react"
import "./Reactions.scss"
import { reactions } from "constants/icons.constant"

function Reactions({ transform = "center", content = "Fell", show = false, onClickButton, onClickIcon }) {
    return (
        <div className="reactions">
            <button className="attach-button" onClick={() => onClickButton(!show)}>
                <i className="base-lemon attach-icon far fa-laugh-wink"></i>
                <span>{content}</span>
            </button>
            <div className={`attach-button-icons-dropdown ${show && "show"} ${transform}`}>
                {reactions.map(icon => {
                    return (
                        <button onClick={() => onClickIcon(icon)} className="btn-not-default">
                            {icon}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Reactions
