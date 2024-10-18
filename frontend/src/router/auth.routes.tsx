import { ReactNode } from "react";

import BackdropLoading from "../components/BackdropLoading";
import { useAuth } from "../hooks/useAuth";

import { Navigate } from "react-router-dom";

interface IPrivateRoutesProps {
    children?: ReactNode,
}

export function AuthRoutes({ children }: IPrivateRoutesProps) {

    const { authData, isLoading } = useAuth();

    if (isLoading) {
        return <BackdropLoading />
    }

    return authData ? children : <Navigate to="/login" />;
}