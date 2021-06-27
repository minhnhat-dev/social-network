import queryHelpers from "../helpers/query.helper";
import userActions from "../actions/users.action";
import userApi from "../api/userApi";

const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutUser,
    registerStart,
    registerSuccess,
    registerFailure
} = userActions;

async function login(user, dispatch) {
    const actionLoginStart = loginStart();
    dispatch(actionLoginStart);
    await queryHelpers.timeout(300);
    const userRes = await userApi.login(user);

    if (userRes.error) {
        const actionLoginFailure = loginFailure(userRes.error);
        dispatch(actionLoginFailure);
        return null;
    }

    const actionLoginSuccess = loginSuccess(userRes);
    dispatch(actionLoginSuccess);

    localStorage.setItem("user", JSON.stringify(userRes));
    localStorage.setItem("token", userRes.token);
    return userRes;
}

async function register(user, dispatch) {
    const actionRegisterStart = registerStart();
    dispatch(actionRegisterStart);
    await queryHelpers.timeout(300);
    const userRes = await userApi.register(user);

    if (userRes.error) {
        const actionRegisterFailure = registerFailure(userRes.error);
        dispatch(actionRegisterFailure);
        return null;
    }

    const actionRegisterSuccess = registerSuccess(userRes);
    dispatch(actionRegisterSuccess);

    localStorage.setItem("user", JSON.stringify(userRes));
    localStorage.setItem("token", userRes.token);
    return userRes;
}

async function logout(dispatch) {
    const actionLogout = logoutUser();
    dispatch(actionLogout);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return true;
}

async function getUser({ userId }) {
    const user = await userApi.getUser(userId);
    return user;
}

async function getFollowings(params, dispatch) {
    const response = await userApi.getFollowings(params);
    const { items: friendsRes = [] } = response;
    return friendsRes;
}

const userHandlers = {
    login,
    register,
    logout,
    getUser,
    getFollowings
};

export default userHandlers;
