import { AUTH_TYPES } from "actions/auth.action"

const initStateAuth = {
    user: "",
    accessToken: "",
    refreshToken: "",
    auth: false
}

const authReducer = (state = initStateAuth, action) => {
    switch (action.type) {
        case AUTH_TYPES.LOGIN:
            const { user, accessToken, refreshToken, auth } = action.payload
            return {
                ...state,
                user,
                accessToken,
                refreshToken,
                auth
            }
        case AUTH_TYPES.LOGOUT:
            return {
                ...state,
                user: {},
                accessToken: "",
                refreshToken: "",
                auth: false
            }
        case AUTH_TYPES.UPDATE_USER_AUTH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default authReducer
