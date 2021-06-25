import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./TopBar.scss";

function Topbar() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const user = useSelector((state) => state.user.user, shallowEqual);

    return (
        <div className="topbar">
            <div className="topbar__left">
                <Link to="/" className="text-link">
                    <span className="topbar__left__logo">Social Network</span>
                </Link>
            </div>
            <div className="topbar__center">
                <div className="topbar__center__search">
                    <Search className="topbar__center__search__icon" />
                    <input className="topbar__center__search__input" placeholder="Search for friends, post, video..." />
                </div>

            </div>
            <div className="topbar__right">
                <div className="topbar__right__links">
                    <span className="topbar__right__links__item">Home page</span>
                    <span className="topbar__right__links__item">Time line</span>
                </div>
                <div className="topbar__right__icons">
                    <div className="topbar__right__icons__item">
                        <Person />
                        <span className="topbar__right__icons__item__badge">12</span>
                    </div>
                    <div className="topbar__right__icons__item">
                        <Chat />
                        <span className="topbar__right__icons__item__badge">12</span>
                    </div>
                    <div className="topbar__right__icons__item">
                        <Notifications />
                        <span className="topbar__right__icons__item__badge">12</span>
                    </div>
                </div>
                <div className="topbar__right__profile">
                    <Link to={`/profile/${user?.id}`}>
                        <img
                            className="topbar__right__profile__img"
                            src={user?.profilePicture
                                ? `${PUBLIC_FOLDER}person/1.jpeg`
                                : `${PUBLIC_FOLDER}person/noAvatar.png`}
                            alt=""
                            width="50px"
                            height="50px"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
