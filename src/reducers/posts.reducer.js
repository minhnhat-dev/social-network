import { POST_TYPES } from "actions/posts.action"
import _ from "lodash"

const initStatePosts = {
    posts: [],
    post: {},
    onCreateBox: false,
    onEditBox: false,
    limit: 0,
    skip: 0,
    sort: "-createdAt",
    page: 0
}

const updatePosts = ({ currentPosts = [], newPost = {} }) => {
    const newPosts = currentPosts.map(post => {
        const { id } = post
        if (id === newPost.id) post = newPost
        return post
    })
    return newPosts
}

const postsReducer = (state = initStatePosts, action) => {
    switch (action.type) {
        case POST_TYPES.UPDATE_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload]
            }
        case POST_TYPES.GET_POSTS:
            const { posts: newPosts, params } = action.payload
            return {
                ...state,
                posts: [...state.posts, ...newPosts],
                ...params
            }
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                post: action.payload
            }
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                post: action.payload,
                posts: updatePosts({ currentPosts: state.posts, newPost: action.payload })
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
