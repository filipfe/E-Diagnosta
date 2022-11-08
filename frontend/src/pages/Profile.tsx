import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { first_name } = auth.data
    const { type } = auth.data

    return (
        <section className="padding pt-[1in]">
            <h1 className="font-bold text-2xl mb-6">Witaj <span className="text-primary">{first_name}!</span></h1>
            <div className="flex items-center gap-6">
                {type === 'admin' && <Link className="bg-primary transition-colors max-w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-2 px-6" to='/administracja'>Panel administracyjny</Link>}
                <button className="font-medium py-2 px-5 rounded transition-colors bg-red-400 text-white" onClick={() => dispatch(logout())}>Wyloguj się</button>
            </div>
        </section>
    )
}