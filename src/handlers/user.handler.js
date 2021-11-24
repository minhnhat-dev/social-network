// import queryHelpers from "../helpers/query.helper"
// import userActions from "../actions/users.action"
// import userApi from "../api/userApi"

// const {
//     loginSuccess,
//     loginFailure,
//     logoutUser,
//     registerStart,
//     registerSuccess,
//     registerFailure,
//     getFriends,
//     setFriends
// } = userActions

// export const login = async (user, dispatch) => {
//     try {
//         const actionLogin = userActions.login()
//         dispatch(actionLogin)
//         const userRes = await userApi.login(user)

//         if (userRes.error) {
//             const actionLoginFailure = loginFailure(userRes.error)
//             dispatch(actionLoginFailure)
//             return null
//         }

//         const actionLoginSuccess = loginSuccess(userRes)
//         dispatch(actionLoginSuccess)

//         localStorage.setItem("user", JSON.stringify(userRes))
//         localStorage.setItem("token", userRes.token)
//         return userRes
//     } catch (e) {
//         console.error(e.message)
//         // throw new Error(e.message);
//         return void 0
//     } finally {
//     }
// }

// export const register = async (user, dispatch) => {
//     const actionRegisterStart = registerStart()
//     dispatch(actionRegisterStart)
//     await queryHelpers.timeout(300)
//     const userRes = await userApi.register(user)

//     if (userRes.error) {
//         const actionRegisterFailure = registerFailure(userRes.error)
//         dispatch(actionRegisterFailure)
//         return null
//     }

//     const actionRegisterSuccess = registerSuccess(userRes)
//     dispatch(actionRegisterSuccess)

//     localStorage.setItem("user", JSON.stringify(userRes))
//     localStorage.setItem("token", userRes.token)
//     return userRes
// }

// export const logout = async dispatch => {
//     const actionLogout = logoutUser()
//     dispatch(actionLogout)
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     return true
// }

// export const getUser = async ({ userId }) => {
//     const user = await userApi.getUser(userId)
//     return user
// }

// export const getFollowings = async (params, dispatch) => {
//     const actionGetFriends = getFriends()
//     dispatch(actionGetFriends)
//     const response = await userApi.getFollowings(params)
//     const { items: friendsRes = [] } = response
//     const actionSetFriends = setFriends(friendsRes)
//     dispatch(actionSetFriends)
//     return friendsRes
// }

// export const getFriendsByUserId = async params => {
//     const response = await userApi.getFollowings(params)
//     const { items: friendsRes = [] } = response
//     return friendsRes
// }

// export const follow = async input => {
//     const response = await userApi.follow(input)
//     return response
// }

// export const unFollow = async input => {
//     const response = await userApi.unFollow(input)
//     return response
// }

// export const getUsers = async params => {
//     const response = await userApi.getUsers(params)
//     return response
// }
