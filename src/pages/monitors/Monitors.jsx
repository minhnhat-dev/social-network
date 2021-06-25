import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";

function Monitors() {
    const socket = useRef();
    const { deviceId } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [arrivalMessages, setArrivalMessages] = useState(null);

    useEffect(() => {
        socket.current = io("ws://localhost:3001", {
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: 10
        });

        socket.current.on("getMessage", (data) => {
            console.log(`+ getMessage() data: ${data}`);

            setArrivalMessages({
                deviceId: data.deviceId,
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