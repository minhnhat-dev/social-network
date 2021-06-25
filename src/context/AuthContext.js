/* eslint-disable react/react-in-jsx-scope */
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INIT_STATE = {
    user: null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INIT_STATE);
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);

    return (
        <AuthContext.Provider value={{ dispatch, ...state }}>
            {children}
        </AuthContext.Provider>
    );
};
