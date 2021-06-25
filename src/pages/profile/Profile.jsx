import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Feed from "../../components/feed/Feed";
import LeftBar from "../../components/left-bar/LeftBar";
import RightBar from "../../components/right-bar/RightBar";
import TopBar from "../../components/top-bar/TopBar";
import userApi from "../../api/userApi";
import "./Profile.scss";

function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userParams, setUserParams] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const userParamsRes = await userApi.getUser(userId);
            setUserParams(userParamsRes);
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return (
        <>
            <TopBar />
            <div className="profile">
                <LeftBar />
                <div className="profile__right">
                    <div className="profile__right__header">
                        <div className="profile__right__header__images">
                            <img
                                src={
                                    userParams.coverPicture
                                        ? `${PUBLIC_FOLDER}${userParams?.coverPicture}`
                                        : `${PUBLIC_FOLDER}noCover.jpg`
                                }
                                alt=""
                                className="profile__right__header__images__banner"
                            />
                            <img
                                src={
                                    userParams.profilePicture
                                        ? `${PUBLIC_FOLDER}person/1.jpeg`
                                        : `${PUBLIC_FOLDER}person/noAvatar.png`
                                }
                                alt=""
                                className="profile__right__header__images__cover"
                            />
                        </div>

                        <div className="profile__right__header__information">
                            <h4 className="profile__right__header__information__username">{userParams?.name}</h4>
                            <span className="profile__right__header__information__description">{userParams?.description || "This is description"}</span>
                        </div>
                    </div>
                    <div className="profile__right__content">
                        <Feed />
                        <RightBar userParams={userParams} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Profile;
