import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../components/top-bar/TopBar";
import RightBar from "../../components/right-bar/RightBar";
import LeftBar from "../../components/left-bar/LeftBar";
import Feed from "../../components/feed/Feed";
import userHandlers from "../../handlers/user.handler";
import "./Home.scss";

function Home() {
    const user = localStorage.getItem("user");
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = JSON.parse(user).id;

    useEffect(() => {
        const getFriends = async () => {
            const params = { userId, sort: "-createdAt" };
            await userHandlers.getFollowings(params, dispatch);
        };

        if (userId) {
            getFriends();
        }
    }, []);

    if (!user) {
        return history.push("/login");
    }

    return (
        <>
            <Topbar />
            <div className="main">
                <LeftBar />
                <Feed />
                <RightBar />
            </div>
        </>
    );
}

export default Home;
