export const validatePermissionCamera = async () => {
    const result = await navigator.permissions.query({ name: "camera" })
    if (result.state === "denied") {
        return "You setting denied to share camera, please set permission for sharing your camera."
    }
}
