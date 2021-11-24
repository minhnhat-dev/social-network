import React from "react"
import { useSelector } from "react-redux"
import "./Loader.scss"

function Loader({ show, styleLoader }) {
    const { loading } = useSelector(state => state.notifications)
    return (
        <div style={styleLoader} className={`loader ${(loading || show) && "show"}`}>
            <div className="loading-bg">
                <img
                    className="loading-icon"
                    src="https://res.cloudinary.com/minhnhat-dev/image/upload/v1630491351/loading/Rolling-1s-200px.gif"
                    alt="loading"
                />
            </div>

            {/* <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div> */}
        </div>
    )
}

export default Loader
