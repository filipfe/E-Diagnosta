import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import FilledButton from "../../components/FilledButton"

export default function Verify() {
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const location = useLocation()
    useEffect(() => {
        const token = location.search.split("=").pop()
        try {
            axios.get(`/api/rejestracja/klient/verify?token=${token}`)
                .then(() => setStatus({...status, ok: true}))
        }
        catch(err: any) {
            setStatus({
                ok: false,
                message: err.response
            })
        }
    }, [])
    if(status.ok) return (
        <div className="flex flex-col gap-4">
            <h1>Użytkownik został utworzony</h1>
            <Link to='/logowanie'><FilledButton>Zaloguj się</FilledButton></Link>
        </div>
    )
    return <h1>Ładowanie</h1>
}