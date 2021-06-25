import React, { useEffect, useState } from "react";
import { Cake } from "@material-ui/icons";
import "./RightBar.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import UserProfile from "../user-profile/UserProfile";
import userHandlers from "../../handlers/user.handler";

function RightBar({ userParams }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const userCurrent = useSelector((state) => state.user.user);
    const [friends, setFriends] = useState([]);
    const { userId } = useParams();
    const userIdGetFriend = userId || userCurrent.id;
    useEffect(() => {
        const getFriends = async () => {
            const params = { userId: userIdGetFriend, sort: "-createdAt" };
            const { items: friendsRes = [] } = await userHandlers.getFollowings(params);
            setFriends(friendsRes);
        };
        if (userIdGetFriend) {
            getFriends();
        }
    }, [userIdGetFriend]);

    const HomeRightBar = () => (
        <>
            <div className="right-bar__wrapper">
                <div className="right-bar__wrapper__top">
                    <Cake className="orange right-bar__wrapper__top__icon" />
                    <span className="right-bar__wrapper__top__text">
                        <b>Jenny</b>
                        {" "}
                        and
                        {" "}
                        <b>31 other friends</b>
                        {" "}
                        have a birthday today
                    </span>
                </div>
                <div className="right-bar__wrapper__banner">
                    <img src={`${PUBLIC_FOLDER}banner.jpeg`} alt="" className="right-bar__wrapper__banner__img" />
                </div>
                <div className="right-bar__wrapper__friends-online">
                    <span className="right-bar__wrapper__friends-online__title">Online Friends</span>
                    <ul className="right-bar__wrapper__friends-online__list">
                        {friends.map((friend) => {
                            const { user } = friend;
                            return (<Online key={user.id} user={user} />);
                        })}
                    </ul>
                </div>
            </div>
        </>
    );

    return (
        <div className="right-bar">
            {userParams ? <UserProfile user={userParams} /> : HomeRightBar()}
        </div>
    );
}

export default RightBar;
