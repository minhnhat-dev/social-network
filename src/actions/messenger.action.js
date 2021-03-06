import { NOTIFICATION_TYPES } from "./notifications.action"
import postApi from "api/postApi"
import messengerApi from "api/messenger.api"
import { imageUpload } from "helpers/upload.helper"
import { createPostNotifyAction } from "actions/notifies.action"

export const MESSENGER_TYPES = {
    GET_CONVERSATIONS: "GET_CONVERSATIONS",
    ADD_USER_CHAT: "ADD_USER_CHAT",
    REMOVE_USER_CHAT: "REMOVE_USER_CHAT",
    ADD_MESSAGE: "ADD_MESSAGE",
    GET_MESSAGES: "GET_MESSAGES"
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
                type: MESSENGER_TYPES.GET_POSTS,
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

export const addUserChat = user => dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        dispatch({
            type: MESSENGER_TYPES.ADD_USER_CHAT,
            payload: user
        })
    } catch (error) {
        console.log("+ addUserChat() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const removeUserChat = user => dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        dispatch({
            type: MESSENGER_TYPES.REMOVE_USER_CHAT,
            payload: user
        })
    } catch (error) {
        console.log("+ removeUserChat() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const createMessage =
    ({ userId, body, socket }) =>
        async dispatch => {
            try {
                dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
                const message = await messengerApi.createMessages(body)
                socket.emit("addMessage", message)
                dispatch({
                    type: MESSENGER_TYPES.ADD_MESSAGE,
                    payload: {
                        message,
                        userId
                    }
                })
            } catch (error) {
                console.log("+ createMessage() action error: => ", error)
            } finally {
                dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
            }
        }

export const getMessages =
    ({ userId, params }) =>
        async dispatch => {
            try {
                dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
                const { items = [], total } = await messengerApi.getMessages(params)
                dispatch({
                    type: MESSENGER_TYPES.GET_MESSAGES,
                    payload: {
                        userId,
                        messages: items
                    }
                })
            } catch (error) {
                console.log("+ getMessages() action error: => ", error)
            } finally {
                dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
            }
        }
