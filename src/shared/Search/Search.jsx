import React from "react"
import "./Search.scss"

function Search({ placeholder = "Search" }) {
    return (
        <button className="input-search">
            <i className="input-search-icon fs-17 fas fa-search"></i>
            <input type="text" placeholder={placeholder} />
        </button>
    )
}

export default Search
