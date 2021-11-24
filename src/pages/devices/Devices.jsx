import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Topbar from "../../components/top-bar/TopBar"

const { REACT_APP_SOCKET_URL_LOCAL, REACT_APP_NODE_ENV, REACT_APP_SOCKET_URL } = process.env
const SOCKET_URL = REACT_APP_NODE_ENV === "localhost" ? REACT_APP_SOCKET_URL_LOCAL : REACT_APP_SOCKET_URL
function Devices() {
    const socket = useRef()
    const { deviceId } = useParams()
    const invoice = useRef()

    const user = {
        userId: deviceId
    }
    useEffect(() => {
        socket.current = io(SOCKET_URL, {
            path: "/v1/socketio",
            withCredentials: true,
            extraHeaders: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhYzI3ZWFmMWZiYzIwMDA2NzJmOGUyIiwiZnVsbF9uYW1lIjoiTmd1eeG7hW4gTWluaCBOaOG6rXQiLCJlbWFpbCI6Im5oYXQubmd1eWVuQGtpbmdmb29kLmNvIiwiZW1wbG95ZWVfY29kZSI6IktGMDAwNDk5IiwibGFzdF9sb2dpbiI6MTYyNDYwMTk5ODY5MCwiZXh0ZW5kX3JvbGVzIjp7fX0sImlhdCI6MTYyNDYwMTk5OCwiZXhwIjoxNjI1MjA2Nzk4fQ.cqMv0kKezMruHV_Xe6tUylZRX-STQz7ssI73OKv_11k" /* auth for header */
            },
            auth: {
                token: "123" /* auth payload */
            },
            query: user
        })
    }, [])

    useEffect(() => {
        console.log("me")

        socket.current.on("getUsers", users => {
            console.log("+ socket.on('getUsers') users", users)
        })

        socket.current.on("error", error => {
            console.log("+ socket.on('error')", error)
        })
    }, [socket])

    const handleSendMonitors = () => {
        const invoiceValue = invoice.current.value
        const data = {
            userId: user.userId,
            data: `Data from ${user.userId}: ${invoiceValue}`
        }
        socket.current.emit("sendMessage", data)
    }

    return (
        <>
            <Topbar />
            <div className="monitors">
                <h2>POS: {deviceId}</h2>
                <input ref={invoice} type="text" placeholder="Invoice" />
                <button type="button" onClick={handleSendMonitors}>
                    send
                </button>
            </div>
        </>
    )
}

export default Devices
