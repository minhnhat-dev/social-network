import clientApi from "./clientApi"

export const createPostNotifyApi = async body => {
    const url = `/notifies/posts`
    return clientApi.post(url, body)
}

export const getPostNotifyApi = async (params = {}) => {
    const url = `/notifies/posts`
    return clientApi.get(url, { params })
}

export const removePostNotifiesApi = async body => {
    const url = "/users/unfollow"
    const user = await clientApi.put(url, body)
    return user
}

export const updatePostNotifiesApi = async (notifyId, body) => {
    const url = `/notifies/posts/${notifyId}`
    const user = await clientApi.put(url, body)
    return user
}

export const clearPostNotifiesApi = async query => {
    const url = `/notifies/posts/clear-notifies`
    const user = await clientApi.get(url, { params: query })
    return user
}
