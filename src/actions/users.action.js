import userConstants from "../constants/users.constant";

const { ACTIONS } = userConstants;

const userActions = {
    loginStart: () => ({
        type: ACTIONS.LOGIN_START
    }),
    loginSuccess: (user) => ({
        type: ACTIONS.LOGIN_SUCCESS,
        payload: user
    }),
    loginFailure: (error) => ({
        type: ACTIONS.LOGIN_FAILE,
        payload: error
    }),
    logoutUser: () => ({
        type: ACTIONS.LOGOUT
    }),
    registerStart: () => ({
        type: ACTIONS.REGISTER_START
    }),
    registerSuccess: (user) => ({
        type: ACTIONS.REGISTER_SUCCESS,
        payload: user
    }),
    registerFailure: (error) => ({
        type: ACTIONS.REGISTER_FAILE,
        payload: error
    }),
    setFriends: (friends) => ({
        type: ACTIONS.SET_FRIENDS,
        payload: friends
    })
};

export default userActions;
