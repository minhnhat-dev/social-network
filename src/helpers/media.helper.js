export const imageShow = (src, load = false) => {
    return <img src={src} alt="images" className={`img-thumbnail ${load && "load"}`} />
}

export const videoShow = (src, load) => {
    return <video controls src={src} alt="images" className="img-thumbnail" />
}
