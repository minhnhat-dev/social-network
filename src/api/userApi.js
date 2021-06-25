import clientApi from "./clientApi";
import { LoginStart, LoginSuccess, LoginFailure } from "../context/AuthAction";
import queryHelpers from "../helpers/query.helper";
import userActions from "../actions/users.action";

const { loginStart, loginSuccess, loginFailure, logoutUser } = userActions;

function getUser(userId) {
    const url = `/users/${userId}`;
    return clientApi.get(url, {});
}

async function login(user) {
    const url = "/users/auth/login";
    const userRes = await clientApi.post(url, user);
    const { user: userLogin = null, token = "" } = userRes;
    if (!userLogin) return { error: userRes.error };
    userLogin.token = token;
    return userLogin;
}

async function register(user) {
    const url = "/users/auth/register";
    const userRes = await clientApi.post(url, {});
    const { user: userRegister = null, token = "" } = userRes;
    if (!userRegister) return { error: userRes.error };
    userRegister.token = token;
    return userRegister;
}

async function getFollowings(params) {
    const url = "/users/followings";
    const followings = await clientApi.get(url, { params });
    return followings;
}

async function logout(params) {
    return true;
}

const usersApi = {
    getUser,
    login,
    register,
    logout,
    getFollowings
};

export default usersApi;
