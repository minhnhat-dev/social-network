import React from "react"
import "./ListCardMessenger.scss"
import CardMessenger from "components/CardMessenger/CardMessenger"
import { useSelector } from "react-redux"

function ListCardMessenger() {
    const { currentBoxChat } = useSelector(state => state.messenger)
    return (
        <div className="list-card-messenger">
            {currentBoxChat.map(item => {
                return <CardMessenger user={item.user} />
            })}
        </div>
    )
}

export default ListCardMessenger
