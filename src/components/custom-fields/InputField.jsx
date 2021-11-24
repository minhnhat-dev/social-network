import React from "react"
import { ErrorMessage } from "formik"
import { TextField } from "@material-ui/core"
import { FormFeedback } from "reactstrap"
// field, // { name, value, onChange, onBlur }
// form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
// ...props

function InputField(props) {
    const { label, field, form, type, placeholder, disabled, className, classError } = props
    const { name } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]
    return (
        <>
            {label || ""}
            <input
                {...field}
                placeholder={placeholder}
                type={type}
                id={name}
                disabled={disabled}
                className={className}
            />
            {showError ? <span className={classError}>* {errors[name]}</span> : ""}
        </>
    )
}

export default InputField
