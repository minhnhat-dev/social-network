import clientApi from "./clientApi"

const messengerApi = {
    getConversations: async params => {
        const url = "/conversations"
        return clientApi.get(url, { params })
    },
    getConversation: async id => {
        const url = `/conversations/${id}`
        return clientApi.get(url, {})
    },
    getMessages: async params => {
        const url = "/messages"
        return clientApi.get(url, { params })
    },
    createMessages: async message => {
        const url = "/messages"
        return clientApi.post(url, message)
    },
    createConversation: async body => {
        const url = "/conversations"
        return clientApi.post(url, body)
    },
    checkExistConversation: async params => {
        const url = "/conversations/check-exists"
        return clientApi.get(url, { params })
    }
}

export default messengerApi
