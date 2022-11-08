import { ReactElement } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../main";

export default function AdminRoute({ children }: { children: ReactElement }) {
    const { type } = useAppSelector(state => state.login.data)
    return type === 'admin' ? children : <Navigate to='/logowanie' />
}