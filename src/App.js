import React, { useContext, Suspense, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./App.scss"

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { refreshToken } from "actions/auth.action"
import { history } from "./helpers/history"
import Loader from "shared/Loader/Loader"
import GuestRoute from "guards/GuestRoute"
import ProtectedRoute from "guards/ProtectedRoute"
import Navigation from "shared/Navigation/Navigation"
import LoaderIcon from "shared/LoaderIcon/LoaderIcon"
import { matchRoutes, renderRoutes } from "react-router-config"
import io from "socket.io-client"
import SocketIOHandler from "./shared/SocketIO/SocketIO"
import { GLOBALTYPES } from "./actions/global.action"
import { getPosts } from "actions/posts.action"
import { getNotifiesAction } from "actions/notifies.action"
import ListCardMessenger from "components/ListCardMessenger/ListCardMessenger"
const Home = React.lazy(() => import("pages/home/Home"))
const Login = React.lazy(() => import("pages/login/Login"))
const Register = React.lazy(() => import("pages/register/Register"))
const Profile = React.lazy(() => import("pages/profile/Profile"))
const Friends = React.lazy(() => import("pages/profile/ProfileDetail/Friends/Friends"))
const Messenger = React.lazy(() => import("pages/messenger/Messenger"))
const NotFound = React.lazy(() => import("shared/NotFound/NotFound"))
const PostNotFound = React.lazy(() => import("pages/post-not-found/PostNotFound"))
const Posts = React.lazy(() => import("pages/posts/Posts"))
const styleLoader = {
    backgroundColor: "rgba(0, 0, 0, 0.85)"
}

const { REACT_APP_SOCKET_URL_LOCAL, REACT_APP_NODE_ENV, REACT_APP_SOCKET_URL } = process.env
const SOCKET_URL = REACT_APP_NODE_ENV === "localhost" ? REACT_APP_SOCKET_URL_LOCAL : REACT_APP_SOCKET_URL

function App() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { currentBoxChat } = useSelector(state => state.messenger)
    useEffect(() => {
        function notifyMe() {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification")
            } else if (Notification.permission === "granted") {
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                    }
                })
            }
        }
        notifyMe()
    }, [])

    useEffect(() => {
        const params = {
            skip: 0,
            limit: 10,
            sort: "-createdAt",
            page: 1
        }
        const paramsGetNotifies = {
            sort: "-createdAt",
            isRead: false,
            receipt: user.id
        }
        dispatch(getPosts(params))
        if (user.id) dispatch(getNotifiesAction(paramsGetNotifies))
    }, [dispatch, user.id])

    useEffect(() => {
        const options = {
            path: "/api/v1/socketio",
            withCredentials: true
        }
        const refresh = async () => {
            await dispatch(refreshToken())
        }
        refresh()
        const socket = io(SOCKET_URL, options)
        dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
        return () => socket.close()
    }, [dispatch])

    return (
        <Suspense fallback={<Loader show={true} />}>
            <Router history={history}>
                <div className="app">
                    <Loader />
                    <Navigation />
                    {currentBoxChat && currentBoxChat.length && <ListCardMessenger />}

                    {user && <SocketIOHandler />}
                    {/* <input type="checkbox" id="theme"></input> */}
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <GuestRoute path="/register" component={Register} />
                        <GuestRoute path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/posts" component={Posts} />
                        <Route path="/post-not-found/" component={PostNotFound} />
                        <Route path="*" component={NotFound} />
                        {/* <Redirect from="*" to="/" /> */}
                    </Switch>
                </div>
            </Router>
        </Suspense>
    )
}

export default App
