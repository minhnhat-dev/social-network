import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";

function Monitors() {
    const socket = useRef();
    const { deviceId } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [arrivalMessages, setArrivalMessages] = useState(null);
    const localhost = "ws://localhost:5000/v1/socketio/chat";
    const user = {
        userId: deviceId
    };
    useEffect(() => {
        socket.current = io(localhost, {
            path: "/v1/socketio",
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: 10,
            extraHeaders: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhYzI3ZWFmMWZiYzIwMDA2NzJmOGUyIiwiZnVsbF9uYW1lIjoiTmd1eeG7hW4gTWluaCBOaOG6rXQiLCJlbWFpbCI6Im5oYXQubmd1eWVuQGtpbmdmb29kLmNvIiwiZW1wbG95ZWVfY29kZSI6IktGMDAwNDk5IiwibGFzdF9sb2dpbiI6MTYyNDYwMTk5ODY5MCwiZXh0ZW5kX3JvbGVzIjp7fX0sImlhdCI6MTYyNDYwMTk5OCwiZXhwIjoxNjI1MjA2Nzk4fQ.cqMv0kKezMruHV_Xe6tUylZRX-STQz7ssI73OKv_11k" /* auth for header */
            },
            query: user
        });
        console.log("socket", socket);
        socket.current.on("getMessage", (data) => {
            console.log(`+ sendMessage() data: ${data}`);

            setArrivalMessages({
                deviceId: data.userId,
                data: data.data,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        if (arrivalMessages) {
            setInvoices([...invoices, arrivalMessages.data]);
        }
    }, [arrivalMessages]);

    useEffect(() => {
        socket.current.on("welcome", (text) => {
            console.log(`+ socket.on('welcome') text: ==> ${text}`);
        });
        socket.current.on("error", (error) => {
            console.log("+ socket.on('error')", error);
        });
    }, [socket]);

    return (
        <>
            <Topbar />
            <div className="monitors">
                <h2>
                    Monitor:
                    {" "}
                    {deviceId}
                </h2>
                {invoices.map((invoice) => <h3>{invoice}</h3>)}
            </div>
        </>
    );
}

export default Monitors;
