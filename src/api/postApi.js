import clientApi from "./clientApi";

const postsApi = {
    getPosts: async (params) => {
        const url = "/posts";
        return clientApi.get(url, { params });
    },
    getTimelinePosts: async (params) => {
        const url = "/posts/timeline";
        return clientApi.get(url, { params });
    },
    checkIsLike: async ({ userId, postId }) => {
        const url = `/posts/${postId}/is-like`;
        return clientApi.get(url, { params: { userId } });
    },
    likePost: async ({ userId, postId }) => {
        const url = `/posts/${postId}/like`;
        return clientApi.put(url, { userId });
    },
    unLikePost: async ({ userId, postId }) => {
        const url = `/posts/${postId}/unlike`;
        return clientApi.put(url, { userId });
    },
    uploadImage: async (formData) => {
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        const url = "/posts/upload";
        return clientApi.post(url, formData, { headers });
    },
    deleteUploadImage: async (file) => {
        const url = "/posts/upload";
        const payload = { data: { file } };
        return clientApi.delete(url, payload);
    },
    createPost: async (post) => {
        const url = "/posts";
        return clientApi.post(url, post);
    }
};

export default postsApi;
