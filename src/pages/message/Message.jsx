import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";
import "./Message.scss";

function Message() {
    const socket = useRef();
    const { userId } = useParams();
    const [message, setMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        socket.current = io("ws://localhost:3001");
        socket.current.on("getMessage", (data) => {
            console.log("data", data);
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessage([...message, arrivalMessage.text]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        console.log("socket.current", socket.current);
        socket.current.emit("addUser", userId);
        socket.current.on("usersOnline", (users) => {
            console.log("users", users);
        });
    }, [userId]);

    useEffect(() => {
        socket.current.on("welcome", (mes) => {
            console.log("message", mes);
        });
    }, [socket]);

    const handleSendMessage = () => {
        socket.current.emit("sendMessage", { senderId: "userA", receiverId: "userB", text: "Chich khong ?" });
    };
    console.log("message", message);
    return (
        <>
            <Topbar />
            <div className="message">
                this this page message
                <input type="text" placeholder="message" />
                <button type="button" onClick={handleSendMessage}>send</button>
                <span>{message.join(", ")}</span>
            </div>
        </>
    );
}

export default Message;
