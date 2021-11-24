import axios from "axios"
import queryString from "query-string"
import toast from "helpers/toast.helper"

const { REACT_APP_NODE_ENV, REACT_APP_API_URL, REACT_APP_API_URL_LOCAL } = process.env
const baseURL = REACT_APP_NODE_ENV === "localhost" ? REACT_APP_API_URL_LOCAL : REACT_APP_API_URL
const axiosClient = axios.create({
    baseURL,
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(request => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request
})

axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data
        }
        return response
    },
    error => {
        if (error.response) {
            const { error: errorCodes } = error.response.data
            errorCodes.forEach(code => {
                setTimeout(() => {
                    toast.error(code || "NOT_FOUND_ERROR_CODES")
                }, 200)
            })
        }
        throw error
    }
)

export default axiosClient
