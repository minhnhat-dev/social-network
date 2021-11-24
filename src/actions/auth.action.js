import { NOTIFICATION_TYPES } from "./notifications.action"
import { loginApi, refreshTokenApi, registerApi, logoutApi, getUserApi } from "api/auth.api"
export const AUTH_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    REFESH_TOKEN: "REFESH_TOKEN",
    UPDATE_USER_AUTH: "UPDATE_USER_AUTH"
}

export const login = body => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const response = await loginApi(body)
        const { accessToken, refreshToken, auth = false } = response
        if (accessToken) localStorage.setItem("accessToken", accessToken)
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken)

        if (auth) {
            dispatch({
                type: AUTH_TYPES.LOGIN,
                payload: response
            })
        }
    } catch (error) {
        console.log("+ login() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const refreshToken = () => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const token = localStorage.getItem("refreshToken")
        if (token) {
            const body = {
                refreshToken: token
            }
            const response = await refreshTokenApi(body)
            const { accessToken, refreshToken, auth = false } = response
            if (accessToken) localStorage.setItem("accessToken", accessToken)
            if (refreshToken) localStorage.setItem("refreshToken", refreshToken)
            if (auth) {
                dispatch({
                    type: AUTH_TYPES.LOGIN,
                    payload: response
                })
            }
        }
    } catch (error) {
        console.log("+ refreshToken() action error: => ", error)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const register = body => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const response = await registerApi(body)
        const { accessToken, refreshToken, auth = false } = response
        if (accessToken) localStorage.setItem("accessToken", accessToken)
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken)

        if (auth) {
            dispatch({
                type: AUTH_TYPES.LOGIN,
                payload: response
            })
        }
    } catch (error) {
        console.log("+ register() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
            const body = { refreshToken }
            const response = await logoutApi(body)
            if (response && !response.auth) {
                console.log("response", response)
                localStorage.removeItem("refreshToken")
                localStorage.removeItem("accessToken")
                dispatch({
                    type: AUTH_TYPES.LOGOUT,
                    payload: response
                })
            }
        }
    } catch (error) {
        console.log("+ logout() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}

export const updateAuth = id => async dispatch => {
    try {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const newUser = await getUserApi(id)
        if (newUser) {
            dispatch({
                type: AUTH_TYPES.UPDATE_USER_AUTH,
                payload: newUser
            })
        }
    } catch (error) {
        console.log("+ updateAuth() action error: => ", error)
    } finally {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
    }
}
