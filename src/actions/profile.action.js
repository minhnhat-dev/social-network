import { NOTIFICATION_TYPES } from "./notifications.action"
import userApi from "api/userApi"
import { updateProfile as updateProfileApi, follow as followApi, unfollow as unfollowApi } from "api/profile.api"
import { updateAuth, AUTH_TYPES } from "actions/auth.action"
import { timeout } from "helpers/query.helper"
export const PROFILE_TYPES = {
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE"
}

export const getProfile = id => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const user = await userApi.getUser(id)
        if (user && user.id) {
            dispatch({
                type: PROFILE_TYPES.GET_PROFILE,
                payload: user
            })
            return user
        }
    } catch (error) {
        console.log("+ getProfile() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const updateProfile = (id, body) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newUser = await updateProfileApi(id, body)
        if (newUser && newUser.id) {
            dispatch({
                type: PROFILE_TYPES.UPDATE_PROFILE,
                payload: newUser
            })
            dispatch({
                type: AUTH_TYPES.UPDATE_USER_AUTH,
                payload: newUser
            })
        }
    } catch (error) {
        console.log("+ updateProfile() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const follow = (body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const { userId, followerId } = body
        const newUser = await followApi(body)
        if (newUser && newUser.id) {
            await dispatch(getProfile(followerId))
            await dispatch(updateAuth(userId))
            socket.emit("follow", { user: newUser, followerId })
        }
        return newUser
    } catch (error) {
        console.log("+ updateProfile() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const unfollow = (body, socket) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const { userId, unFollowerId, isUserAuth = false } = body
        const newUser = await unfollowApi(body)
        if (newUser && newUser.id) {
            if (isUserAuth) {
                await dispatch(getProfile(userId))
            } else {
                await dispatch(getProfile(unFollowerId))
            }
            await dispatch(updateAuth(userId))
            socket.emit("unfollow", { user: newUser, unFollowerId })
        }
        return newUser
    } catch (error) {
        console.log("+ updateProfile() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}
