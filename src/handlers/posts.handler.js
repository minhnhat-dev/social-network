import queryHelpers from "../helpers/query.helper"
import postApi from "../api/postApi"

async function likePost(params) {
    const newPost = await postApi.likePost(params)
    return newPost
}

async function unLikePost(params) {
    const newPost = await postApi.unLikePost(params)
    return newPost
}

async function checkIsLike(params) {
    const response = await postApi.checkIsLike(params)
    const { isLike } = response
    return isLike
}

async function uploadImage(formData) {
    const response = await postApi.uploadImage(formData)
    const { file } = response
    return file
}

async function deleteFileUploadImage(file) {
    return postApi.deleteUploadImage(file)
}

async function createPost(post) {
    const postRes = await postApi.createPost(post)
    return postRes
}

const userHandlers = {
    likePost,
    unLikePost,
    checkIsLike,
    uploadImage,
    deleteFileUploadImage,
    createPost
}

export default userHandlers
