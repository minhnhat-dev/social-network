import { POST_TYPES } from "actions/posts.action"

const initStatePosts = {
    posts: []
}

const postsReducer = (state = initStatePosts, action) => {
    switch (action.type) {
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                post: action.payload
            }
        case POST_TYPES.ON_CREATE_BOX:
            const newState = {
                ...state,
                onCreateBox: !state.onCreateBox,
                onEditBox: false
            }
            if (!newState.onCreateBox) newState.post = {}
            return newState
        case POST_TYPES.ON_EDIT_BOX:
            return {
                ...state,
                onEditBox: !state.onEditBox,
                onCreateBox: true,
                post: action.payload
            }

        default:
            return state
    }
}

export default postsReducer
