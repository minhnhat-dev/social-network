import clientApi from "./clientApi"

async function getUser(userId) {
    const url = `/users/${userId}`
    return clientApi.get(url, {})
}

async function getUsers(params) {
    const url = "/users"
    return clientApi.get(url, { params })
}

async function login(user) {
    const url = "/users/auth/login"
    const userRes = await clientApi.post(url, user)
    const { user: userLogin = null, token = "" } = userRes
    if (!userLogin) return { error: userRes.error }
    userLogin.token = token
    return userLogin
}

async function register(user) {
    const url = "/users/auth/register"
    const userRes = await clientApi.post(url, user)
    const { user: userRegister = null, token = "" } = userRes
    if (!userRegister) return { error: userRes.error }
    userRegister.token = token
    return userRegister
}

async function getFollowings(params) {
    const url = "/users/followings"
    const followings = await clientApi.get(url, { params })
    return followings
}

async function follow(input) {
    const url = "/users/follow"
    const user = await clientApi.put(url, input)
    return user
}

async function unFollow(input) {
    const url = "/users/unfollow"
    const user = await clientApi.put(url, input)
    return user
}

async function logout(params) {
    return true
}

const usersApi = {
    getUser,
    getUsers,
    login,
    register,
    logout,
    getFollowings,
    follow,
    unFollow
}

export default usersApi
