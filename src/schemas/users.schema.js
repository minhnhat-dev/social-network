import * as Yup from "yup"

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(6, "Email min 6 characters !")
        .max(50, "Email max 50 characters !")
        .required("Email is required !")
        .email("Email invalid !"),
    password: Yup.string()
        .min(5, "Password min 6 characters !")
        .max(50, "Password max 50 characters !")
        .required("Password is required !")
})

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "Username min 4 characters !")
        .max(50, "Username max 50 characters !")
        .required("Username is required !"),
    email: Yup.string()
        .min(6, "Email min 6 characters !")
        .max(50, "Email max 50 characters !")
        .required("Email is required !")
        .email("Email invalid !"),
    password: Yup.string()
        .min(5, "Password min 6 characters !")
        .max(50, "Password max 50 characters !")
        .required("Password is required !"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match !")
})

const userSchemas = {
    loginSchema,
    registerSchema
}

export default userSchemas
