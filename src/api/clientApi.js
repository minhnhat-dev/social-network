import axios from "axios";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import toast from "./toast";
import userConstants from "../constants/users.constant";
import globalConstants from "../constants/global.constant";

const { pathPublic } = globalConstants;
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((request) => {
    // add auth header with jwt if account is logged in and request is to the api url
    const user = localStorage.getItem("user") || null;
    const token = user ? JSON.parse(user).token : "";
    const url = request.url.split("/")[1];
    const isPrivate = !pathPublic.includes(url);

    if (isPrivate) {
        // request.headers.common.Authorization = `Bearer ${token}`;
        request.headers.common.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhYzI3ZWFmMWZiYzIwMDA2NzJmOGUyIiwiZnVsbF9uYW1lIjoiTmd1eeG7hW4gTWluaCBOaOG6rXQiLCJlbWFpbCI6Im5oYXQubmd1eWVuQGtpbmdmb29kLmNvIiwiZW1wbG95ZWVfY29kZSI6IktGMDAwNDk5IiwibGFzdF9sb2dpbiI6MTYyNDYwMTk5ODY5MCwiZXh0ZW5kX3JvbGVzIjp7fX0sImlhdCI6MTYyNDYwMTk5OCwiZXhwIjoxNjI1MjA2Nzk4fQ.cqMv0kKezMruHV_Xe6tUylZRX-STQz7ssI73OKv_11k";
    }

    return request;
});
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // check for errorHandle config
    if (error.config.hasOwnProperty("errorHandle") && error.config.errorHandle === false) {
        return Promise.reject(error);
    }

    // if has response show the error
    if (error.response) {
        const { error: errorCode } = error.response.data;
        console.log("errorCode", errorCode);
        toast.error(userConstants.ERROR_CODES_STRING[errorCode] || "NOT_FOUND_ERROR_CODES");
        const { status, data } = error.response;
        console.log("status", status);
        console.log("errorCode", errorCode);
        if (status === 401 && errorCode === "error_jwt_expired") {
            localStorage.removeItem("user");
        }
        return { status, ...data };
    }

    return false;
});

export default axiosClient;
