import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/top-bar/TopBar";
import RightBar from "../../components/right-bar/RightBar";
import LeftBar from "../../components/left-bar/LeftBar";
import Feed from "../../components/feed/Feed";

import "./Home.scss";

function Home() {
    const user = localStorage.getItem("user");
    const history = useHistory();

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
