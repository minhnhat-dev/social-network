import { NOTIFICATION_TYPES } from "./notifications.action"
import { getPostNotifyApi } from "api/notifies.api"
import { updateProfile as updateProfileApi, follow as followApi, unfollow as unfollowApi } from "api/profile.api"
import { updateAuth, AUTH_TYPES } from "actions/auth.action"
import { timeout } from "helpers/query.helper"
import { createPostNotifyApi, updatePostNotifiesApi, clearPostNotifiesApi } from "api/notifies.api"

export const NOTIFIES_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES",
    CREATE_NOTIFIES: "CREATE_NOTIFIES",
    REMOVE_NOTIFIES: "REMOVE_NOTIFIES",
    UPDATE_NOTIFIES: "UPDATE_NOTIFIES",
    CLEAR_NOTIFIES: "CLEAR_NOTIFIES"
}

export const getNotifiesAction = params => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const { items = [] } = await getPostNotifyApi(params)
        dispatch({
            type: NOTIFIES_TYPES.GET_NOTIFIES,
            payload: items
        })
    } catch (error) {
        console.log("+ getNotifiesAction() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const createPostNotifyAction = (body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const notifies = await createPostNotifyApi(body)
        socket.emit("createNotify", notifies)
    } catch (error) {
        console.log("+ createPostNotifyAction() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const updatePostNotifyAction = (notifyId, body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newNotify = await updatePostNotifiesApi(notifyId, body)
        dispatch({
            type: NOTIFIES_TYPES.UPDATE_NOTIFIES,
            payload: newNotify
        })
    } catch (error) {
        console.log("+ updatePostNotifyAction() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const clearPostNotifyAction = query => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        await clearPostNotifiesApi(query)
        dispatch({
            type: NOTIFIES_TYPES.CLEAR_NOTIFIES,
            payload: []
        })
    } catch (error) {
        console.log("+ clearPostNotifyAction() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const removeNotifiesAction = (body, socket) => async dispatch => {
    try {
    } catch (error) {
        console.log("+ updateProfile() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}
