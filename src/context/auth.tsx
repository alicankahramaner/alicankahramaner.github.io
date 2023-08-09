import React, { useCallback, useMemo, useState } from 'react';
import { useConfig } from '../hooks/config';
import { useBrowserStorage } from '../hooks/browserStorage';
import { AuthDto } from '../models/system/auth';

interface AuthContextType {
    authData: AuthDto | null,
    setAuth(data: AuthDto): void;
    clearAuth(): void;
    isAuth: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
    clearAuth: () => { },
    setAuth: () => { },
    authData: null,
    isAuth: false
});

export const AuthProvider: React.FC = (props) => {
    const { authLocalstorageKey } = useConfig()
    const browserStorage = useBrowserStorage();
    const [state, setState] = useState<AuthDto | null>(browserStorage.get<AuthDto>(authLocalstorageKey));

    const setAuth = useCallback((data: AuthDto) => {
        browserStorage.set(authLocalstorageKey, data);
        setState(data);
    }, [setState, authLocalstorageKey, browserStorage]);

    const clearAuth = useCallback(() => {
        browserStorage.remove(authLocalstorageKey);
        setState(null);
    }, [setState, authLocalstorageKey, browserStorage])

    const isAuth = useMemo(() => {
        return state === null ? false : true
    }, [state])

    return <AuthContext.Provider value={{
        clearAuth,
        setAuth,
        authData: state,
        isAuth
    }}>{props.children}</AuthContext.Provider>
}



