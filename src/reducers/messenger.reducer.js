import { MESSENGER_TYPES } from "actions/messenger.action"

const initStateMessenger = {
    conversations: [],
    currentBoxChat: []
}

const conversationsReducer = (state = initStateMessenger, action) => {
    switch (action.type) {
        case MESSENGER_TYPES.GET_CONVERSATIONS:
            return state
        case MESSENGER_TYPES.REMOVE_USER_CHAT:
            const newBoxChat = state.currentBoxChat.filter(item => item.user.id !== action.payload.id)
            return {
                ...state,
                currentBoxChat: newBoxChat
            }
        case MESSENGER_TYPES.ADD_USER_CHAT:
            const currentUsers = state.currentBoxChat
            const currentLength = currentUsers.length

            let newCurrentBoxChat = []
            const isExist = !!currentUsers.find(item => item.user.id === action.payload.user.id)
            if (isExist) return state

            if (currentLength >= 2) {
                const userSlice = state.currentBoxChat.slice(1)
                newCurrentBoxChat = [action.payload, ...userSlice]
            } else {
                newCurrentBoxChat = [action.payload, ...state.currentBoxChat]
            }

            return {
                ...state,
                currentBoxChat: newCurrentBoxChat
            }
        default:
            return state
    }
}
export default conversationsReducer
