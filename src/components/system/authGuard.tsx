import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useConfig } from "../../hooks/config";

interface AuthGuardProps {
    isPublic?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { isAuth } = useAuth();
    const { authPagePath } = useConfig();

    // const authCheck = useCallback(async () => {
    //     /**
    //      * TODO
    //      *  Bu kısımda expireDate yada token'ı end-point üzerinden doğrulamamız lazım
    //      * */ 
    // }, [])

    if (!isAuth) {
        return (<Navigate to={authPagePath} />)
    }

    return <>{props.children}</>;
}