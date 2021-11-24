import { NOTIFIES_TYPES } from "actions/notifies.action"

const initStateNotifies = {
    notifies: []
}

const notifiesReducer = (state = initStateNotifies, action) => {
    switch (action.type) {
        case NOTIFIES_TYPES.GET_NOTIFIES:
            return action.payload
        case NOTIFIES_TYPES.CREATE_NOTIFIES:
            return [action.payload, ...state]
        case NOTIFIES_TYPES.UPDATE_NOTIFIES:
            const newNotifies = state.map(item => {
                const { id } = item
                if (id === action.payload.id) item = action.payload
                return item
            })
            return newNotifies
        case NOTIFIES_TYPES.REMOVE_NOTIFIES:
            return state.filter(item => item.post !== action.payload)
        case NOTIFIES_TYPES.CLEAR_NOTIFIES:
            return action.payload
        default:
            return state
    }
}

export default notifiesReducer
