import axios from 'axios'
import { useState } from 'react'
import FilledButton from '../../components/FilledButton'

export default function ClientForm() {
    const [alert, setAlert] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const handleLogin = () => {
        if(details.password.length < 8) return setAlert("Hasło musi posiadać co najmniej 8 znaków.")
        if(details.password !== confPassword) return setAlert("Hasła się nie zgadzają!")
        try {
            axios.post('/api/signup', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data)
            .then(data => console.log(data))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    return (
        <section className='padding pt-[1.4in] md:pt-[1.8in] 2xl:pt-[2.2in] min-h-screen'>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <input type='text' placeholder="Imię" name='firstName' id='firstName' onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                <input type='text' placeholder="Nazwisko" name='lastName' id='lastName' onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                <input type='email' placeholder="Email" name='email' id='email' onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} />
                <input type='password' placeholder="Hasło" name='password' id='password' onChange={e => setDetails(prev => { return { ...prev, password: e.target.value }})} />
                <input type='password' placeholder="Powtórz Hasło" name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                {alert && <span className='text-red-400 font-medium'>{alert}</span>}
                <FilledButton type='submit'>Zarejestruj</FilledButton>
            </form>
        </section>
    )
}