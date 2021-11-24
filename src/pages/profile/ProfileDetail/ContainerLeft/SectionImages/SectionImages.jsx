import React, { useEffect, useState } from "react"
import "./SectionImages.scss"
import ButtonHeader from "shared/ButtonHeader/ButtonHeader"
import { useSelector } from "react-redux"
import postApi from "api/postApi"
function SectionImages() {
    const { profile } = useSelector(state => state.profile)
    const [images, setImages] = useState([])

    useEffect(() => {
        const fetchPostImages = async () => {
            if (profile && profile.id) {
                const params = {
                    skip: 0,
                    limit: 9,
                    userId: profile.id
                }
                const { items = [] } = await postApi.getPostImages(params)
                setImages(items)
            }
        }
        fetchPostImages()
    }, [profile])

    return (
        <div className="section-images">
            <div className="section-images-header">
                <h2>Images</h2>
                <ButtonHeader className="images-header-icon" title={"See all images"} />
            </div>
            <div className="section-images-list">
                {images.map((image, index) => {
                    return (
                        <div className="section-images-item" key={index}>
                            <img src={image?.url} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SectionImages
