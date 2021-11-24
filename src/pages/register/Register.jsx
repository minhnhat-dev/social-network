import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { login, register } from "actions/auth.action"
import Card from "shared/Card/Card"
import TextInput from "shared/TextInput/TextInput"
import Button from "shared/Button/Button"
import toast from "helpers/toast.helper"
import { validateInputRegister } from "validators/auth.validator"

import "./Register.scss"
const styleContent = {
    height: "450px",
    width: "370px"
}

const styleInput = {
    width: "270px",
    height: "42px"
}

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
const borderStyleError = "2px solid #df0e15"
const defaultBorder = "1px solid #323232"

function Register() {
    // const { id: userId } = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const initialData = {
        email: "",
        password: "",
        username: "",
        passwordConfirm: ""
    }
    const [stateData, setStateData] = useState(initialData)
    const [error, setError] = useState({})
    const { email, username, password, passwordConfirm } = stateData
    const [hidePassword, setHidePassword] = useState(false)
    const history = useHistory()
    const { auth } = useSelector(state => state.auth)

    const handleOnClick = async () => {
        const { errLength, errMsg } = validateInputRegister(stateData)
        setError(errMsg)
        if (errLength > 0) return
        await dispatch(register(stateData))
    }

    const handleOnBlur = e => {
        const { value, name } = e.target
        if (!value && name !== "passwordConfirm") {
            e.target.focus()
            e.target.style.border = borderStyleError
            return
        }
        e.target.style.border = defaultBorder
    }

    const handleOnChange = e => {
        const { name, value } = e.target
        const newState = { ...stateData, [name]: value }
        setStateData(newState)
    }

    return (
        <div className="register">
            <Card show={true} styleContent={styleContent}>
                <div className="card-register-header">
                    <img className="icon-email" src={`${PUBLIC_FOLDER}icons/email.png`} alt="" />
                    <span className="icon-text">Register</span>
                </div>
                <div className="card-register-body">
                    <div className="input-item">
                        <TextInput
                            name="email"
                            value={email}
                            placeholder="Email"
                            style={styleInput}
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            className={error.email && "error-input"}
                        ></TextInput>
                        <small className={error.email && "error-text"}>{error.email}</small>
                    </div>
                    <div className="input-item">
                        <TextInput
                            name="username"
                            value={username.trim().replace(/  +/g, "")}
                            placeholder="Username"
                            style={styleInput}
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            className={error.username && "error-input"}
                        ></TextInput>
                        <small className={error.username && "error-text"}>{error.username}</small>
                    </div>

                    <div className="input-item group-password">
                        <TextInput
                            value={password}
                            name="password"
                            type={!hidePassword ? "password" : "text"}
                            placeholder="Password"
                            style={styleInput}
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            className={error.password && "error-input"}
                        ></TextInput>
                        <small className={error.password && "error-text"}>{error.password}</small>
                        <small onClick={() => setHidePassword(!hidePassword)} className="hide-password">
                            {hidePassword ? "Hide" : "Show"}
                        </small>
                    </div>
                    <div className="input-item group-conf-password">
                        <TextInput
                            value={passwordConfirm}
                            name="passwordConfirm"
                            type={!hidePassword ? "password" : "text"}
                            placeholder="Confirm Password"
                            style={styleInput}
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            className={error.passwordConfirm && "error-input"}
                        ></TextInput>
                        <small className={error.passwordConfirm && "error-text"}>{error.passwordConfirm}</small>
                        <small onClick={() => setHidePassword(!hidePassword)} className="hide-password">
                            {hidePassword ? "Hide" : "Show"}
                        </small>
                    </div>

                    <span>
                        You have a account?{" "}
                        <Link className="text-link" to="/login">
                            <strong>Login</strong>
                        </Link>
                    </span>
                </div>
                <div className="card-register-footer">
                    <Button handleOnClick={handleOnClick} title="Register"></Button>
                </div>
            </Card>
        </div>
    )
}

export default Register
