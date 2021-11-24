import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import React from "react"

const ProtectedRoute = props => {
    const { auth } = useSelector(state => state.auth)
    return !auth ? <Redirect to="/login" /> : <Route {...props} />
}

export default ProtectedRoute
