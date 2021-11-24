export const ERROR_CODES_STRING = {
    error_user_not_found: "User not found !"
}

export const ACTIONS = {
    GET_POSTS_START: "GET_POSTS_START",
    GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
    GET_POSTS_FAILE: "GET_POSTS_FAILE"
}
export const VISIBLE = {
    PUBLID: 1,
    FRIENDS: 2,
    PRIVATE: 3,
    BEST_FRIENDS: 4
}

export const CONTENT_LIMIT = 100

export const VISIBLE_STRING = {
    1: "Public",
    2: "Friends",
    3: "Private",
    4: "Best friends"
}
export const BOX_CREATE_ICONS = [
    {
        className: "base-lime",
        tooltip: "Images",
        icon: "fas fa-image",
        value: "images"
    },
    {
        className: "base-blue",
        tooltip: "Tag someone else",
        icon: "fas fa-user-tag",
        value: "images"
    },
    {
        className: "base-lemon",
        tooltip: "Fell",
        icon: "far fa-laugh-wink",
        value: "images"
    },
    {
        className: "base-cherry",
        tooltip: "Check in",
        icon: "fas fa-map-marker-alt",
        value: "images"
    }
]
export const VISIBLE_DEFAULT = VISIBLE.PUBLID

export const BOX_CREATE_VISIBLE_ICONS = [
    {
        className: "base-lime",
        icon: "fas fa-globe-americas",
        value: VISIBLE.PUBLID,
        title: "Public",
        description: "Everyone on or off facebook"
    },
    {
        className: "base-blue",
        icon: "fas fa-user-friends",
        value: VISIBLE.FRIENDS,
        title: "Friends",
        description: "Your friends on facebook"
    },
    {
        className: "base-cherry",
        icon: "fas fa-lock",
        value: VISIBLE.PRIVATE,
        title: "Private",
        description: "Only me"
    },
    {
        className: "base-lemon",
        icon: "fas fa-star",
        value: VISIBLE.BEST_FRIENDS,
        title: "Best friends",
        description: "Custom list of best friends"
    }
]
