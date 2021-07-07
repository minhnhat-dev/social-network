import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Users } from "../../dummyData";
import userConstants from "../../constants/users.constant";
import userHandlers from "../../handlers/user.handler";
import toast from "../../api/toast";

function UserProfile({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const userCurrent = useSelector((state) => state.user.user);
    const friendsCurrent = useSelector((state) => state.user.friends);
    const isAddFriend = !!(friendsCurrent.find((item) => item.followingId === user.id));

    const [friends, setFriends] = useState([]);
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        const getFriends = async () => {
            const params = { userId: user.id, sort: "-createdAt" };
            const friendsRes = await userHandlers.getFriendsByUserId(params);
            setFriends(friendsRes);
        };

        if (user.id) {
            getFriends();
        }

        setIsFollow(isAddFriend);
    }, [user.id, isAddFriend]);

    const handleAddFriend = async () => {
        const input = { userId: userCurrent.id, followerId: user.id };
        const inputUnFollow = { userId: userCurrent.id, unFollowerId: user.id };

        if (isFollow) {
            await userHandlers.unFollow(inputUnFollow);
            toast.success("UnFollow Success !");
        } else {
            await userHandlers.follow(input);
            toast.success("Follow Success !");
        }
        setIsFollow(!isFollow);
    };

    console.log("userCurrent.id", userCurrent.id);
    console.log("friendsCurrent", friendsCurrent);
    console.log("isAddFriend", isAddFriend);
    console.log("isFollow", isFollow);

    return (
        <div className="user-profile-right">
            <div className="user-profile-right__header">
                {user.id !== userCurrent.id && (
                    <div className="user-profile-right__header__actions">
                        <button className="user-profile-right__header__actions__add-friend" type="button" onClick={handleAddFriend}>
                            {isFollow
                                ? <i className="fas fa-user-check" />
                                : <i className="fas fa-user-plus" />}
                            {" "}
                            <span>
                                {isFollow ? "UnFollow" : "Follow"}
                                {" "}
                                friend
                            </span>
                        </button>
                        <button className="user-profile-right__header__actions__inbox" type="button">
                            <i className="far fa-comment-alt" />
                            {" "}
                            <span>Chat</span>
                        </button>
                    </div>
                )}
                <h3 className="user-profile-right__header__title">User information note</h3>
                <div className="user-profile-right__header__information">
                    <span className="user-profile-right__header__information__field">City: </span>
                    <span className="user-profile-right__header__information__value">{user.city}</span>
                </div>
                <div className="user-profile-right__header__information">
                    <span className="user-profile-right__header__information__field">From: </span>
                    <span className="user-profile-right__header__information__value">{user.from}</span>
                </div>
                <div className="user-profile-right__header__information">
                    <span className="user-profile-right__header__information__field">Relationship: </span>
                    <span className="user-profile-right__header__information__value">{userConstants.RELATIONSHIP_STRING[user.relationship]}</span>
                </div>

            </div>
            <hr className="user-profile-right__hr" />
            <div className="user-profile-right__followings">
                <h3 className="user-profile-right__followings__header">User friends</h3>
                <div className="user-profile-right__followings__profiles">
                    {friends.map((item) => {
                        const { user: userItem } = item;
                        return (
                            <div className="user-profile-right__followings__profiles__item">
                                <Link to={`/profile/${userItem.id}`}>
                                    <img
                                        src={
                                            userItem && userItem?.profilePicture
                                                ? `${PUBLIC_FOLDER}person/1.jpeg`
                                                : `${PUBLIC_FOLDER}person/noAvatar.png`
                                        }
                                        alt=""
                                        className="user-profile-right__followings__profiles__item__img"
                                    />
                                </Link>
                                <span className="user-profile-right__followings__profiles__item__username">{userItem.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
