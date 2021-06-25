import postConstants from "../constants/posts.constant";

const { ACTIONS } = postConstants;
const postActions = {
    getPostsStart: () => ({
        type: ACTIONS.GET_POSTS_START
    }),
    getPostsSuccess: (posts) => ({
        type: ACTIONS.GET_POSTS_SUCCESS,
        payload: posts
    }),
    getPostsFailure: (error) => ({
        type: ACTIONS.GET_POSTS_FAILE,
        payload: error
    })
};

export default postActions;
