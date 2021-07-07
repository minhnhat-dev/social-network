import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";

const host = "ws://104.248.146.179:3001/devices";
const localhost = "ws://localhost:5000/v1/socketio/chat";
const localhostKov = "ws://beta.learn.kingfood.co:34151/v1/pubsubs/devices";

function Devices() {
    const socket = useRef();
    const { deviceId } = useParams();
    const invoice = useRef();
    localStorage.debug = "socket.io-client:socket";
    const user = {
        userId: deviceId
    };
    useEffect(() => {
        socket.current = io(localhost,
            {
                path: "/v1/socketio",
                reconnection: true,
                reconnectionDelay: 500,
                reconnectionAttempts: 10,
                extraHeaders: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhYzI3ZWFmMWZiYzIwMDA2NzJmOGUyIiwiZnVsbF9uYW1lIjoiTmd1eeG7hW4gTWluaCBOaOG6rXQiLCJlbWFpbCI6Im5oYXQubmd1eWVuQGtpbmdmb29kLmNvIiwiZW1wbG95ZWVfY29kZSI6IktGMDAwNDk5IiwibGFzdF9sb2dpbiI6MTYyNDYwMTk5ODY5MCwiZXh0ZW5kX3JvbGVzIjp7fX0sImlhdCI6MTYyNDYwMTk5OCwiZXhwIjoxNjI1MjA2Nzk4fQ.cqMv0kKezMruHV_Xe6tUylZRX-STQz7ssI73OKv_11k" /* auth for header */
                },
                auth: {
                    token: "123" /* auth payload */
                },
                query: user
                // query: {
                //     device_id: "474b20e5ce220628",
                //     sub_device_name: "Test máy POS"
                // }
            });
    }, []);

    useEffect(() => {
        console.log("me");

        socket.current.on("welcome", (text) => {
            console.log(`+ socket.on('welcome') text: ==> ${text}`);
        });

        socket.current.on("error", (error) => {
            console.log("+ socket.on('error')", error);
        });
    }, [socket]);

    const handleSendMonitors = () => {
        const invoiceValue = invoice.current.value;
        const data = {
            userId: user.userId,
            data: `Data from ${user.userId}: ${invoiceValue}`
        };
        socket.current.emit("sendMessage", data);
    };

    return (
        <>
            <Topbar />
            <div className="monitors">
                <h2>
                    POS:
                    {" "}
                    {deviceId}
                </h2>
                <input ref={invoice} type="text" placeholder="Invoice" />
                <button type="button" onClick={handleSendMonitors}>send</button>
            </div>
        </>
    );
}

export default Devices;
