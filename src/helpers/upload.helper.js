import { timeout } from "helpers/query.helper"
export const URL_CLOUD_UPLOAD = "https://api.cloudinary.com/v1_1/minhnhat-dev/image/upload"
export const PRESET_COVER_PICTURE = "facebook-clone-covers"
export const PRESET_PROFILE_PICTURE = "facebook-clone-profiles"
export const PRESET_PROFILE_IMAGES = "facebook-clone-images"

export const imageUpload = async ({ images, preset = PRESET_PROFILE_IMAGES }) => {
    const imgArr = []
    console.log("images", images)

    for (const item of images) {
        const formData = new FormData()
        if (item.camera) {
            formData.append("file", item.camera)
        } else {
            formData.append("file", item)
        }
        formData.append("upload_preset", preset)
        formData.append("cloud_name", "minhnhat-dev")

        const res = await fetch(URL_CLOUD_UPLOAD, {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        console.log("data", data)
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr
}
