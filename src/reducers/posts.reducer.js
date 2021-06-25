import postConstants from "../constants/posts.constant";

const { ACTIONS } = postConstants;

const initStatePosts = {
    isFetching: false,
    posts: [],
    error: ""
};

const postsReducer = (state = initStatePosts, action) => {
    switch (action.type) {
    case ACTIONS.GET_POSTS_START:
        return {
            ...state,
            posts: [],
            isFetching: true,
            error: ""
        };
    case ACTIONS.GET_POSTS_SUCCESS:
        return {
            ...state,
            posts: action.payload,
            isFetching: false,
            error: ""
        };
    case ACTIONS.GET_POSTS_FAILE:
        return {
            ...state,
            posts: [],
            isFetching: false,
            error: action.payload
        };
    default:
        return state;
    }
};

export default postsReducer;
