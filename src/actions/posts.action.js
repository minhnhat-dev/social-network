import { NOTIFICATION_TYPES } from "./notifications.action"
import postApi from "api/postApi"
import { imageUpload } from "helpers/upload.helper"
import { createPostNotifyAction } from "actions/notifies.action"
export const POST_TYPES = {
    GET_POSTS: "GET_POSTS",
    CREATE_POST: "CREATE_POST",
    UPDATE_POST: "UPDATE_POST",
    UPDATE_POSTS: "UPDATE_POSTS",
    ON_CREATE_BOX: "ON_CREATE_BOX",
    ON_EDIT_BOX: "ON_EDIT_BOX"
}

export const getPost = id => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const postRes = await postApi.getPost(id)
        return postRes
    } catch (error) {
        console.log("+ getPost() action error: => ", error)
        window.location.href = "/post-not-found"
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const getPosts = params => async dispatch => {
    try {
        const { isHomePage = true } = params
        const pageSize = 10
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const { items = [], total } = await postApi.getPosts(params)
        const newTotalPage = Math.ceil(total / pageSize)
        params.totalPage = newTotalPage
        params.totalItems = total
        if (isHomePage) {
            dispatch({
                type: POST_TYPES.GET_POSTS,
                payload: { posts: items, params }
            })
        }
        return { items, total, newTotalPage }
    } catch (error) {
        console.log("+ getPosts() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const createPost = (body, socket) => async dispatch => {
    try {
        const { images = [] } = body
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        if (images.length) {
            const upload = { images }
            const filesUploaded = await imageUpload(upload)
            if (!filesUploaded.length) {
                throw new Error("Update profile picture fail.")
            }
            body.images = filesUploaded
        }

        const newPost = await postApi.createPost(body)
        if (newPost && newPost.id) {
            dispatch({
                type: POST_TYPES.CREATE_POST,
                payload: newPost
            })
            /* dispatch create notify */
            const dataCreateNotify = {
                post: newPost.id,
                sender: newPost.user.id,
                url: `/posts/${newPost.id}`,
                text: "Add new post"
            }
            dispatch(createPostNotifyAction(dataCreateNotify, socket))
            return newPost
        }
    } catch (error) {
        console.log("+ createPost() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const updatePost = (id, body, socket) => async dispatch => {
    try {
        const { images = [] } = body
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newImages = images.filter(image => !image.url)
        const oldImages = images.filter(image => image.url)
        const isUploadImages = !!newImages.length

        if (isUploadImages && newImages.length) {
            const upload = { images: newImages }
            const filesUploaded = await imageUpload(upload)
            if (!filesUploaded.length) {
                throw new Error("Update profile picture fail.")
            }
            const newImagesUpdate = [...filesUploaded, ...oldImages]
            body.images = newImagesUpdate
        }

        const newPost = await postApi.updatePost(id, body)

        if (newPost && newPost.id) {
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
            return newPost
        }
    } catch (error) {
        console.log("+ updatePost() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const deletePost = (post, socket) => async dispatch => {
    try {
        const postId = post.id
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        await postApi.deletePost(postId)
        socket.emit("removeNotify", post)
    } catch (error) {
        console.log("+ detelePost() action error: => ", error)
        window.location.href = "/post-not-found"
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const likePost = (body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })

        const newPost = await postApi.likePost(body)
        if (newPost && newPost.id) {
            socket.emit("likePost", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
            return newPost
        }
    } catch (error) {
        console.log("+ likePost() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const unlikePost = (body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })

        const newPost = await postApi.unLikePost(body)
        if (newPost && newPost.id) {
            socket.emit("unLikePost", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
            return newPost
        }
    } catch (error) {
        console.log("+ unlikePost() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const createComment = (body, socket) => async dispatch => {
    try {
        const { postId } = body
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newComment = await postApi.createComment({ postId, body })
        const newPost = await postApi.getPost(postId)
        if (newPost && newPost.id) {
            socket.emit("createComment", newPost)
            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: newPost
            })
        }
        return newComment
    } catch (error) {
        console.log("+ createComment() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}
