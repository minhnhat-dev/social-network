import clientApi from "./clientApi"

export const loginApi = async body => {
    const url = "/users/auth/login"
    const response = await clientApi.post(url, body)
    return response
}

export const registerApi = async body => {
    const url = "/users/auth/register"
    const response = await clientApi.post(url, body)
    return response
}

export const refreshTokenApi = async body => {
    const url = "/users/auth/refresh-token"
    const response = await clientApi.post(url, body)
    return response
}

export const logoutApi = async body => {
    const url = "/users/auth/logout"
    const response = await clientApi.post(url, body)
    return response
}

export const getUserApi = async id => {
    const url = `/users/${id}`
    const response = await clientApi.get(url)
    return response
}
