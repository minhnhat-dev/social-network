import { combineReducers } from "redux"
import userReducer from "./users.reducer"
import postsReducer from "./posts.reducer"
import notificationsReducer from "./notifications.reducer"
import authReducer from "./auth.reducer"
import profileReducer from "./profile.reducer"
import socketReducer from "./socket.reducer"
import notifiesReducer from "./notifies.reducer"
import messengerReducer from "./messenger.reducer"

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    notifications: notificationsReducer,
    auth: authReducer,
    profile: profileReducer,
    socket: socketReducer,
    notifies: notifiesReducer,
    messenger: messengerReducer
})

export default rootReducer
