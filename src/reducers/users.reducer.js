import { ACTIONS } from "../constants/users.constant"

const initStateUser = {
    user: "",
    accessToken: "",
    refreshToken: "",
    auth: false
}

const usersReducer = (state = initStateUser, action) => {
    switch (action.type) {
        case ACTIONS.REGISTER_START:
            return {
                ...state,
                user: null,
                isFetching: true,
                error: ""
            }
        case ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: ""
            }
        case ACTIONS.REGISTER_FAILE:
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload
            }
        case ACTIONS.GET_FRIENDS:
            return {
                ...state,
                friends: [],
                isFetching: true,
                error: ""
            }
        case ACTIONS.SET_FRIENDS:
            return {
                ...state,
                friends: action.payload,
                isFetching: false,
                error: ""
            }
        default:
            return state
    }
}

export default usersReducer
