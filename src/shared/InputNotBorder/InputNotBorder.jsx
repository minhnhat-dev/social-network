import React from "react"
import "./InputNotBorder.scss"

function InputNotBorder({ id, label, error, name, value, onChange, placeholder }) {
    return (
        <div className="input-not-border">
            <label className="fs-18 fw-400 mr-10">{label}</label>
            <div className="input-group" id={id}>
                <input name={name} type="text" placeholder={placeholder} value={value} onChange={onChange} />
                <small className={`ml-2 fs-15 input-not-border-small ${error && "error-text"}`}>{error}</small>
            </div>
        </div>
    )
}

export default InputNotBorder
