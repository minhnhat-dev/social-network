import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";
import RightBar from "../../components/right-bar/RightBar";
import LeftBar from "../../components/left-bar/LeftBar";
import Feed from "../../components/feed/Feed";
import userHandlers from "../../handlers/user.handler";

import "./Home.scss";

function Home() {
    const user = localStorage.getItem("user");
    const history = useHistory();

    if (!user) {
        return history.push("/login");
    }

    useEffect(() => {
        const getFriends = async () => {
            const params = { userId: user.id, sort: "-createdAt" };
            const friendsRes = await userHandlers.getFollowings(params, dispatch);
            setFriends(friendsRes);
        };

        if (userIdGetFriend) {
            getFriends();
        }
    }, [user.id]);

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
