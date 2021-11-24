import React, { useEffect } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { Formik, Form, FastField } from "formik"
import { CircularProgress } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import InputField from "../../components/custom-fields/InputField"
import userHandlers from "../../handlers/user.handler"
import userSchemas from "../../schemas/users.schema"
import "./Login.scss"

function Login() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const dispatch = useDispatch()
    const history = useHistory()
    /* reset login status */
    useEffect(() => {
        const logout = async () => {
            await userHandlers.logout(dispatch)
        }
        logout()
    }, [])

    /* can handle with context */
    // const { dispatch, user, isFetching, error } = useContext(AuthContext);
    const isFetching = useSelector(state => state.user.isFetching, shallowEqual) || false
    const { loginSchema } = userSchemas

    const initValues = {
        email: "",
        password: ""
    }

    const handleSubmitLogin = async (values, actions) => {
        const userLogin = await userHandlers.login(values, dispatch)
        if (userLogin) {
            return history.push("/")
        }
        return true
    }

    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__wrapper__left">
                    <h2 className="login__wrapper__left__title">My Social Network</h2>
                    <span className="login__wrapper__left__description">Connect many people in the worlds</span>
                </div>
                <div className="login__wrapper__right">
                    <Formik initialValues={initValues} validationSchema={loginSchema} onSubmit={handleSubmitLogin}>
                        {formikProps => (
                            <Form className="login__wrapper__right__box">
                                <div className="login__wrapper__right__box__group">
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        type="email"
                                        placeholder="Username"
                                        className="login__wrapper__right__box__group__input"
                                        classError="error-dangerous"
                                    />
                                </div>
                                <div className="login__wrapper__right__box__group">
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        type="password"
                                        placeholder="Password"
                                        className="login__wrapper__right__box__group__input"
                                        classError="error-dangerous"
                                    />
                                </div>
                                <button
                                    disabled={isFetching}
                                    type="submit"
                                    className="login__wrapper__right__box__btn-login"
                                >
                                    {isFetching ? <CircularProgress color="inherit" size="30px" /> : "Log In"}
                                </button>
                                <span className="login__wrapper__right__box__text-forgot">Forgot Password?</span>
                                <Link to="/register" className="login__wrapper__right__box__btn-create">
                                    <button type="button" className="login__wrapper__right__box__btn-create">
                                        {isFetching ? (
                                            <CircularProgress color="inherit" size="30px" />
                                        ) : (
                                            "Create A New Account"
                                        )}
                                    </button>
                                </Link>
                            </Form>
                        )}
                    </Formik>
                    <img src={`${PUBLIC_FOLDER}signature.jpg`} alt="" className="login__wrapper__right__sign" />
                </div>
            </div>
        </div>
    )
}

export default Login
