import { createContext, ReactNode, useEffect, useState } from "react";

import { AuthData } from "../../schemas/models";
import { api } from "../../providers";

export type AuthContextProps = {
    authData: AuthData | undefined
    signIn: (userData: AuthData, remember: boolean) => Promise<void>,
    signOut: () => Promise<void>
    isLoading: boolean
}

type AuthContextProviderProps = {
    children?: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [authData, setAuthData] = useState<AuthData>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadAuthDataStorage = async () => {

        setIsLoading(true)
        const auth = localStorage.getItem('@AuthData')

        if (auth) {
            setAuthData(JSON.parse(auth))
            api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(auth).user_token}`;
        }

        setIsLoading(false)

    }

    const signIn = async (userData: AuthData, remember: boolean) => {

        if (remember) {
            setAuthData(userData)
            localStorage.setItem('@AuthData', JSON.stringify(userData))
        } else {
            setAuthData(userData)
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${userData.user_token}`;

    }

    const signOut = async (): Promise<void> => {

        setAuthData(undefined)
        localStorage.removeItem('@AuthData')

    }

    useEffect(() => {
        loadAuthDataStorage()
    }, [])

    return (
        <AuthContext.Provider value={{ authData, signIn, signOut, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}