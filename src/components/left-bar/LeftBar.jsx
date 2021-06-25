import React from 'react';
import './LeftBar.scss';
import {
    RssFeed,
    Chat,
    VideoLibrary,
    Group,
    Bookmarks,
    HelpOutline,
    WorkOutline,
    Event
} from '@material-ui/icons';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import { Users } from '../../dummyData';
import CloseFriend from '../close-friends/CloseFriend';

function LeftBar() {
    return (
        <div className="left-bar">
            <div className="left-bar__wrapper">
                <ul className="left-bar__wrapper__list">
                    <li className="left-bar__wrapper__list__item">
                        <RssFeed className="l9eft-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Feeds</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <Chat className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Chats</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <VideoLibrary className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Videos</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <Group className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Groups</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <Bookmarks className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Bookmarks</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <HelpOutline className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Questions</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <WorkOutline className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Jobs</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <Event className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Events</span>
                    </li>
                    <li className="left-bar__wrapper__list__item">
                        <CastForEducationIcon className="left-bar__wrapper__list__item__icon" />
                        <span className="left-bar__wrapper__list__item__text">Courses</span>
                    </li>
                </ul>
                <button className="left-bar__wrapper__button" type="button">Show more</button>
            </div>
            <hr className="left-bar__hr" />
            <div className="left-bar__friends">
                <ul className="left-bar__friends__list">
                    {Users.map((user) => <CloseFriend key={user.id} user={user} />)}
                </ul>
            </div>
        </div>
    );
}

export default LeftBar;
