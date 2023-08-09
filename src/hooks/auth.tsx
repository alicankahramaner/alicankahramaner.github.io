import { useContext } from "react";
import { AuthContext } from "../context/auth";

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    return {
        setAuth: authContext.setAuth,
        clearAuth: authContext.clearAuth,
        isAuth: authContext.isAuth,
        authData: authContext.authData
    }
}