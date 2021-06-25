import React, { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import InputField from "../../components/custom-fields/InputField";
import userSchemas from "../../schemas/users.schema";
import userHandlers from "../../handlers/user.handler";
import "./Register.scss";

function Register() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const history = useHistory();
    const { registerSchema } = userSchemas;

    /* reset login status */
    useEffect(() => {
        const logout = async () => {
            await userHandlers.logout(dispatch);
        };
        logout();
    }, []);

    const initValues = {
        name: "",
        email: "",
        password: ""
        // passwordConfirm: ""
    };

    const isFetching = useSelector((state) => state.user.isFetching, shallowEqual) || false;
    const handleSubmitRegister = async (values, actions) => {
        const userRegister = await userHandlers.register(values, dispatch);

        if (userRegister) {
            return history.push("/");
        }

        return true;
    };

    return (
        <div className="register">
            <div className="register__wrapper">
                <div className="register__wrapper__left">
                    <h2 className="register__wrapper__left__title">My Social Network</h2>
                    <span className="register__wrapper__left__description">Connect many people in the worlds</span>
                </div>
                <div className="register__wrapper__right">
                    <div className="register__wrapper__right__box">
                        <Formik
                            initialValues={initValues}
                            validationSchema={registerSchema}
                            onSubmit={handleSubmitRegister}
                        >
                            {(formikProps) => (
                                <Form className="register__wrapper__right__box">
                                    <div className="register__wrapper__right__box__group">
                                        <FastField
                                            name="name"
                                            component={InputField}
                                            type="text"
                                            placeholder="Username"
                                            className="register__wrapper__right__box__group__input"
                                            classError="error-dangerous"
                                        />
                                    </div>
                                    <div className="register__wrapper__right__box__group">
                                        <FastField
                                            name="email"
                                            component={InputField}
                                            type="email"
                                            placeholder="Email"
                                            className="register__wrapper__right__box__group__input"
                                            classError="error-dangerous"
                                        />
                                    </div>
                                    <div className="register__wrapper__right__box__group">
                                        <FastField
                                            name="password"
                                            component={InputField}
                                            type="password"
                                            placeholder="Password"
                                            className="register__wrapper__right__box__group__input"
                                            classError="error-dangerous"
                                        />
                                    </div>
                                    <div className="register__wrapper__right__box__group">
                                        <FastField
                                            name="passwordConfirm"
                                            component={InputField}
                                            type="password"
                                            placeholder="Password Confirmed"
                                            className="register__wrapper__right__box__group__input"
                                            classError="error-dangerous"
                                        />
                                    </div>
                                    <button disabled={isFetching} type="submit" className="register__wrapper__right__box__btn-register">
                                        {
                                            isFetching
                                                ? <CircularProgress color="inherit" size="30px" />
                                                : "Sign Up"
                                        }
                                    </button>
                                    <span className="login__wrapper__right__box__text-forgot">Forgot Password?</span>
                                </Form>
                            )}

                        </Formik>
                        <Link to="/login" className="register__wrapper__right__box__btn-create">
                            <button type="button" className="register__wrapper__right__box__btn-create">
                                {
                                    isFetching
                                        ? <CircularProgress color="inherit" size="30px" />
                                        : "Log into Account"
                                }
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
