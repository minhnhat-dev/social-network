import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "redux/auth/authSlice"
import { startShow, successShow } from "redux/loading/loadingSlice"
import usersApi from "api/users.api"

function useRefreshToken() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if (refreshToken) {
                    startShow()
                    const body = { refreshToken }
                    const result = await usersApi.refreshToken(body)

                    if (result && result.accessToken) {
                        dispatch(setAuth(result))
                    }
                }
                successShow()
                setLoading(false)
            } catch (err) {
                console.log(err)
                successShow()
                setLoading(false)
            }
        }
        refreshToken()
    }, [dispatch])

    return { loading }
}

export default useRefreshToken
