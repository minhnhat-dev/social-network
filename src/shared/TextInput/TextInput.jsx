import React, { forwardRef } from "react"
import "./TextInput.scss"

function TextInput({ style, className, ...props }, ref) {
    return (
        <div>
            <input
                ref={ref}
                style={style}
                autoComplete="new-password"
                className={`${className} text-input`}
                type="text"
                {...props}
            />
        </div>
    )
}

export default forwardRef(TextInput)
