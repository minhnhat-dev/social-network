import React, { useEffect, useState } from "react"
import "./Conversations.scss"

function Conversations({ conversation = {}, currentUser = {} }) {
    const [user, setUser] = useState({})
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const { id: currentUserId } = currentUser
        const { members = [] } = conversation
        const userFound = members.find(item => item.id !== currentUserId)
        setUser(userFound)
    }, [conversation, currentUser])

    return (
        <div className="conversations">
            <img
                src={user.profilePicture ? `${PUBLIC_FOLDER}person/1.jpeg` : `${PUBLIC_FOLDER}person/noAvatar.png`}
                alt=""
            />
            <span className="conversations-text">{user.name}</span>
        </div>
    )
}

export default Conversations
