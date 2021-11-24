import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { login } from "actions/auth.action"
import Card from "shared/Card/Card"
import TextInput from "shared/TextInput/TextInput"
import Button from "shared/Button/Button"
import toast from "helpers/toast.helper"

import "./Login.scss"
const styleContent = {
    height: "340px",
    width: "370px"
}

const styleInput = {
    width: "270px",
    marginBottom: "7px",
    height: "42px"
}

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
const borderStyleError = "2px solid #fa383e"
const defaultBorder = "1px solid #323232"

function Login() {
    const refEmail = useRef()
    const refPassword = useRef()
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(false)
    const handleOnClick = async () => {
        const email = refEmail.current.value
        const password = refPassword.current.value

        if (!email) return validateInputRef(refEmail)
        if (!password) return validateInputRef(refPassword)

        const body = {
            email,
            password
        }

        await dispatch(login(body))
    }

    const validateInputRef = refElement => {
        refElement.current.style.border = borderStyleError
        return refElement.current.focus()
    }

    const handleOnBlur = refElement => {
        refElement.current.style.border = defaultBorder
    }

    return (
        <div className="login">
            <Card show={true} styleContent={styleContent}>
                <div className="card-login-header">
                    <img className="icon-email" src={`${PUBLIC_FOLDER}icons/email.png`} alt="" />
                    <span className="icon-text">Login</span>
                </div>
                <div className="card-login-body">
                    <TextInput
                        ref={refEmail}
                        placeholder="Email"
                        style={styleInput}
                        onBlur={() => handleOnBlur(refEmail)}
                    ></TextInput>
                    <div className="group-password">
                        <TextInput
                            type={!hidePassword ? "password" : "text"}
                            ref={refPassword}
                            placeholder="Password"
                            style={styleInput}
                            onBlur={() => handleOnBlur(refPassword)}
                        ></TextInput>
                        <small onClick={() => setHidePassword(!hidePassword)} className="hide-password">
                            {hidePassword ? "Hide" : "Show"}
                        </small>
                    </div>
                    <Link className="text-link" to="/login">
                        <span className="forgot-password">Forgot password?</span>
                    </Link>
                    <span>
                        You don't have account?{" "}
                        <Link className="text-link" to="/register">
                            <strong>Register</strong>
                        </Link>
                    </span>
                </div>
                <div className="card-login-footer">
                    <Button handleOnClick={handleOnClick} title="Login"></Button>
                </div>
            </Card>
        </div>
    )
}

export default Login
