import { ReactElement } from "react";
import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }: { children: ReactElement }) {
    const { logged } = useAppSelector(state => state.login)
    return logged ? children : <Navigate to='/logowanie' />
}