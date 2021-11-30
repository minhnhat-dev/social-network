import queryHelpers from "../helpers/query.helper"
import conversationsApi from "../api/messenger.api"

async function getConversations(params) {
    const conversations = await conversationsApi.getConversations(params)
    return conversations
}

async function getConversation(id) {
    const conversation = await conversationsApi.getConversation(id)
    return conversation
}

async function getMessages(params) {
    const messages = await conversationsApi.getMessages(params)
    return messages
}

async function createMessages(body) {
    const message = await conversationsApi.createMessages(body)
    return message
}

async function checkExistsConversation(params) {
    const result = await conversationsApi.checkExistConversation(params)
    return result
}

async function createConversation(body) {
    const conversation = await conversationsApi.createConversation(body)
    return conversation
}

const conversationHandlers = {
    getConversations,
    getConversation,
    getMessages,
    createMessages,
    checkExistsConversation,
    createConversation
}

export default conversationHandlers
