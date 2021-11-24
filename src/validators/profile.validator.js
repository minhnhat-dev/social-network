export const validateInputProfile = data => {
    const { fullName, phone, from, address, description } = data
    const err = {}

    if (fullName && fullName.length > 25) {
        err.fullName = "Full name is up to 25 characters long."
    }

    if (from && from.length > 25) {
        err.from = "From is up to 25 characters long."
    }

    if (address && address.length > 100) {
        err.address = "Address is up to 100 characters long."
    }

    if (description && description.length > 100) {
        err.description = "Description is up to 100 characters long."
    }

    if (phone) {
        const numbers = /^[0-9]+$/
        const isPhoneValid = phone.match(numbers)
        if (!isPhoneValid) err.phone = "Phone number is invalid."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

export const validateFileCoverUpload = file => {
    const err = {}
    if (!file) {
        err.coverPicture = "File does not exist."
        return {
            errMsg: err,
            errLength: Object.keys(err).length
        }
    }

    if (file.size > 2 * 1024 * 1024) {
        // 2MB
        err.coverPicture = "The largest image size is 2MB."
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        err.coverPicture = "Image format is incorrect (png/jpeg)."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

export const validateFileProfileUpload = file => {
    const err = {}
    if (!file) {
        err.profilePicture = "File does not exist."
        return {
            errMsg: err,
            errLength: Object.keys(err).length
        }
    }

    if (file.size > 2 * 1024 * 1024) {
        // 2MB
        err.profilePicture = "The largest image size is 2MB."
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        err.profilePicture = "Image format is incorrect (png/jpeg)."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}
