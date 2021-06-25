import { combineReducers } from "redux";
import userReducer from "./users.reducer";
import postsReducer from "./posts.reducer";

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer
});

export default rootReducer;
