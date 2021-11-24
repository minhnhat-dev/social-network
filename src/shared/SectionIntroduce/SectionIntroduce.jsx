import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RELATIONSHIP_STRING } from "constants/users.constant"
import "./SectionIntroduce.scss"
import ToggleSwitch from "shared/ToggleSwitch/ToggleSwitch"

function SectionIntroduce({ title, className, update }) {
    const { profile } = useSelector(state => state.profile)
    let [relationship, setRelationship] = useState(false)
    return (
        <div className={`${className} section-introduce`}>
            <h2 className="introduce-title">{title}</h2>
            <div className="introduce-list-wrapper">
                <ul className="introduce-list">
                    <li className="introduce-item">
                        <button className="introduce-item-btn">
                            <i className="introduce-item-icon fas fa-map-marker-alt"></i>
                        </button>
                        <span className="introduce-item-text">
                            From <strong>{profile.from}</strong>
                        </span>
                    </li>
                    <li className="introduce-item">
                        <button className="introduce-item-btn">
                            <i className="introduce-item-icon fas fa-heart"></i>
                        </button>
                        <span className="introduce-item-text">{RELATIONSHIP_STRING[profile.relationship]}</span>
                    </li>
                    <li className="introduce-item">
                        <button className="introduce-item-btn">
                            <i className="introduce-item-icon follow fas fa-wifi"></i>
                        </button>
                        <span className="introduce-item-text">
                            There are <strong>{profile.totalFollowers}</strong> followers
                        </span>
                    </li>
                    <li className="introduce-item">
                        <button className="introduce-item-btn">
                            <i className="introduce-item-icon fab fa-instagram"></i>
                        </button>
                        <span className="introduce-item-text">nhattayy_</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SectionIntroduce
