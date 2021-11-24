import { NOTIFICATION_TYPES } from "actions/notifications.action"

const initStatePosts = {
    loading: false
}

const notificationsReducer = (state = initStatePosts, action) => {
    switch (action.type) {
        case NOTIFICATION_TYPES.LOAD_START:
            return {
                ...state,
                loading: true
            }
        case NOTIFICATION_TYPES.LOAD_DONE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default notificationsReducer
