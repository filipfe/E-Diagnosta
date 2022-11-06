import { ReactElement } from "react";
import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function PublicRoute({ children }: { children: ReactElement }) {
    const { logged } = useAppSelector(state => state.login)
    return logged ? <Navigate to='/skp' /> : children
}