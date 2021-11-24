import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import React from "react"
/* Những Component nằm trong Route này ít được bảo vệ nếu có isAuth mới vào đc rooms */
/* children là Component muốn đc Route này bảo vệ : Home , Register, Authenticate */
const GuestRoute = props => {
    const { auth } = useSelector(state => state.auth)
    return auth ? <Redirect to="/" /> : <Route {...props} />
}

export default GuestRoute
