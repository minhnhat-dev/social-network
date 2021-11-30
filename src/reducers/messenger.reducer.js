import { MESSENGER_TYPES } from "actions/messenger.action"

const initStateMessenger = {
    conversations: [],
    currentBoxChat: [],
    data: {}
}

const foundUser = ({ users, userId }) => {
    if (!users.length || !userId) return null
    const userFound = users.find(item => item.user.id === userId)
    return userFound
}

const createNewUsers = ({ users, userId, newUser }) => {
    const newUsers = users.map(item => {
        const { id } = item.user
        if (id === userId) {
            item = newUser
        }
        return item
    })
    return newUsers
}

const conversationsReducer = (state = initStateMessenger, action) => {
    switch (action.type) {
        case MESSENGER_TYPES.GET_CONVERSATIONS:
            return state
        case MESSENGER_TYPES.ADD_MESSAGE:
            const { message, userId: receiver } = action.payload
            const newUserAdd = foundUser({ users: state.currentBoxChat, userId: receiver })
            if (newUserAdd) {
                if (newUserAdd.messages && newUserAdd.messages.length) {
                    newUserAdd.messages.push(message)
                } else {
                    newUserAdd.messages = [message]
                }
            }
            const newUsersAdd = createNewUsers({
                users: state.currentBoxChat,
                userId: receiver,
                newUser: newUserAdd
            })
            return {
                ...state,
                currentBoxChat: newUsersAdd
            }
        case MESSENGER_TYPES.GET_MESSAGES:
            const { userId, messages } = action.payload
            console.log("messages redux", messages)
            const newUser = foundUser({ users: state.currentBoxChat, userId })
            if (newUser) newUser.messages = messages
            const newUsersActionGet = createNewUsers({ users: state.currentBoxChat, userId, newUser })
            return {
                ...state,
                currentBoxChat: newUsersActionGet
            }
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

            if (currentLength >= 1) {
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
