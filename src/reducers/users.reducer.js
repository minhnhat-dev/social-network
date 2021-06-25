import userConstants from "../constants/users.constant";

const { ACTIONS } = userConstants;
const userCurrent = localStorage.getItem("user") || null;

const initStateUser = {
    isFetching: false,
    user: JSON.parse(userCurrent),
    posts: [],
    error: ""
};

const usersReducer = (state = initStateUser, action) => {
    switch (action.type) {
    case ACTIONS.LOGIN_START:
        return {
            ...state,
            user: null,
            isFetching: true,
            error: ""
        };
    case ACTIONS.LOGIN_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isFetching: false,
            error: ""
        };
    case ACTIONS.LOGIN_FAILE:
        return {
            ...state,
            user: null,
            isFetching: false,
            error: action.payload
        };
    case ACTIONS.LOGOUT:
        return {
            ...state,
            user: null,
            isFetching: false,
            error: ""
        };
    case ACTIONS.REGISTER_START:
        return {
            ...state,
            user: null,
            isFetching: true,
            error: ""
        };
    case ACTIONS.REGISTER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isFetching: false,
            error: ""
        };
    case ACTIONS.REGISTER_FAILE:
        return {
            ...state,
            user: null,
            isFetching: false,
            error: action.payload
        };
    default:
        return state;
    }
};

export default usersReducer;
