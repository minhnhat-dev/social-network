import { ACTIONS } from "../constants/users.constant"

const userActions = {
    login: body => ({
        type: ACTIONS.LOGIN,
        payload: body
    }),
    loginSuccess: user => ({
        type: ACTIONS.LOGIN_SUCCESS,
        payload: user
    }),
    loginFailure: error => ({
        type: ACTIONS.LOGIN_FAILE,
        payload: error
    }),
    logoutUser: () => ({
        type: ACTIONS.LOGOUT
    }),
    registerStart: () => ({
        type: ACTIONS.REGISTER_START
    }),
    registerSuccess: user => ({
        type: ACTIONS.REGISTER_SUCCESS,
        payload: user
    }),
    registerFailure: error => ({
        type: ACTIONS.REGISTER_FAILE,
        payload: error
    }),
    getFriends: () => ({
        type: ACTIONS.GET_FRIENDS
    }),
    setFriends: friends => ({
        type: ACTIONS.SET_FRIENDS,
        payload: friends
    })
}

export default userActions
