import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import "./Profile.scss"
import ProfileDetail from "./ProfileDetail/ProfileDetail"
import ProfileList from "./ProfileList/ProfileList"
import Friends from "./ProfileDetail/Friends/Friends"
import Images from "./ProfileDetail/Images/Images"
function Profile({ route }) {
    const match = useRouteMatch()
    console.log("match", match)
    return (
        <Switch>
            <Route path={`${match.path}/:id`} component={ProfileDetail} />
            <Route exact path={`${match.path}`} component={ProfileList} />
        </Switch>
    )
}

export default Profile
