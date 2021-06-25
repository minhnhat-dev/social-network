const userContants = {
    RELATIONSHIP: {
        SINGLE: 1,
        MARRIED: 2,
        OTHER: 3
    },
    RELATIONSHIP_STRING: {
        1: "Single",
        2: "Married",
        3: "Other"
    },
    ERROR_CODES_STRING: {
        error_user_not_found: "User not found !",
        error_password_invalid: "Password invalid !",
        error_email_already_exists: "Email already exists !",
        error_jwt_expired: "Session expired !"
    },
    ACTIONS: {
        LOGIN_START: "LOGIN_START",
        LOGIN_SUCCESS: "LOGIN_SUCCESS",
        LOGIN_FAILE: "LOGIN_FAILE",
        LOGOUT: "LOGOUT",
        REGISTER_START: "REGISTER_START",
        REGISTER_SUCCESS: "REGISTER_SUCCESS",
        REGISTER_FAILE: "REGISTER_FAILE"
    }
};

export default userContants;
