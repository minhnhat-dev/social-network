import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { POST_TYPES } from "actions/posts.action"
import { NOTIFIES_TYPES } from "actions/notifies.action"
import { MESSENGER_TYPES } from "actions/messenger.action"
import { updateAuth, AUTH_TYPES } from "actions/auth.action"
import audiobell from "audio/got-it-done-613.mp3"

const spawnNotification = ({ body = "", icon, url, title }) => {
    const options = { body, icon }
    const notify = new Notification(title, options)

    notify.onclick = e => {
        e.preventDefault()
        window.open(url, "_blank")
    }
}

function SocketIO() {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const audioRef = useRef()

    useEffect(() => {
        const body = { id: auth.user.id }
        if (auth.user) {
            socket.emit("joinUser", body)
        }
    }, [socket, auth.user])

    useEffect(() => {
        socket.on("likeToClient", newPost => {
            console.log("+likeToClient: ", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        })
        return () => socket.off("likeToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("unLikeToClient", newPost => {
            console.log("+unLikeToClient: ", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        })
        return () => socket.off("unLikeToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("createCommentToClient", newPost => {
            console.log("+createCommentToClient: ", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        })
        return () => socket.off("createCommentToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("updateCommentToClient", newPost => {
            console.log("+updateCommentToClient: ", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        })
        return () => socket.off("updateCommentToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("followToClient", user => {
            console.log("+followToClient: ", user)
            dispatch({
                type: AUTH_TYPES.UPDATE_USER_AUTH,
                payload: user
            })
        })
        return () => socket.off("followToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("unfollowToClient", user => {
            console.log("+unfollowToClient: ", user)
            dispatch({
                type: AUTH_TYPES.UPDATE_USER_AUTH,
                payload: user
            })
        })
        return () => socket.off("unfollowToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("createNotifyToClient", notify => {
            dispatch({
                type: NOTIFIES_TYPES.CREATE_NOTIFIES,
                payload: notify
            })
            console.log("notify", notify)
            const { url, text, sender } = notify
            const data = {
                icon: sender.profilePicture,
                url,
                body: `${sender.username} ${text}`,
                title: "minhnhat.dev"
            }

            // audioRef.current.play()
            spawnNotification(data)
        })
        return () => socket.off("createNotifyToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("removeNotifyToClient", postId => {
            console.log("+removeNotifyToClient: ", postId)
            dispatch({
                type: NOTIFIES_TYPES.REMOVE_NOTIFIES,
                payload: postId
            })
        })
        return () => socket.off("removeNotifyToClient")
    }, [socket, dispatch])

    // Message
    useEffect(() => {
        socket.on("addMessageToClient", message => {
            console.log("addMessageToClient", message)
            dispatch({
                type: MESSENGER_TYPES.ADD_MESSAGE,
                payload: {
                    message,
                    userId: message.sender
                }
            })
        })

        return () => socket.off("addMessageToClient")
    }, [socket, dispatch])
    return (
        <>
            {/* <audio id="notify_voice" controls autoPlay allow="autoplay" ref={audioRef}>
                <source src={audiobell} type="audio/mp3" />
            </audio> */}
        </>
    )
}

export default SocketIO
