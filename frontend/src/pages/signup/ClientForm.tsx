import axios from 'axios'
import { FormEvent, useState } from 'react'
import FilledButton from '../../components/FilledButton'

export default function ClientForm() {
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const [confPassword, setConfPassword] = useState('')
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if(details.password.length < 8) return setStatus({ok: false, message: "Hasło musi posiadać co najmniej 8 znaków."})
        if(details.password !== confPassword) return setStatus({ok: false, message: "Hasła się nie zgadzają!"})
        try {
            axios.post('/api/rejestracja/klient', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setStatus({
                ok: true,
                message: ''
            }))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    if(status.ok) return <h1 className='min-h-screen padding'>Email weryfikacyjny został wysłany</h1>

    return (
        <section className='padding pt-[1.4in] md:pt-[1.8in] 2xl:pt-[2.2in] min-h-screen'>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <input type='text' placeholder="Imię" name='firstName' id='firstName' onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                <input type='text' placeholder="Nazwisko" name='lastName' id='lastName' onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                <input type='email' placeholder="Email" name='email' id='email' onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} />
                <input type='password' placeholder="Hasło" name='password' id='password' onChange={e => setDetails(prev => { return { ...prev, password: e.target.value }})} />
                <input type='password' placeholder="Powtórz Hasło" name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                {!status.ok && status.message && <span className='text-red-400 font-medium'>{status.message}</span>}
                <FilledButton type='submit'>Zarejestruj</FilledButton>
            </form>
        </section>
    )
}