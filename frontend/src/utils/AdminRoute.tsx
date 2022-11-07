import { ReactElement } from "react";
import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function AdminRoute({ children }: { children: ReactElement }) {
    const { type } = useAppSelector(state => state.login.data)
    return type === 'admin' ? children : <Navigate to='/profil' />
}