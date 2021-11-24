import React, { useState, useEffect } from "react"
import "./CardBody.scss"
import _ from "lodash"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import { CONTENT_LIMIT } from "constants/posts.constant"
function CardBody({ post = {} }) {
    const [images, setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [imagesChunk, setImagesChunk] = useState([])

    const [photoIndex, setPhotoIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [readMore, setReadMore] = useState(false)

    useEffect(() => {
        const urls = post.images ? post.images.map(item => item.url) : []
        setImages(post.images)
        setImageUrls(urls)
        const chunkImage = _.chunk(post.images, 5)
        setImagesChunk(chunkImage[0] || [])
    }, [post])

    return (
        <div className="post-card-body">
            {isOpen && (
                <Lightbox
                    mainSrc={imageUrls[photoIndex]}
                    nextSrc={imageUrls[(photoIndex + 1) % imageUrls.length]}
                    prevSrc={imageUrls[(photoIndex + imageUrls.length - 1) % imageUrls.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + imageUrls.length - 1) % imageUrls.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imageUrls.length)}
                />
            )}

            <div className="post-card-body-wrapper">
                <div className="card-body-content">
                    <span>
                        {post.content && post.content.length > CONTENT_LIMIT && !readMore
                            ? post.content && post.content.slice(0, CONTENT_LIMIT) + "...."
                            : post.content && post.content}
                    </span>
                    {post.content && post.content.length > CONTENT_LIMIT && !readMore && (
                        <span onClick={() => setReadMore(!readMore)} className="ml-5 link fw-500 fs-17">
                            Read more
                        </span>
                    )}
                </div>
                <div className="card-body-images">
                    {imagesChunk.map((image, index) => {
                        const isOne = imagesChunk.length === 1
                        const isDefault = index < 2
                        const isMoreIcon = index >= 4 && images.length > 5
                        return (
                            <div
                                key={index}
                                className={`body-image ${isDefault ? "default" : "small"} ${
                                    isMoreIcon && "image-more"
                                } ${isOne && "full"}`}
                                onClick={() => {
                                    setIsOpen(true)
                                    setPhotoIndex(index)
                                }}
                            >
                                <img src={image.url} alt="post" />
                                {isMoreIcon && (
                                    <div className="more-image-icons">
                                        <i className="white fas fa-plus"></i>
                                        <span className="fw-500 fs-30 white">{images.length - imagesChunk.length}</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CardBody
