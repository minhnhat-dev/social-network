import clientApi from "./clientApi"

export const updateProfile = async (userId, body) => {
    const url = `/users/${userId}`
    return clientApi.put(url, body)
}

export const follow = async body => {
    const url = "/users/follow"
    const user = await clientApi.put(url, body)
    return user
}

export const unfollow = async body => {
    const url = "/users/unfollow"
    const user = await clientApi.put(url, body)
    return user
}
