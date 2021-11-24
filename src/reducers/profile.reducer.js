import { PROFILE_TYPES } from "actions/profile.action"

const initStateProfile = {
    profile: {}
}

const profileReducer = (state = initStateProfile, action) => {
    switch (action.type) {
        case PROFILE_TYPES.GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case PROFILE_TYPES.UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export default profileReducer
