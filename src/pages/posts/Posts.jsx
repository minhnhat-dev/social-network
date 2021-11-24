import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import "./Posts.scss"
import PostDetail from "./post-detail/PostDetail"
function Posts() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/:id`} component={PostDetail} />
        </Switch>
    )
}

export default Posts
