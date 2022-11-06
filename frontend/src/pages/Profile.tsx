import { useAppSelector } from "../main"

export default function Profile() {
    const auth = useAppSelector(state => state.login)
    const { first_name } = auth.data
    return (
        <section className="padding pt-[1in]">
            <h1 className="font-bold text-2xl">Witaj <span className="text-primary">{first_name}!</span></h1>
        </section>
    )
}