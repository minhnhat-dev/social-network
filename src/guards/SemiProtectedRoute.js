import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import React from "react"
/* Những Component trong Route này bán bảo vệ, kiểu như bro muốn vào route này phải ít nhất là đã đc đăng kí tài khoản nhưng user chưa đc active */
/* children là Component muốn đc Route này bảo vệ : Activate */
const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!isAuth) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }

                if (isAuth && !user.activated) {
                    return children
                }

                return (
                    <Redirect
                        to={{
                            pathname: "/main",
                            state: { from: location }
                        }}
                    />
                )
            }}
        ></Route>
    )
}

export default SemiProtectedRoute
