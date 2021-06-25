import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";

function Devices() {
    const socket = useRef();
    const { deviceId } = useParams();
    const invoice = useRef();
    localStorage.debug = "socket.io-client:socket";

    useEffect(() => {
        socket.current = io("ws://localhost:3001",
            {
                reconnection: true,
                reconnectionDelay: 500,
                reconnectionAttempts: 10
            });
    }, []);

    useEffect(() => {
        socket.current.emit("addDevice", deviceId);
        socket.current.on("devicesConnect", (devices) => {
            console.log("devices", devices);
        });
    }, [deviceId]);

    useEffect(() => {
        socket.current.on("welcome", (text) => {
            console.log(`+ socket.on('welcome') text: ==> ${text}`);
        });
    }, [socket]);

    const handleSendMonitors = () => {
        const invoiceValue = invoice.current.value;
        const data = { deviceId, data: `Data from ${deviceId}: ${invoiceValue}` };
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
