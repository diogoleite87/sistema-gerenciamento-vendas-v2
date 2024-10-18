import { ReactNode } from "react";

import BackdropLoading from "../components/BackdropLoading";
import { useAuth } from "../hooks/useAuth";

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IAuthAdminRoutesProps {
    children?: ReactNode,
}

export function AuthAdminRoutes({ children }: IAuthAdminRoutesProps) {

    const { authData, isLoading } = useAuth();

    if (isLoading) {
        return <BackdropLoading />
    }

    if (authData?.user.type != 1) {
        toast.warning('Você não possui acesso a esta página.')
    }

    return authData?.user.type == 1 ? children : <Navigate to="/" />;
}