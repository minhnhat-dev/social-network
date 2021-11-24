import clientApi from "./clientApi"

const postsApi = {
    getPosts: async params => {
        const url = "/posts"
        return clientApi.get(url, { params })
    },
    getPostImages: async params => {
        const url = "/posts/images"
        return clientApi.get(url, { params })
    },
    getPost: async postId => {
        const url = `/posts/${postId}`
        return clientApi.get(url)
    },
    getLikesPost: async ({ postId, params }) => {
        const url = `/posts/${postId}/likes`
        return clientApi.get(url, { params })
    },
    getTimelinePosts: async params => {
        const url = "/posts/timeline"
        return clientApi.get(url, { params })
    },
    checkIsLike: async ({ userId, postId }) => {
        const url = `/posts/${postId}/is-like`
        return clientApi.get(url, { params: { userId } })
    },
    checkIsLikeComment: async params => {
        const { postId, commentId, userId } = params
        const url = `/posts/${postId}/comments/${commentId}/is-like`
        return clientApi.get(url, { params: { userId } })
    },
    likePost: async ({ userId, postId }) => {
        const url = `/posts/${postId}/like`
        return clientApi.put(url, { userId })
    },
    unLikePost: async ({ userId, postId }) => {
        const url = `/posts/${postId}/unlike`
        return clientApi.put(url, { userId })
    },
    uploadImage: async formData => {
        const headers = {
            "Content-Type": "multipart/form-data"
        }
        const url = "/posts/upload"
        return clientApi.post(url, formData, { headers })
    },
    deleteUploadImage: async file => {
        const url = "/posts/upload"
        const payload = { data: { file } }
        return clientApi.delete(url, payload)
    },
    createPost: async post => {
        const url = "/posts"
        return clientApi.post(url, post)
    },
    updatePost: async (postId, body) => {
        const url = `/posts/${postId}`
        return clientApi.put(url, body)
    },
    deletePost: async postId => {
        const url = `/posts/${postId}`
        return clientApi.delete(url)
    },
    createComment: async ({ postId, body }) => {
        const url = `/posts/${postId}/comments`
        return clientApi.post(url, body)
    },
    getComments: async ({ postId, params }) => {
        const url = `/posts/${postId}/comments`
        return clientApi.get(url, { params })
    },
    likeComment: async body => {
        const { postId, commentId } = body
        const url = `/posts/${postId}/comments/${commentId}/like`
        return clientApi.post(url, body)
    },
    unLikeComment: async body => {
        const { postId, commentId } = body
        const url = `/posts/${postId}/comments/${commentId}/unlike`
        return clientApi.post(url, body)
    },
    updateComment: async body => {
        const { postId, commentId } = body
        const url = `/posts/${postId}/comments/${commentId}/`
        return clientApi.put(url, body)
    },
    deleteComment: async body => {
        const { postId, commentId } = body
        const url = `/posts/${postId}/comments/${commentId}/`
        return clientApi.delete(url, { data: body })
    }
}

export default postsApi
