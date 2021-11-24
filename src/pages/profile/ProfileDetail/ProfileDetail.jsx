import React, { useEffect, useState } from "react"
import HeaderCover from "./HeaderCover/HeaderCover"
import HeaderInfo from "./HeaderInfo/HeaderInfo"
import HeaderMenu from "./HeaderMenu/HeaderMenu"
import ContainerLeft from "./ContainerLeft/ContainerLeft"
import ContainerRight from "./ContainerRight/ContainerRight"
import "./ProfileDetail.scss"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import toast from "helpers/toast.helper"
import userApi from "api/userApi"
import { getProfile } from "actions/profile.action"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom"
import { PROFILE_MENU_DEFAULT } from "constants/profile.constant"
import Friends from "./Friends/Friends"
import MainProfileDetail from "./MainProfileDetail/MainProfileDetail"

const componentMap = {
    posts: MainProfileDetail,
    friends: Friends
}
function ProfileDetail() {
    const { user: currentUser } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const { id } = useParams()
    const match = useRouteMatch()
    const [menuSelect, setMenuSelect] = useState(PROFILE_MENU_DEFAULT)
    const Component = componentMap[menuSelect]

    useEffect(() => {
        if (!id) return toast.error("User not found")
        const fetchProfile = async () => {
            await dispatch(getProfile(id))
            setMenuSelect(PROFILE_MENU_DEFAULT)
        }
        fetchProfile()
    }, [id, dispatch])

    return (
        <div className="profile-detail">
            <div className="profile-detail-header">
                <div className="detail-header-wrapper">
                    <HeaderCover />
                    <HeaderInfo />
                    <HeaderMenu menuSelect={menuSelect} setMenuSelect={setMenuSelect} />
                </div>
            </div>
            <div className="profile-detail-container">
                <div className="profile-detail-container-wrapper">
                    <Switch>
                        <Route exact path={`${match.path}/`} component={MainProfileDetail} />
                        <Route path={`${match.path}/friends`} component={Friends} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail
