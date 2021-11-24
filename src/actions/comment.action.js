import { NOTIFICATION_TYPES } from "./notifications.action"
import postsApi from "api/postApi"
import { POST_TYPES } from "actions/posts.action"

export const update = (body, socket) => async dispatch => {
    try {
        const { postId } = body
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newComment = await postsApi.updateComment(body)
        const newPost = await postsApi.getPost(postId)
        if (newPost && newPost.id) {
            socket.emit("updateComment", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        }
        return newComment
    } catch (error) {
        console.log("+ updateComment () comment action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const deleteComment = (body, socket) => async dispatch => {
    try {
        const { postId } = body
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newComment = await postsApi.deleteComment(body)
        const newPost = await postsApi.getPost(postId)
        if (newPost && newPost.id) {
            socket.emit("updateComment", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        }
        return newComment
    } catch (error) {
        console.log("+ delete() comment action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}
